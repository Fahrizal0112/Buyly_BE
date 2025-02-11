import { AddressRepository } from "../repositories/address.repositories";

export class AddressService {
    constructor() {
        this.repository = new AddressRepository()
    }
    async createAddress(addressData) {
        const requiredFields = ['user_id', 'street', 'city', 'state', 'zip_code']
        for (const field of requiredFields) {
            if (!addressData[field]) {
                throw new Error(`${field} is required`)
            }
        }
        return await this.repository.createAddress(addressData)
    }
    async updateAddress(addressData) {
        return await this.repository.updateAddress(addressData)
    }
    async deleteAddress(id) {
        return await this.repository.deleteAddress(id)
    }
}