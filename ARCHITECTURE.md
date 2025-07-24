# Clean Architecture Documentation

## Overview

This project implements Clean Architecture principles to create a scalable, maintainable, and testable restaurant landing page application.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)
The innermost layer containing business logic and entities.

#### Entities (`src/domain/entities/`)
- `Restaurant.ts` - Core restaurant information
- `MenuItem.ts` - Menu items and categories
- `Reservation.ts` - Reservation system with value objects
- `Testimonial.ts` - Customer testimonials and ratings

#### Repository Interfaces (`src/domain/repositories/`)
- `IRestaurantRepository.ts` - Restaurant data access interface
- `IMenuRepository.ts` - Menu data access interface
- `IReservationRepository.ts` - Reservation data access interface
- `ITestimonialRepository.ts` - Testimonial data access interface

### 2. Application Layer (`src/application/`)
Contains use cases and business logic orchestration.

#### Use Cases (`src/application/usecases/`)
- `GetRestaurantInfoUseCase.ts` - Retrieve restaurant information
- `GetFeaturedMenuItemsUseCase.ts` - Get featured menu items
- `CreateReservationUseCase.ts` - Handle reservation creation with validation
- `GetTestimonialsUseCase.ts` - Retrieve customer testimonials

### 3. Infrastructure Layer (`src/infrastructure/`)
External concerns and framework-specific implementations.

#### Repositories (`src/infrastructure/repositories/`)
- `MockRestaurantRepository.ts` - Mock implementation for restaurant data
- `MockMenuRepository.ts` - Mock implementation for menu data

#### Dependency Injection (`src/infrastructure/di/`)
- `Container.ts` - Dependency injection container

### 4. Presentation Layer (`src/presentation/`)
UI components and React-specific logic.

#### Hooks (`src/presentation/hooks/`)
- `useRestaurantInfo.ts` - Hook for restaurant data
- `useMenuItems.ts` - Hook for menu data

#### Components (`src/presentation/components/`)
- `Header/` - Refactored header component using clean architecture

## Key Principles Applied

### 1. Dependency Inversion
- High-level modules don't depend on low-level modules
- Both depend on abstractions (interfaces)
- Repository interfaces in domain layer, implementations in infrastructure

### 2. Single Responsibility
- Each class/module has one reason to change
- Use cases handle specific business operations
- Entities contain only business rules

### 3. Open/Closed Principle
- Open for extension, closed for modification
- New repository implementations can be added without changing existing code
- New use cases can be added without modifying existing ones

### 4. Interface Segregation
- Clients depend only on interfaces they use
- Repository interfaces are specific to their domain

### 5. Separation of Concerns
- Business logic separated from UI logic
- Data access separated from business logic
- Framework-specific code isolated in infrastructure layer

## Testing Strategy

### Unit Tests
- **Domain Entities**: Test business rules and value objects
- **Use Cases**: Test business logic with mocked dependencies
- **Repositories**: Test data access implementations
- **Hooks**: Test React hooks with mocked use cases
- **Components**: Test UI behavior with mocked dependencies

### Test Files Structure
```
src/
├── domain/entities/__tests__/
├── application/usecases/__tests__/
├── infrastructure/repositories/__tests__/
├── presentation/hooks/__tests__/
└── presentation/components/__tests__/
```

## Benefits

### 1. Testability
- Easy to unit test each layer in isolation
- Mock dependencies for focused testing
- High test coverage with fast execution

### 2. Maintainability
- Clear separation of concerns
- Easy to locate and modify specific functionality
- Reduced coupling between layers

### 3. Scalability
- Easy to add new features without affecting existing code
- Can swap implementations (e.g., mock to real API)
- Framework-agnostic business logic

### 4. Flexibility
- Can change UI framework without affecting business logic
- Can change data sources without affecting use cases
- Easy to add new features or modify existing ones

## Usage Examples

### Adding a New Use Case
1. Create interface in domain layer if needed
2. Implement use case in application layer
3. Add to dependency injection container
4. Create hook in presentation layer
5. Use in React components

### Adding a New Repository
1. Create interface in domain layer
2. Implement in infrastructure layer
3. Register in dependency injection container
4. Use in existing or new use cases

### Testing a Component
1. Mock the use case dependencies
2. Test component behavior
3. Verify correct use case calls
4. Test error and loading states

## Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage

# Run tests with UI
bun test:ui
```

## Future Enhancements

1. **Real API Integration**: Replace mock repositories with real API calls
2. **State Management**: Add Redux or Zustand for complex state
3. **Error Handling**: Implement comprehensive error handling strategy
4. **Caching**: Add caching layer for improved performance
5. **Validation**: Add input validation using libraries like Zod
6. **Authentication**: Add user authentication and authorization
