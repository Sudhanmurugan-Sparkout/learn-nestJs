import { InternalServerErrorException, ConflictException } from "@nestjs/common";

export  function manualErrorHandling(error: any) {
    if (error.code === 11000) {
        const field =  Object.keys(error.keyPattern)[0];
        throw new ConflictException(`${field} already exists`);
    }
    throw new InternalServerErrorException();
}