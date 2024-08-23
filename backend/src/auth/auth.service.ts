import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { Response, Request, response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}


    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies['refresh-token'];

        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token provided 404');
        }
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');   
        }
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            }
        })

        if (!userExist) {
            throw new BadRequestException('User not found');
        }
        const expireIn = 15001;
        const expiration = Math.floor(Date.now() / 1000) + expireIn;
        const accessToken = this.jwtService.sign(
            {...payload, exp: expiration},
            {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
            }
        );
        res.cookie('access-token', accessToken, {httpOnly: true});
        return accessToken;
    }
    
    private async issueTokens(user: User, res: Response) {
        const payload = {username: user.fullName, sub: user.id};

        const accessToken = this.jwtService.sign(
            {...payload},
            {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn: '150sec',
            }
        )
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
            expiresIn: '7d',
        });
        response.cookie('refresh-token', refreshToken, {httpOnly: true});
        response.cookie('access-token', accessToken, {httpOnly: true});
        
        return { user };
    }

    async validateUser(loginDto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            }
        })
        if (user && await bcrypt.compare(loginDto.password, user.password)) {
            return user;
        }
        return null;
    }

    async register(registerDto: RegisterDto, response: Response) {
        const existedUser = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email,
            }
        });
        if (existedUser) {
            throw new BadRequestException({email: 'Email already exists'});
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                fullName: registerDto.fullName,
                email: registerDto.email,
                password: hashedPassword,
            }
        });
        return this.issueTokens(user, response);
    }

    async login(loginDto: LoginDto, response: Response) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new BadRequestException({ invalidCredentials: 'Invalid credentials'});
        }
        return this.issueTokens(user, response);
    }

    async logout(response: Response) {
        response.clearCookie('refresh-token');
        response.clearCookie('access-token');
        return 'Logged out successfully';
    }
}
