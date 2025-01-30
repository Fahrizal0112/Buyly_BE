import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor() {
    this.service = new CategoryService();
  }

  async getAllCategories() {
    return await this.service.findAllCategories();
  }

  async createCategory(categoryData) {
    return await this.service.createCategory(categoryData);
  }
}
