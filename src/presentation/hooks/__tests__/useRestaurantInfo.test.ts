import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useRestaurantInfo } from "../useRestaurantInfo";
import type { GetRestaurantInfoUseCase } from "../../../application/usecases/GetRestaurantInfoUseCase";
import type { Restaurant } from "../../../domain/entities/Restaurant";

describe("useRestaurantInfo", () => {
  let mockUseCase: GetRestaurantInfoUseCase;

  const mockRestaurant: Restaurant = {
    id: "1",
    name: "Test Restaurant",
    tagline: "Test Tagline",
    description: "Test Description",
    address: {
      street: "123 Test St",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
      country: "Test Country",
    },
    contact: {
      phone: "123-456-7890",
      email: "test@test.com",
    },
    hours: {
      monday: { open: "09:00", close: "17:00", isClosed: false },
      tuesday: { open: "09:00", close: "17:00", isClosed: false },
      wednesday: { open: "09:00", close: "17:00", isClosed: false },
      thursday: { open: "09:00", close: "17:00", isClosed: false },
      friday: { open: "09:00", close: "17:00", isClosed: false },
      saturday: { open: "09:00", close: "17:00", isClosed: false },
      sunday: { open: "09:00", close: "17:00", isClosed: true },
    },
    socialMedia: {},
  };

  beforeEach(() => {
    mockUseCase = {
      execute: vi.fn(),
    } as unknown as GetRestaurantInfoUseCase;
  });

  it("should return loading state initially", () => {
    // Arrange
    vi.mocked(mockUseCase.execute).mockImplementation(
      () => new Promise(() => {})
    ); // Never resolves

    // Act
    const { result } = renderHook(() => useRestaurantInfo(mockUseCase));

    // Assert
    expect(result.current.loading).toBe(true);
    expect(result.current.restaurant).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should return restaurant data when use case succeeds", async () => {
    // Arrange
    vi.mocked(mockUseCase.execute).mockResolvedValue(mockRestaurant);

    // Act
    const { result } = renderHook(() => useRestaurantInfo(mockUseCase));

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.restaurant).toEqual(mockRestaurant);
    expect(result.current.error).toBe(null);
    expect(mockUseCase.execute).toHaveBeenCalledOnce();
  });

  it("should return error when use case fails", async () => {
    // Arrange
    const errorMessage = "Failed to load restaurant info";
    vi.mocked(mockUseCase.execute).mockRejectedValue(new Error(errorMessage));

    // Act
    const { result } = renderHook(() => useRestaurantInfo(mockUseCase));

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.restaurant).toBe(null);
    expect(result.current.error).toBe(errorMessage);
    expect(mockUseCase.execute).toHaveBeenCalledOnce();
  });
});
