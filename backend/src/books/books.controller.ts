import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { SearchBookDto } from './dtos/search-book.dto';
import { BookMetadata } from './entities/book-metadata.entity';
import { PaginatedResponse } from 'src/common/dtos/pagenation.dto';
import { Book } from './entities/books.entity';
import {
  BookNotFoundException,
  BookOperationException,
} from './exceptions/book.exception';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Public()
  @Get('')
  async getAllBooks(
    @Query() searchDto: SearchBookDto,
  ): Promise<PaginatedResponse<BookMetadata>> {
    try {
      return await this.booksService.findAll(searchDto);
    } catch (error) {
      if (error instanceof BookOperationException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '도서 목록을 가져오는데 실패했습니다.',
      );
    }
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    try {
      const book = await this.booksService.findOne(id);
      if (!book) {
        throw new BookNotFoundException(id);
      }
      return book;
    } catch (error) {
      if (error instanceof BookNotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '도서 정보를 가져오는데 실패했습니다.',
      );
    }
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    try {
      return await this.booksService.create(createBookDto);
    } catch (error) {
      if (error instanceof BookOperationException) {
        throw error;
      }
      throw new InternalServerErrorException('도서 생성에 실패했습니다.');
    }
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<boolean> {
    try {
      const result = await this.booksService.update(id, updateBookDto);
      return result.affected > 0;
    } catch (error) {
      if (error instanceof BookOperationException) {
        throw error;
      }
      throw new InternalServerErrorException('도서 수정에 실패했습니다.');
    }
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<boolean> {
    try {
      const result = await this.booksService.remove(id);
      return result.affected > 0;
    } catch (error) {
      if (error instanceof BookOperationException) {
        throw error;
      }
      throw new InternalServerErrorException('도서 삭제에 실패했습니다.');
    }
  }
}
