import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {

    constructor(
        private prisma: PrismaService,
    ) {}

    async getCommentsByPostId(postId: number): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                postId,
            },
            include: {
                user: true,
                post: true,
            }
        })
    }

    async createComment(data: CreateCommentDto): Promise<Comment> {
        return this.prisma.comment.create({
            data,
            include: {
                user: true,
                post: true,
            }
        })
    }

    async deleteComment(commentId: number, userId: number){
        const comment = await this.prisma.comment.findUnique({
            where: {
                id: commentId,
            }
        })

        if (!comment) {
            throw new NotFoundException('Comment not found')
        }

        if (comment.userId !== userId) {
            throw new NotFoundException('You are not the author of this comment')
        }

        return this.prisma.comment.delete({
            where: {
                id: commentId,
            }
        })
    }
}
