import { UserRepository } from '../repositories/user.repository'

export class UserService {
  constructor() {
    this.repository = new UserRepository()
  }

  async getUsers() {
    return await this.repository.findAll()
  }

  async getUserById(id) {
    const user = await this.repository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async createUser(data) {
    // Validasi data
    if (!data.email || !data.password) {
      throw new Error('Email and password are required')
    }

    // Cek email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format')
    }

    return await this.repository.create(data)
  }

  async updateUser(id, data) {
    await this.getUserById(id) // Cek apakah user ada
    return await this.repository.update(id, data)
  }

  async deleteUser(id) {
    await this.getUserById(id) // Cek apakah user ada
    return await this.repository.delete(id)
  }
} 