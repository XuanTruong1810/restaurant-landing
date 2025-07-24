// Dependency Injection Container
import type { IRestaurantRepository } from "../../domain/repositories/IRestaurantRepository";
import type { IMenuRepository } from "../../domain/repositories/IMenuRepository";

import { MockRestaurantRepository } from "../repositories/MockRestaurantRepository";
import { MockMenuRepository } from "../repositories/MockMenuRepository";

import { GetRestaurantInfoUseCase } from "../../application/usecases/GetRestaurantInfoUseCase";
import { GetFeaturedMenuItemsUseCase } from "../../application/usecases/GetFeaturedMenuItemsUseCase";

export class Container {
  private static instance: Container;

  // Repositories
  private restaurantRepository: IRestaurantRepository;
  private menuRepository: IMenuRepository;
  // Note: Add other repositories when needed
  // private reservationRepository: IReservationRepository;
  // private testimonialRepository: ITestimonialRepository;

  // Use Cases
  private getRestaurantInfoUseCase: GetRestaurantInfoUseCase;
  private getFeaturedMenuItemsUseCase: GetFeaturedMenuItemsUseCase;
  // Note: Add other use cases when repositories are implemented
  // private createReservationUseCase: CreateReservationUseCase;
  // private getTestimonialsUseCase: GetTestimonialsUseCase;

  private constructor() {
    // Initialize repositories
    this.restaurantRepository = new MockRestaurantRepository();
    this.menuRepository = new MockMenuRepository();
    // Note: Add other repository implementations when needed

    // Initialize use cases
    this.getRestaurantInfoUseCase = new GetRestaurantInfoUseCase(
      this.restaurantRepository
    );
    this.getFeaturedMenuItemsUseCase = new GetFeaturedMenuItemsUseCase(
      this.menuRepository
    );
    // Note: Add other use cases when repositories are implemented
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // Repository getters
  public getRestaurantRepository(): IRestaurantRepository {
    return this.restaurantRepository;
  }

  public getMenuRepository(): IMenuRepository {
    return this.menuRepository;
  }

  // Use case getters
  public getRestaurantInfoUseCaseInstance(): GetRestaurantInfoUseCase {
    return this.getRestaurantInfoUseCase;
  }

  public getFeaturedMenuItemsUseCaseInstance(): GetFeaturedMenuItemsUseCase {
    return this.getFeaturedMenuItemsUseCase;
  }
}
