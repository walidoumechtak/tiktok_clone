import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { Response, Request, response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

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
        const payload = {username: user.fullname, sub: user.id};

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
        
    }
}
