import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/books.entity';
import { BookMetadata } from './entities/book-metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookMetadata])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
