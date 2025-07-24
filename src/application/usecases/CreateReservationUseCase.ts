// Application Use Case
import { ReservationStatus } from "../../domain/entities/Reservation";
import type {
  Reservation,
  CustomerInfo,
  ReservationDetails,
} from "../../domain/entities/Reservation";
import type { IReservationRepository } from "../../domain/repositories/IReservationRepository";

export interface CreateReservationRequest {
  customerInfo: CustomerInfo;
  reservationDetails: ReservationDetails;
}

export class CreateReservationUseCase {
  private reservationRepository: IReservationRepository;

  constructor(reservationRepository: IReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async execute(request: CreateReservationRequest): Promise<Reservation> {
    try {
      // Business logic: Validate reservation time
      this.validateReservationTime(
        request.reservationDetails.date,
        request.reservationDetails.time
      );

      // Business logic: Check party size
      this.validatePartySize(request.reservationDetails.partySize);

      // Create reservation with pending status
      const reservationData = {
        customerInfo: request.customerInfo,
        reservationDetails: request.reservationDetails,
        status: ReservationStatus.PENDING,
      };

      return await this.reservationRepository.createReservation(
        reservationData
      );
    } catch (error) {
      throw new Error(`Failed to create reservation: ${error}`);
    }
  }

  private validateReservationTime(date: Date, time: string): void {
    const now = new Date();
    const reservationDateTime = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    reservationDateTime.setHours(hours, minutes);

    if (reservationDateTime <= now) {
      throw new Error("Reservation time must be in the future");
    }

    // Business rule: No reservations more than 30 days in advance
    const maxAdvanceDate = new Date();
    maxAdvanceDate.setDate(maxAdvanceDate.getDate() + 30);

    if (reservationDateTime > maxAdvanceDate) {
      throw new Error(
        "Reservations cannot be made more than 30 days in advance"
      );
    }
  }

  private validatePartySize(partySize: number): void {
    if (partySize < 1 || partySize > 20) {
      throw new Error("Party size must be between 1 and 20 people");
    }
  }
}
