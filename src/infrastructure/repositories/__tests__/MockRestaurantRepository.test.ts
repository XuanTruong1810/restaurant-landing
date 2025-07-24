import { describe, it, expect, beforeEach } from "vitest";
import { MockRestaurantRepository } from "../MockRestaurantRepository";

describe("MockRestaurantRepository", () => {
  let repository: MockRestaurantRepository;

  beforeEach(() => {
    repository = new MockRestaurantRepository();
  });

  it("should return restaurant info", async () => {
    // Act
    const result = await repository.getRestaurantInfo();

    // Assert
    expect(result).toBeDefined();
    expect(result.name).toBe("Bella Vista");
    expect(result.tagline).toBe("Authentic Italian Cuisine");
    expect(result.contact.phone).toBe("(555) 123-4567");
    expect(result.contact.email).toBe("info@bellavista.com");
  });

  it("should update restaurant info", async () => {
    // Arrange
    const originalInfo = await repository.getRestaurantInfo();
    const updatedInfo = {
      ...originalInfo,
      name: "Updated Restaurant Name",
      tagline: "Updated Tagline",
    };

    // Act
    await repository.updateRestaurantInfo(updatedInfo);
    const result = await repository.getRestaurantInfo();

    // Assert
    expect(result.name).toBe("Updated Restaurant Name");
    expect(result.tagline).toBe("Updated Tagline");
  });

  it("should have valid operating hours", async () => {
    // Act
    const result = await repository.getRestaurantInfo();

    // Assert
    expect(result.hours.monday.open).toBe("11:30");
    expect(result.hours.monday.close).toBe("22:00");
    expect(result.hours.monday.isClosed).toBe(false);

    expect(result.hours.sunday.open).toBe("12:00");
    expect(result.hours.sunday.close).toBe("21:00");
    expect(result.hours.sunday.isClosed).toBe(false);
  });

  it("should have valid address information", async () => {
    // Act
    const result = await repository.getRestaurantInfo();

    // Assert
    expect(result.address.street).toBe("123 Italian Street");
    expect(result.address.city).toBe("New York");
    expect(result.address.state).toBe("NY");
    expect(result.address.zipCode).toBe("10001");
    expect(result.address.country).toBe("USA");
  });
});
