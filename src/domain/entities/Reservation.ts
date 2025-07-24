// Domain Entity: Reservation
export interface Reservation {
  id: string;
  customerInfo: CustomerInfo;
  reservationDetails: ReservationDetails;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ReservationDetails {
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
  tablePreference?: TablePreference;
}

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show'
}

export enum TablePreference {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
  WINDOW = 'window',
  PRIVATE = 'private',
  NO_PREFERENCE = 'no_preference'
}

// Value Objects
export class ReservationTime {
  constructor(private readonly time: string) {
    if (!this.isValidTime(time)) {
      throw new Error('Invalid reservation time format');
    }
  }

  private isValidTime(time: string): boolean {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  getValue(): string {
    return this.time;
  }
}

export class PartySize {
  constructor(private readonly size: number) {
    if (size < 1 || size > 20) {
      throw new Error('Party size must be between 1 and 20');
    }
  }

  getValue(): number {
    return this.size;
  }
}
