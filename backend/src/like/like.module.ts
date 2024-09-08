import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
<<<<<<< HEAD

@Module({
  providers: [LikeService, LikeResolver]
=======
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Module({
  providers: [LikeService, LikeResolver, PrismaService, JwtService, ConfigService, GraphqlAuthGuard]
>>>>>>> 3f55ca3068809a2923a1f52286b513311eef1362
})
export class LikeModule {}
