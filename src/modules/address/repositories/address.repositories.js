import prisma from "@/lib/prisma";

export class AddressRepository {
    async createAddress(addressData) {
        return await prisma.adresses.create({
            data: {
                user_id: addressData.user_id,
                street: addressData.street,
                city: addressData.city,
                state: addressData.state,
                zip_code: addressData.zip_code
            },
            include: {
                user: true
            }
        });
    }

    async updateAddress(addressData) {
        return await prisma.adresses.update({
            where: { id: addressData.id },
            data: addressData
        });
    }

    async deleteAddress(id) {
        return await prisma.adresses.delete({
            where: { id: id }
        });
    }
}