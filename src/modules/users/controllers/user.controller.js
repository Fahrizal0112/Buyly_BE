import { UserService } from '../services/user.service'

export class UserController {
  constructor() {
    this.service = new UserService()
  }

  async getUsers() {
    return await this.service.getUsers()
  }

  async getUserById(id) {
    return await this.service.getUserById(id)
  }

  async createUser(data) {
    return await this.service.createUser(data)
  }

  async updateUser(id, data) {
    return await this.service.updateUser(id, data)
  }

  async deleteUser(id) {
    return await this.service.deleteUser(id)
  }
} 