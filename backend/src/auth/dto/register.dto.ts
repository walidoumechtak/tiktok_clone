import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({message: 'Fullname is required'})
    @IsString({message: 'Fullname must be a string'})
    fullName: string;

    
    @Field()
    @IsNotEmpty({message: 'Username is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters'})
    password: string;
    
    @Field()
    @IsNotEmpty({message: 'Confirm password is required'})
    confirmPassword: string;
    
    @Field()
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Invalid email'})
    email: string;
}