// Infrastructure Implementation (Adapter)
import { MenuCategory } from "../../domain/entities/MenuItem";
import type { MenuItem, MenuSection } from "../../domain/entities/MenuItem";
import type { IMenuRepository } from "../../domain/repositories/IMenuRepository";

export class MockMenuRepository implements IMenuRepository {
  private menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      description:
        "Classic Roman pasta with eggs, cheese, pancetta, and black pepper",
      price: 18,
      category: MenuCategory.MAIN_COURSE,
      dietary: {
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["eggs", "dairy", "gluten"],
      },
      isAvailable: true,
      ingredients: [
        "spaghetti",
        "eggs",
        "pecorino cheese",
        "pancetta",
        "black pepper",
      ],
    },
    {
      id: "2",
      name: "Margherita Pizza",
      description:
        "Traditional pizza with fresh mozzarella, tomatoes, and basil",
      price: 16,
      category: MenuCategory.MAIN_COURSE,
      dietary: {
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["dairy", "gluten"],
      },
      isAvailable: true,
      ingredients: [
        "pizza dough",
        "mozzarella",
        "tomatoes",
        "basil",
        "olive oil",
      ],
    },
    {
      id: "3",
      name: "Osso Buco",
      description: "Braised veal shanks with vegetables, white wine, and broth",
      price: 28,
      category: MenuCategory.MAIN_COURSE,
      dietary: {
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        allergens: [],
      },
      isAvailable: true,
      ingredients: ["veal shanks", "vegetables", "white wine", "broth"],
    },
    {
      id: "4",
      name: "Tiramisu",
      description:
        "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 12,
      category: MenuCategory.DESSERT,
      dietary: {
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["eggs", "dairy", "gluten"],
      },
      isAvailable: true,
      ingredients: ["ladyfingers", "mascarpone", "coffee", "cocoa", "eggs"],
    },
  ];

  async getMenuItems(): Promise<MenuItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.menuItems;
  }

  async getMenuItemsByCategory(category: MenuCategory): Promise<MenuItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.menuItems.filter((item) => item.category === category);
  }

  async getMenuSections(): Promise<MenuSection[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const sections: MenuSection[] = [];

    for (const category of Object.values(MenuCategory)) {
      const items = this.menuItems.filter((item) => item.category === category);
      if (items.length > 0) {
        sections.push({
          category,
          items,
          displayName: this.getCategoryDisplayName(category),
          description: this.getCategoryDescription(category),
        });
      }
    }

    return sections;
  }

  async getFeaturedItems(): Promise<MenuItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.menuItems.slice(0, 4); // Return first 4 items as featured
  }

  async getMenuItem(id: string): Promise<MenuItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.menuItems.find((item) => item.id === id) || null;
  }

  private getCategoryDisplayName(category: MenuCategory): string {
    const displayNames = {
      [MenuCategory.APPETIZER]: "Appetizers",
      [MenuCategory.MAIN_COURSE]: "Main Courses",
      [MenuCategory.DESSERT]: "Desserts",
      [MenuCategory.BEVERAGE]: "Beverages",
      [MenuCategory.SPECIAL]: "Chef's Specials",
    };
    return displayNames[category];
  }

  private getCategoryDescription(category: MenuCategory): string {
    const descriptions = {
      [MenuCategory.APPETIZER]: "Start your meal with our delicious appetizers",
      [MenuCategory.MAIN_COURSE]: "Our signature main courses",
      [MenuCategory.DESSERT]: "Sweet endings to your perfect meal",
      [MenuCategory.BEVERAGE]: "Carefully selected wines and beverages",
      [MenuCategory.SPECIAL]: "Chef's special creations",
    };
    return descriptions[category];
  }
}
