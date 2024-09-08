import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Module({
  providers: [CommentService, CommentResolver, PrismaService, CommentService, JwtService, ConfigService, GraphqlAuthGuard]
})
export class CommentModule {}
