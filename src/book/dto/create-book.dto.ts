import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
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

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    publishedAt: Date;
}