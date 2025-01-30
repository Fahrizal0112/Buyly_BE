import { CategoryRepository } from "../repositories/category.repositories";

export class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }

  async findAllCategories() {
    return await this.repository.findAllCategories();
  }

  async createCategory(categoryData) {
    if (Array.isArray(categoryData)) {
      categoryData.forEach((data) => {
        if (!data.name || !data.description) {
          throw new Error(
            "Name and description are required for each category"
          );
        }
      });

      const createPromises = categoryData.map((data) =>
        this.repository.createCategory(data)
      );

      return await Promise.all(createPromises);
    } else {
      if (!categoryData.name || !categoryData.description) {
        throw new Error("Name and description are required");
      }
      return await this.repository.createCategory(categoryData);
    }
  }
}
