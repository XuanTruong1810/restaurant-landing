import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetRestaurantInfoUseCase } from "../GetRestaurantInfoUseCase";
import type { IRestaurantRepository } from "../../../domain/repositories/IRestaurantRepository";
import type { Restaurant } from "../../../domain/entities/Restaurant";

describe("GetRestaurantInfoUseCase", () => {
  let mockRepository: IRestaurantRepository;
  let useCase: GetRestaurantInfoUseCase;

  const mockRestaurant: Restaurant = {
    id: "1",
    name: "Test Restaurant",
    tagline: "Test Tagline",
    description: "Test Description",
    address: {
      street: "123 Test St",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
      country: "Test Country",
    },
    contact: {
      phone: "123-456-7890",
      email: "test@test.com",
    },
    hours: {
      monday: { open: "09:00", close: "17:00", isClosed: false },
      tuesday: { open: "09:00", close: "17:00", isClosed: false },
      wednesday: { open: "09:00", close: "17:00", isClosed: false },
      thursday: { open: "09:00", close: "17:00", isClosed: false },
      friday: { open: "09:00", close: "17:00", isClosed: false },
      saturday: { open: "09:00", close: "17:00", isClosed: false },
      sunday: { open: "09:00", close: "17:00", isClosed: true },
    },
    socialMedia: {
      facebook: "test-facebook",
      instagram: "test-instagram",
    },
  };

  beforeEach(() => {
    mockRepository = {
      getRestaurantInfo: vi.fn(),
      updateRestaurantInfo: vi.fn(),
    };
    useCase = new GetRestaurantInfoUseCase(mockRepository);
  });

  it("should return restaurant info when repository succeeds", async () => {
    // Arrange
    vi.mocked(mockRepository.getRestaurantInfo).mockResolvedValue(
      mockRestaurant
    );

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual(mockRestaurant);
    expect(mockRepository.getRestaurantInfo).toHaveBeenCalledOnce();
  });

  it("should throw error when repository fails", async () => {
    // Arrange
    const errorMessage = "Repository error";
    vi.mocked(mockRepository.getRestaurantInfo).mockRejectedValue(
      new Error(errorMessage)
    );

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow(
      `Failed to get restaurant info: Error: ${errorMessage}`
    );
    expect(mockRepository.getRestaurantInfo).toHaveBeenCalledOnce();
  });
});
