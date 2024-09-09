import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { PostDetails, PostType } from './post.type';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
    constructor(    
        private readonly prisma: PrismaService,
    ) {}

    async saveVideo(
        video: {
            createReadStream: () => any;
            filename: string;
            mimetype: string;
        }
    ): Promise<string> {
        if (!video || !['video/mp4'].includes(video.mimetype)) {
            throw new BadRequestException('Invalide video file format only .mp4');
        }
        const videoName = `${Date.now()}${extname(video.filename)}`;
        const videoPath = `/files/${videoName}`;
        const stream = video.createReadStream();
        const outputPath = `public${videoPath}`;
        const writeStream = createWriteStream(outputPath);
        stream.pipe(writeStream);
        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });

        return videoPath;
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
      console.log('data ---------> ', data);
        return await this.prisma.post.create({
          data: data,
        });
    }

    async getPostById(id: number): Promise<PostDetails> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: { user: true, likes: true, comments: true },
      });
      // get all other post ids of the user with the post above
      const postIds = await this.prisma.post.findMany({
        where: { userId: post.userId },
        select: { id: true },
      });
      // console.log("get post by id =============== ", { ...post, otherPostIds: postIds.map((post) => post.id) });
      return { ...post, otherPostIds: postIds.map((post) => post.id) };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


    async getPosts(skip: number, take: number): Promise<PostType[]> {
        return await this.prisma.post.findMany({
            skip,
            take,
            include: { user: true, likes: true, comments: true },
            orderBy: { createdAt: 'desc' },
        })
    }

    async getPostsByUserId(userId: number): Promise<PostType[]> {
      return await this.prisma.post.findMany({
        where: {
          userId: userId,
        },
        include: {user: true}
      })
    }

    async deletePost(id: number): Promise<void> {
      const post = await this.getPostById(id);
      try {
        const fs = await import('fs');
        fs.unlinkSync(`public${post.video}`);
      }catch(error) {
        throw new NotFoundException(error.message);
      }
      await this.prisma.post.delete({ where: {id}});
    }
}
