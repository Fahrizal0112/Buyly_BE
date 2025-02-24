import { ProductService } from "../services/product.service";

export class ProductController {
  constructor() {
    this.service = new ProductService();
  }

  async getAllProducts() {
    return await this.service.findAllProducts();
  }

  async getProductById(id) {
    return await this.service.findProductById(id);
  }

  async createProduct(productData) {
    return await this.service.createProduct(productData);
  }
  async updateProduct(productData) {
    return await this.service.updateProduct(productData);
  }
  async deleteProduct(id) {
    return await this.service.deleteProduct(id);
  }
  async getProductByCategory(categoryId) {
    return await this.service.findProductByCategory(categoryId);
  }

  async getProductByName(name) {
    return await this.service.findProductByName(name);
  }
}