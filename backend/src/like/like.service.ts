import { Injectable } from '@nestjs/common';
<<<<<<< HEAD

@Injectable()
export class LikeService {}
=======
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './createLike.dto';

@Injectable()
export class LikeService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async likePost(data: CreateLikeDto) {
        return this.prisma.like.create({
            data
        })
    }

    async unlikePost(postId: number, userId: number) {
        return this.prisma.like.delete({
            where: {
                userId_postId: {
                    postId,
                    userId
                }
            }
        })
    }
}
>>>>>>> 3f55ca3068809a2923a1f52286b513311eef1362
