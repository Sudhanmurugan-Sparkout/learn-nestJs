import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto';

@Controller('book')
export class BookController {

    constructor(private bookService: BookService) {}
    @Get()
    getAllBook() {
        return 'This is a book';
    }

    @Get(':id')
    async getBook(@Param('id') id: string) {
        return await this.bookService.findOne(id);
    }

    @Post()
    async createBook(@Body () dto : CreateBookDto) {
        return await this.bookService.create(dto);
    }
    
}
