// Domain Entity: Menu Item
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  dietary: DietaryInfo;
  isAvailable: boolean;
  imageUrl?: string;
  ingredients: string[];
}

export enum MenuCategory {
  APPETIZER = 'appetizer',
  MAIN_COURSE = 'main_course',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
  SPECIAL = 'special'
}

export interface DietaryInfo {
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  allergens: string[];
}

export interface MenuSection {
  category: MenuCategory;
  items: MenuItem[];
  displayName: string;
  description?: string;
}
