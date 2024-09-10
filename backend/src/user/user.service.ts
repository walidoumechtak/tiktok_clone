import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getUsers() {
        return this.prisma.user.findMany({
            include: {
                posts: true,
            },
        });
    }

    async updateProfile(userId: number, data: {fullName?: string, bio?: string, image?: string}) {
        return this.prisma.user.update({
            where: {id: userId},
            data: {
                fullName: data.fullName,
                bio: data.bio,
                image: data.image,
            },
            })
    }
}
