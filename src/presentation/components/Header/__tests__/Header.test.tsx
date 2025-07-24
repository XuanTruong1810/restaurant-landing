import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../Header";
import { Container } from "../../../../infrastructure/di/Container";

// Mock the Container
vi.mock("../../../../infrastructure/di/Container");

describe("Header Component", () => {
  let mockContainer: unknown;
  let mockUseCase: {
    execute: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockUseCase = {
      execute: vi.fn(),
    };

    mockContainer = {
      getRestaurantInfoUseCaseInstance: vi.fn().mockReturnValue(mockUseCase),
    };

    vi.mocked(Container.getInstance).mockReturnValue(
      mockContainer as Container
    );
  });

  const mockRestaurant = {
    id: "1",
    name: "Bella Vista",
    tagline: "Authentic Italian Cuisine",
    description: "Test description",
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

  it("should render loading state initially", () => {
    // Arrange
    mockUseCase.execute.mockImplementation(() => new Promise(() => {})); // Never resolves

    // Act
    render(<Header />);

    // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render restaurant info when loaded successfully", async () => {
    // Arrange
    mockUseCase.execute.mockResolvedValue(mockRestaurant);

    // Act
    render(<Header />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Bella Vista")).toBeInTheDocument();
      expect(screen.getByText("Authentic Italian Cuisine")).toBeInTheDocument();
    });
  });

  it("should render error state when loading fails", async () => {
    // Arrange
    mockUseCase.execute.mockRejectedValue(new Error("Failed to load"));

    // Act
    render(<Header />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Restaurant")).toBeInTheDocument();
      expect(screen.getByText("Error loading info")).toBeInTheDocument();
    });
  });

  it("should render navigation links", async () => {
    // Arrange
    mockUseCase.execute.mockResolvedValue(mockRestaurant);

    // Act
    render(<Header />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Menu")).toBeInTheDocument();
      expect(screen.getByText("Gallery")).toBeInTheDocument();
      expect(screen.getByText("Reviews")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  it("should render reservation button", async () => {
    // Arrange
    mockUseCase.execute.mockResolvedValue(mockRestaurant);

    // Act
    render(<Header />);

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("reservation-button")).toBeInTheDocument();
      expect(screen.getByText("Make Reservation")).toBeInTheDocument();
    });
  });

  it("should toggle mobile menu when hamburger button is clicked", async () => {
    // Arrange
    mockUseCase.execute.mockResolvedValue(mockRestaurant);

    // Act
    render(<Header />);

    await waitFor(() => {
      expect(screen.getByTestId("mobile-menu-toggle")).toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId("mobile-menu-toggle");
    fireEvent.click(toggleButton);

    // Assert
    const nav = document.querySelector(".nav");
    expect(nav).toHaveClass("nav-open");
  });

  it("should apply custom className when provided", async () => {
    // Arrange
    mockUseCase.execute.mockResolvedValue(mockRestaurant);

    // Act
    render(<Header className="custom-header" />);

    // Assert
    await waitFor(() => {
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("header");
      expect(header).toHaveClass("custom-header");
    });
  });
});
