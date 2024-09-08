import { Args, Context, Query, Mutation, Resolver, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
// import { GraphQLUpload } from 'graphql-upload-ts';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { PostDetails, PostType } from './post.type';
import { UseGuards } from '@nestjs/common'; 
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver()
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => PostType)
    async createPost(
        @Context() ctx: {req: Request},
        @Args({name: 'video', type: () => GraphQLUpload}) video: any,
        @Args('text') text: string,
    ) {
        console.log("yup it enter ===================== ")
        const userId = ctx.req.user?.sub;
        const videoPath = await this.postService.saveVideo(video);
        const data: Prisma.PostCreateInput = {
            text,
            video: videoPath,
            user: { connect: { id: userId } },
        }
        return await this.postService.createPost(data);
    }

    // Query to get post by id ==============================
    @Query(() => PostDetails)
    async getPostById(@Args('id') id: number){
        return await this.postService.getPostById(id);
    }

    // Query to get all posts ==============================
    @Query(() => [PostType])
    async getPosts(
        @Args('skip', {type: () => Int, defaultValue: 0}) skip: number,
        @Args('take', {type: () => Int, defaultValue: 1}) take: number,
    ): Promise<PostType[]> {
        return await this.postService.getPosts(skip, take);
    }

    // Mutation to delete post by id ==============================
    @Mutation(() => PostType)
    async deletePost(@Args('id') id: number) {
        return await this.postService.deletePost(id);
    } 

    // Query to get posts by user id ==============================
    async getPostsByUserId(
        @Args('userId') userId: number,
    ): Promise<PostType[]> {
        return await this.postService.getPostsByUserId(userId);
    }
    
}
