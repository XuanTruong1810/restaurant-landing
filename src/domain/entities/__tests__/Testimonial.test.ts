import { describe, it, expect } from 'vitest';
import { Rating } from '../Testimonial';

describe('Rating', () => {
  it('should create a valid rating', () => {
    const rating = new Rating(5);
    expect(rating.getValue()).toBe(5);
  });

  it('should throw error for invalid rating', () => {
    expect(() => new Rating(0)).toThrow('Rating must be between 1 and 5');
    expect(() => new Rating(6)).toThrow('Rating must be between 1 and 5');
    expect(() => new Rating(-1)).toThrow('Rating must be between 1 and 5');
  });

  it('should accept valid ratings', () => {
    expect(() => new Rating(1)).not.toThrow();
    expect(() => new Rating(5)).not.toThrow();
    expect(() => new Rating(3)).not.toThrow();
  });

  it('should generate correct star representation', () => {
    expect(new Rating(1).getStars()).toBe('⭐');
    expect(new Rating(3).getStars()).toBe('⭐⭐⭐');
    expect(new Rating(5).getStars()).toBe('⭐⭐⭐⭐⭐');
  });
});
