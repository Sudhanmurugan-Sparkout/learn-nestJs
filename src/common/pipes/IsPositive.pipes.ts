import { Injectable, BadRequestException, PipeTransform } from "@nestjs/common";

@Injectable()
export class IsPositivePipe implements PipeTransform {
    transform(value: number) {
        if (value < 0) {
            throw new BadRequestException(`${value} is not a positive number`);
        }
        return value;
    }
}