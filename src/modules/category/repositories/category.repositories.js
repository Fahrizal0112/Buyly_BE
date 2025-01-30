import prisma from "@/lib/prisma";

export class CategoryRepository {
    async findAllCategories() {
        return await prisma.categories.findMany({
            include: {
                Products: true
            }
        })
    }
    async createCategory(categoryData) {
        try {
            return await prisma.categories.create({
                data: {
                    name: categoryData.name,
                    description: categoryData.description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        } catch (error) {
            console.error('Error creating category:', error)
            throw new Error('Failed to create category')
        }
    }
}