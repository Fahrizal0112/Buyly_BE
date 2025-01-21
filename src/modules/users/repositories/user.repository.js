import prisma from '@/lib/prisma'

export class UserRepository {
  async findAll() {
    return await prisma.users.findMany()
  }

  async findById(id) {
    return await prisma.users.findUnique({
      where: { id }
    })
  }

  async create(data) {
    return await prisma.users.create({
      data
    })
  }

  async update(id, data) {
    return await prisma.users.update({
      where: { id },
      data
    })
  }

  async delete(id) {
    return await prisma.users.delete({
      where: { id }
    })
  }
} 