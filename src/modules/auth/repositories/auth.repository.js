import prisma from "@/lib/prisma";

export class AuthRepository {
    async findUserByEmail(email) {
        return await prisma.users.findFirst({
            where: { email }
        })
    }
    async findUserByUsername(username) {
        return await prisma.users.findFirst({
            where: {username}
        })
    }
}