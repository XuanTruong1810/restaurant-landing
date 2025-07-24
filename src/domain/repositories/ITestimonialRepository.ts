// Domain Repository Interface (Port)
import type { Testimonial, TestimonialStats } from "../entities/Testimonial";

export interface ITestimonialRepository {
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  getTestimonialStats(): Promise<TestimonialStats>;
  addTestimonial(
    testimonial: Omit<Testimonial, "id" | "date">
  ): Promise<Testimonial>;
}
