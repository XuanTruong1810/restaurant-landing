// Domain Repository Interface (Port)
import { MenuCategory } from "../entities/MenuItem";
import type { MenuItem, MenuSection } from "../entities/MenuItem";

export interface IMenuRepository {
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: MenuCategory): Promise<MenuItem[]>;
  getMenuSections(): Promise<MenuSection[]>;
  getFeaturedItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | null>;
}
