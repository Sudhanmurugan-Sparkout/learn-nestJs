import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {

    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async create(createBookDto: any) {
        console.log(createBookDto);
        return await this.bookModel.create(createBookDto);
    }
    async findAll() {
        return await this.bookModel.find();
    }
    async findOne(id: string) {
        return await this.bookModel.findById(id).populate('user').exec();
    }

}
