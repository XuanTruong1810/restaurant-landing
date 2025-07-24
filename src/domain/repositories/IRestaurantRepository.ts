// Domain Repository Interface (Port)
import type { Restaurant } from "../entities/Restaurant";

export interface IRestaurantRepository {
  getRestaurantInfo(): Promise<Restaurant>;
  updateRestaurantInfo(restaurant: Restaurant): Promise<void>;
}
