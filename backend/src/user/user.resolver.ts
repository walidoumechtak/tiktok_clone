import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginResponse, RegisterResponse } from 'src/auth/types';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { BadRequestException } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';

@Resolver()
export class UserResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: {res: Response}
    ): Promise<RegisterResponse> {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException(
                {
                    confirmPassword: 'Passwords do not match',
                })    
        };

        try{
            const { user } = await this.authService.register(registerDto, context.res);
            console.log("user: ", user);
            return { user };
        } catch(error) {
            return {
                error: {
                    message: error.message,
                }
            }
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Args('loginInput') loginDto: LoginDto,
        @Context() context: {res: Response}
    ) {
        return this.authService.login(loginDto, context.res);
    }

    @Mutation(() => String)
    async logout(
        @Context() context: {res: Response}
    ): Promise<string> {
        return this.authService.logout(context.res);
    }

    @Mutation(() => String)
    async refreshToken(
        @Context() context: {req: Request, res: Response}
    ) {
        try {
            return this.authService.refreshToken(context.req, context.res); 
        } catch(error) {
            throw new BadRequestException(error.message)
        }
    }

    @Query(() => String)
    async hello() {
        return 'Hello World';
    }
}
