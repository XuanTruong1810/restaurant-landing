import { describe, it, expect } from 'vitest';
import { ReservationTime, PartySize } from '../Reservation';

describe('ReservationTime', () => {
  it('should create a valid reservation time', () => {
    const time = new ReservationTime('19:30');
    expect(time.getValue()).toBe('19:30');
  });

  it('should throw error for invalid time format', () => {
    expect(() => new ReservationTime('25:00')).toThrow('Invalid reservation time format');
    expect(() => new ReservationTime('19:60')).toThrow('Invalid reservation time format');
    expect(() => new ReservationTime('invalid')).toThrow('Invalid reservation time format');
  });

  it('should accept valid time formats', () => {
    expect(() => new ReservationTime('00:00')).not.toThrow();
    expect(() => new ReservationTime('23:59')).not.toThrow();
    expect(() => new ReservationTime('12:30')).not.toThrow();
  });
});

describe('PartySize', () => {
  it('should create a valid party size', () => {
    const partySize = new PartySize(4);
    expect(partySize.getValue()).toBe(4);
  });

  it('should throw error for invalid party size', () => {
    expect(() => new PartySize(0)).toThrow('Party size must be between 1 and 20');
    expect(() => new PartySize(21)).toThrow('Party size must be between 1 and 20');
    expect(() => new PartySize(-1)).toThrow('Party size must be between 1 and 20');
  });

  it('should accept valid party sizes', () => {
    expect(() => new PartySize(1)).not.toThrow();
    expect(() => new PartySize(20)).not.toThrow();
    expect(() => new PartySize(10)).not.toThrow();
  });
});
