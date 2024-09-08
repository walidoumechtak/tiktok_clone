import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './comment.type';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver()
export class CommentResolver {
    constructor(
        private commentService: CommentService,
    ) {}

    @Query((returns) => [Comment])
    async getCommentsByPostId(@Args('postId') postId: number) {
        return this.commentService.getCommentsByPostId(postId);
    }

    @UseGuards(GraphqlAuthGuard)
    @Mutation((returns) => Comment)
    async createComment(
        @Args('postId') postId: number,
        @Args('text') text: string,
        @Context() ctx: { req: Request},
    ) {
        return this.commentService.createComment({ 
            text: text,
            postId: postId,
            userId: ctx.req.user.sub
        });
    }

    @UseGuards(GraphqlAuthGuard)
    @Mutation((returns) => Comment)
    async deleteComment(
        @Args('id') id: number,
        @Context() ctx: { req: Request},
    ) {
        return this.commentService.deleteComment(id, ctx.req.user.sub);
    }
}
