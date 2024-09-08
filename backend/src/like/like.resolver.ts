<<<<<<< HEAD
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class LikeResolver {}
=======
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { LikeService } from './like.service';
import { Request } from 'express';
import { LikeType } from './like.type';
import { UseGuards } from '@nestjs/common';


@UseGuards(GraphqlAuthGuard)
@Resolver()
export class LikeResolver {
    constructor(
        private readonly likeService: LikeService,
    ) {}

    @Mutation(() => LikeType)
    async likePost(
        @Args('postId') postId: number,
        @Context() ctx: {req: Request}
    )
    {
        return this.likeService.likePost({postId, userId: ctx.req.user.sub})
    }

    @Mutation(() => LikeType)
    async unlikePost(
        @Args('postId') postId: number,
        @Context() ctx: {req: Request}
    )
    {
        return this.likeService.unlikePost(postId, ctx.req.user.sub);
    }
}
>>>>>>> 3f55ca3068809a2923a1f52286b513311eef1362
