import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { ServeStaticModule } from '@nestjs/serve-static';
<<<<<<< HEAD
=======
import { CommentModule } from './comment/comment.module';
>>>>>>> 3f55ca3068809a2923a1f52286b513311eef1362

@Module({
  imports: [
	  ServeStaticModule.forRoot({
	  	rootPath: join(__dirname, '..', 'public'),
		  serveRoot: '/',
	  }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot({
      // isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    LikeModule,
<<<<<<< HEAD
=======
    CommentModule,
>>>>>>> 3f55ca3068809a2923a1f52286b513311eef1362
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
