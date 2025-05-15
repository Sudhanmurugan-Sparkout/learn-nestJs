import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    user: string;
    @IsNotEmpty()
    @IsNumber()
    price: number
}