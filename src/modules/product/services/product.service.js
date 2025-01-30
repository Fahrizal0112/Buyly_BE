import { ProductRepository } from "../repositories/product.repositories";

export class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async findAllProducts() {
    return await this.repository.findAllProducts();
  }
  async findProductById(id) {
    const product = await this.repository.findProductById(id);
    if (!product) {
      throw new Error("Product Not Found");
    }
    return product;
  }
  async createProduct(productData) {
    const requiredFields = ['name', 'description', 'price', 'stock', 'category_id', 'photo_url']
    for (const field of requiredFields) {
        if (!productData[field]) {
            throw new Error(`${field} is required`)
        }
    }
    return await this.repository.createProduct(productData)
  }
  async findProductByCategory(categoryId) {
    return await this.repository.findProductByCategory(categoryId)
  }   
  async findProductByName(name) {
    return await this.repository.findProductByName(name)
  }
}