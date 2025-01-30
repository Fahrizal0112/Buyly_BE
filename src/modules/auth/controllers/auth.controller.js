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
    async logout(){
        return {
            message : "Logout Successfully"
        }
    }
}