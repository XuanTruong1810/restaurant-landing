// Application Use Case
import type {
  Testimonial,
  TestimonialStats,
} from "../../domain/entities/Testimonial";
import type { ITestimonialRepository } from "../../domain/repositories/ITestimonialRepository";

export class GetTestimonialsUseCase {
  private testimonialRepository: ITestimonialRepository;

  constructor(testimonialRepository: ITestimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  async execute(): Promise<Testimonial[]> {
    try {
      const testimonials =
        await this.testimonialRepository.getFeaturedTestimonials();

      // Business logic: Only show verified testimonials with rating >= 4
      return testimonials.filter(
        (testimonial) =>
          testimonial.isVerified && testimonial.rating.getValue() >= 4
      );
    } catch (error) {
      throw new Error(`Failed to get testimonials: ${error}`);
    }
  }
}

export class GetTestimonialStatsUseCase {
  private testimonialRepository: ITestimonialRepository;

  constructor(testimonialRepository: ITestimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  async execute(): Promise<TestimonialStats> {
    try {
      return await this.testimonialRepository.getTestimonialStats();
    } catch (error) {
      throw new Error(`Failed to get testimonial stats: ${error}`);
    }
  }
}
