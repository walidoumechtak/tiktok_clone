import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Module({
  providers: [LikeService, LikeResolver, PrismaService, JwtService, ConfigService, GraphqlAuthGuard]
})
export class LikeModule {}
