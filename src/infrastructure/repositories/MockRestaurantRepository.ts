// Infrastructure Implementation (Adapter)
import type { Restaurant } from "../../domain/entities/Restaurant";
import type { IRestaurantRepository } from "../../domain/repositories/IRestaurantRepository";

export class MockRestaurantRepository implements IRestaurantRepository {
  private restaurant: Restaurant = {
    id: "1",
    name: "Bella Vista",
    tagline: "Authentic Italian Cuisine",
    description:
      "Experience the authentic taste of Italy in the heart of the city",
    address: {
      street: "123 Italian Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    contact: {
      phone: "(555) 123-4567",
      email: "info@bellavista.com",
    },
    hours: {
      monday: { open: "11:30", close: "22:00", isClosed: false },
      tuesday: { open: "11:30", close: "22:00", isClosed: false },
      wednesday: { open: "11:30", close: "22:00", isClosed: false },
      thursday: { open: "11:30", close: "22:00", isClosed: false },
      friday: { open: "11:30", close: "23:00", isClosed: false },
      saturday: { open: "11:30", close: "23:00", isClosed: false },
      sunday: { open: "12:00", close: "21:00", isClosed: false },
    },
    socialMedia: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      tiktok: "#",
    },
  };

  async getRestaurantInfo(): Promise<Restaurant> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.restaurant;
  }

  async updateRestaurantInfo(restaurant: Restaurant): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.restaurant = restaurant;
  }
}
