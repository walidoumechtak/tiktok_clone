import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginResponse, RegisterResponse } from 'src/auth/types';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { User } from './user.model';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createReadStream, createWriteStream, read } from 'fs';

@Resolver()
export class UserResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    // *************************************************************************************
    // register() will create a new user in the database,
    // but before it will check if the email is already in use.

    @UseFilters(GraphQLErrorFilter)
    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: { res: Response }
    ): Promise<RegisterResponse> {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException(
                {
                    confirmPassword: 'Passwords do not match',
                })
        };

        const { user } = await this.authService.register(registerDto, context.res);
        console.log("user: ", user);
        return { user };
    }

    // *************************************************************************************
    // login() check if the user exists in the database and if the password is correct.
    // If the user exists and the password is correct, the login() method will return a token.
   
    @UseFilters(GraphQLErrorFilter)
    @Mutation(() => LoginResponse)
    async login(
        @Args('loginInput') loginDto: LoginDto,
        @Context() context: { res: Response }
    ) {
        return this.authService.login(loginDto, context.res);
    }

    /* ************************************************************************** 
        The logout() method will clear the cookie that contains the refresh token.
    *****************************************************************************/

    @Mutation(() => String)
    async logout(
        @Context() context: { res: Response }
    ): Promise<string> {
        return this.authService.logout(context.res);
    }

    // ****************************************************************************
    // refreshToken() will be used to refresh the access token. 

    @Mutation(() => String)
    async refreshToken(@Context() context: { req: Request; res: Response }) {
      try {
        return this.authService.refreshToken(context.req, context.res);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    // ****************************************************************************
    // getUsers() will return all users from the database.

    @Query(() => [User])
    async getUsers() {
        return this.userService.getUsers();
    }

    @Query(() => String)
    async hello() {
        return 'Hello World';
    }

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => User)
    async updateUserProfile(
        @Context() ctx: { req: Request },
        @Args('fullName', {type: () => String, nullable: true}) fullName?: string,
        @Args('bio', {type: () => String, nullable: true}) bio?: string,
        @Args('image', {type: () => GraphQLUpload, nullable: true}) image?: GraphQLUpload,
    ) {
        console.log("ctx.req.user.sub: ", ctx.req.user.sub);
        let imageUrl;
        if (image) {
            imageUrl = await this.storeImageAndGetURL(image);
        }
        return this.userService.updateProfile(ctx.req.user.sub, {fullName, bio, image: imageUrl});
    }

    private async storeImageAndGetURL(file: GraphQLUpload): Promise<string> {
        const { createReadStream, filename } = await file;
        const fileData = await file;
        console.log('fileData!', fileData);
    
        const uniqueFilename = `${uuidv4()}_${filename}`;
        const imagePath = join(process.cwd(), 'public', uniqueFilename);
        const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
        const readStream = createReadStream();
        readStream.pipe(createWriteStream(imagePath));
    
        return imageUrl; // Return the appropriate URL where the file can be accessed
      }
}
