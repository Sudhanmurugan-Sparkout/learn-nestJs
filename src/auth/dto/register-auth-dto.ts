import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class RegisterAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: 'Password is too long' })
    @MinLength(6 , { message: 'At least 6 characters required for password' })
    password: string;

    @IsNotEmpty()
    @IsString()
    username: string;
}