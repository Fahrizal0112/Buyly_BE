import { AuthService } from "../services/auth.service";

export class AuthController {
    constructor() {
        this.service = new AuthService()
    }

    async login(credentials) {
        return await this.service.login(credentials)
    }
    async register(userData) {
        return await this.service.register(userData)
    }

    async updateUser(userData) {
        return await this.service.updateUser(userData)
    }
    async logout(){
        return {
            message : "Logout Successfully"
        }
    }

    async getMe(token) {
        return await this.service.getMe(token);
    }
}