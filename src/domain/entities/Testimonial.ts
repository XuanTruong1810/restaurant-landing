// Domain Entity: Testimonial
export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  rating: Rating;
  review: string;
  date: Date;
  isVerified: boolean;
  avatar?: string;
}

export class Rating {
  constructor(private readonly value: number) {
    if (value < 1 || value > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
  }

  getValue(): number {
    return this.value;
  }

  getStars(): string {
    return '⭐'.repeat(this.value);
  }
}

export interface TestimonialStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: RatingDistribution;
}

export interface RatingDistribution {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}
