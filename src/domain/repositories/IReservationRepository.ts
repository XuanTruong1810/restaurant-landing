// Domain Repository Interface (Port)
import { ReservationStatus } from "../entities/Reservation";
import type { Reservation } from "../entities/Reservation";

export interface IReservationRepository {
  createReservation(
    reservation: Omit<Reservation, "id" | "createdAt" | "updatedAt">
  ): Promise<Reservation>;
  getReservation(id: string): Promise<Reservation | null>;
  updateReservationStatus(id: string, status: ReservationStatus): Promise<void>;
  getReservationsByDate(date: Date): Promise<Reservation[]>;
  cancelReservation(id: string): Promise<void>;
}
