// Application Use Case
import type { MenuItem } from "../../domain/entities/MenuItem";
import type { IMenuRepository } from "../../domain/repositories/IMenuRepository";

export class GetFeaturedMenuItemsUseCase {
  private menuRepository: IMenuRepository;

  constructor(menuRepository: IMenuRepository) {
    this.menuRepository = menuRepository;
  }

  async execute(): Promise<MenuItem[]> {
    try {
      const featuredItems = await this.menuRepository.getFeaturedItems();

      // Business logic: Filter only available items
      return featuredItems.filter((item) => item.isAvailable);
    } catch (error) {
      throw new Error(`Failed to get featured menu items: ${error}`);
    }
  }
}
