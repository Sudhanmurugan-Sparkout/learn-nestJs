import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { JwtModule } from '@nestjs/jwt';
import { BookEventListener } from './events/book-event-listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    JwtModule,
    EventEmitterModule
  ],
  controllers: [BookController],
  providers: [BookService, BookEventListener],
})
export class BookModule {}
