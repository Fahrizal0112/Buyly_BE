import prisma from "@/lib/prisma";

export class ProductRepository {
  async findAllProducts() {
    return await prisma.products.findMany({
      include: {
        category: true,
      },
    });
  }
  async findProductById(id) {
    return await prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });
  }
  async createProduct(productData) {
    return await prisma.products.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        photo_url: productData.photo_url,
        category_id: productData.category_id,
      },
      include: {
        category: true,
      },
    });
  }
  async findProductByCategory(categoryId) {
    return await prisma.products.findMany({
      where: { category_id: Number(categoryId) },
      include: {
        category: true,
      },
    });
  }
  async findProductByName(name) {
    return await prisma.products.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
      include: {
        category: true,
      },
    });
  }
}
