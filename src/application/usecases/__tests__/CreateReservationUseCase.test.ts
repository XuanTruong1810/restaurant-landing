import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateReservationUseCase } from "../CreateReservationUseCase";
import { ReservationStatus } from "../../../domain/entities/Reservation";
import type { CreateReservationRequest } from "../CreateReservationUseCase";
import type { IReservationRepository } from "../../../domain/repositories/IReservationRepository";
import type { Reservation } from "../../../domain/entities/Reservation";

describe("CreateReservationUseCase", () => {
  let mockRepository: IReservationRepository;
  let useCase: CreateReservationUseCase;

  beforeEach(() => {
    mockRepository = {
      createReservation: vi.fn(),
      getReservation: vi.fn(),
      updateReservationStatus: vi.fn(),
      getReservationsByDate: vi.fn(),
      cancelReservation: vi.fn(),
    };
    useCase = new CreateReservationUseCase(mockRepository);
  });

  const validRequest: CreateReservationRequest = {
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    reservationDetails: {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      time: "19:30",
      partySize: 4,
      specialRequests: "Window table please",
    },
  };

  const mockReservation: Reservation = {
    id: "1",
    customerInfo: validRequest.customerInfo,
    reservationDetails: validRequest.reservationDetails,
    status: ReservationStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("should create reservation successfully with valid data", async () => {
    // Arrange
    vi.mocked(mockRepository.createReservation).mockResolvedValue(
      mockReservation
    );

    // Act
    const result = await useCase.execute(validRequest);

    // Assert
    expect(result).toEqual(mockReservation);
    expect(mockRepository.createReservation).toHaveBeenCalledWith({
      customerInfo: validRequest.customerInfo,
      reservationDetails: validRequest.reservationDetails,
      status: ReservationStatus.PENDING,
    });
  });

  it("should throw error for past reservation time", async () => {
    // Arrange
    const pastRequest = {
      ...validRequest,
      reservationDetails: {
        ...validRequest.reservationDetails,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      },
    };

    // Act & Assert
    await expect(useCase.execute(pastRequest)).rejects.toThrow(
      "Reservation time must be in the future"
    );
    expect(mockRepository.createReservation).not.toHaveBeenCalled();
  });

  it("should throw error for reservation too far in advance", async () => {
    // Arrange
    const farFutureRequest = {
      ...validRequest,
      reservationDetails: {
        ...validRequest.reservationDetails,
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
      },
    };

    // Act & Assert
    await expect(useCase.execute(farFutureRequest)).rejects.toThrow(
      "Reservations cannot be made more than 30 days in advance"
    );
    expect(mockRepository.createReservation).not.toHaveBeenCalled();
  });

  it("should throw error for invalid party size", async () => {
    // Arrange
    const invalidPartySizeRequest = {
      ...validRequest,
      reservationDetails: {
        ...validRequest.reservationDetails,
        partySize: 25, // Too large
      },
    };

    // Act & Assert
    await expect(useCase.execute(invalidPartySizeRequest)).rejects.toThrow(
      "Party size must be between 1 and 20 people"
    );
    expect(mockRepository.createReservation).not.toHaveBeenCalled();
  });

  it("should throw error when repository fails", async () => {
    // Arrange
    const errorMessage = "Database error";
    vi.mocked(mockRepository.createReservation).mockRejectedValue(
      new Error(errorMessage)
    );

    // Act & Assert
    await expect(useCase.execute(validRequest)).rejects.toThrow(
      `Failed to create reservation: Error: ${errorMessage}`
    );
  });
});
