import { AddressService } from "../services/address.services";

export class AddressController {
    constructor() {
        this.service = new AddressService()
    }
    async createAddress(addressData) {
        return await this.service.createAddress(addressData)
    }
    async updateAddress(addressData) {
        return await this.service.updateAddress(addressData)
    }
    async deleteAddress(id) {
        return await this.service.deleteAddress(id)
    }
}