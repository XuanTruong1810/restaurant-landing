// Presentation Layer Hook
import { useState, useEffect } from "react";
import type { Restaurant } from "../../domain/entities/Restaurant";
import type { GetRestaurantInfoUseCase } from "../../application/usecases/GetRestaurantInfoUseCase";

interface UseRestaurantInfoResult {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

export const useRestaurantInfo = (
  getRestaurantInfoUseCase: GetRestaurantInfoUseCase
): UseRestaurantInfoResult => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const restaurantData = await getRestaurantInfoUseCase.execute();
        setRestaurant(restaurantData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load restaurant info"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, [getRestaurantInfoUseCase]);

  return { restaurant, loading, error };
};
