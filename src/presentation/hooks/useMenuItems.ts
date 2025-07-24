// Presentation Layer Hook
import { useState, useEffect } from "react";
import type { MenuItem } from "../../domain/entities/MenuItem";
import type { GetFeaturedMenuItemsUseCase } from "../../application/usecases/GetFeaturedMenuItemsUseCase";

interface UseMenuItemsResult {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

export const useMenuItems = (
  getFeaturedMenuItemsUseCase: GetFeaturedMenuItemsUseCase
): UseMenuItemsResult => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await getFeaturedMenuItemsUseCase.execute();
        setMenuItems(items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load menu items"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [getFeaturedMenuItemsUseCase]);

  return { menuItems, loading, error };
};
