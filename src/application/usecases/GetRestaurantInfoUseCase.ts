// Application Use Case
import type { Restaurant } from "../../domain/entities/Restaurant";
import type { IRestaurantRepository } from "../../domain/repositories/IRestaurantRepository";

export class GetRestaurantInfoUseCase {
  private restaurantRepository: IRestaurantRepository;

  constructor(restaurantRepository: IRestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(): Promise<Restaurant> {
    try {
      return await this.restaurantRepository.getRestaurantInfo();
    } catch (error) {
      throw new Error(`Failed to get restaurant info: ${error}`);
    }
  }
}
