import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('book')
export class BookController {

    constructor(private bookService: BookService , private readonly eventEmitter: EventEmitter2) {}
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
        const book = await this.bookService.create(dto);
        this.eventEmitter.emit('book.created', book);
        return book;    
    }
    
}
