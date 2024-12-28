import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/books.entity';
import { DataSource, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookMetadata } from './entities/book-metadata.entity';
import { PaginatedResponse } from 'src/common/dtos/pagenation.dto';
import { SearchBookDto } from './dtos/search-book.dto';
import { calculatePaginationMeta } from 'src/common/utils/pagenation.util';
import {
  BookNotFoundException,
  BookOperationException,
} from './exceptions/book.exception';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(BookMetadata)
    private readonly bookMetadataRepository: Repository<BookMetadata>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    searchDto: SearchBookDto,
  ): Promise<PaginatedResponse<BookMetadata>> {
    try {
      const { page, limit, order, title, author } =
        this.validateSearchParams(searchDto);

      const query =
        this.bookMetadataRepository.createQueryBuilder('book_metadata');

      if (title) {
        query.andWhere('book_metadata.title LIKE :title', {
          title: `%${this.escapeSearchString(title)}%`,
        });
      }
      if (author) {
        query.andWhere('book_metadata.author LIKE :author', {
          author: `%${this.escapeSearchString(author)}%`,
        });
      }

      const skip = (page - 1) * limit;

      const [data, total] = await query
        .orderBy('book_metadata.createdAt', order)
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      if (!data.length && total > 0) {
        throw new BookOperationException(
          '조회',
          '페이지가 범위를 벗어났습니다.',
        );
      }

      return {
        data,
        meta: calculatePaginationMeta(total, page, limit),
      };
    } catch (error) {
      if (error instanceof BookOperationException) {
        throw error;
      }
      throw new BookOperationException(
        '도서 목록 조회 중 오류가 발생했습니다',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Book | undefined> {
    try {
      const book = await this.booksRepository.findOne({
        where: { id },
        relations: ['metadata'],
      });
      if (!book) {
        throw new BookNotFoundException(id);
      }
      return book;
    } catch (error) {
      throw new BookOperationException('조회', error.message);
    }
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      return this.dataSource.transaction(async (manager) => {
        const book = manager.create(Book, createBookDto);
        const bookMetadata = manager.create(BookMetadata, {
          ...createBookDto.metadata,
          title: book.title,
          author: book.author,
          book: book,
        });
        book.metadata = bookMetadata;
        return manager.save(book);
      });
    } catch (error) {
      throw new BookOperationException('생성', error.message);
    }
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    try {
      return this.dataSource.transaction(async (manager) => {
        const book = await manager.findOne(Book, {
          where: { id },
          relations: ['metadata'],
        });
        if (!book) {
          throw new BookNotFoundException(id);
        }

        await manager.update(Book, id, {
          title: updateBookDto.title,
          author: updateBookDto.author,
          publishedDate: updateBookDto.publishedDate,
          coverImage: updateBookDto.coverImage,
          coverImageThumbnail: updateBookDto.coverImageThumbnail,
          description: updateBookDto.description,
        });

        await manager.update(BookMetadata, book.metadata.id, {
          ...updateBookDto.metadata,
          title: updateBookDto.title,
          author: updateBookDto.author,
        });

        return { affected: 1, raw: [], generatedMaps: [] };
      });
    } catch (error) {
      throw new BookOperationException('업데이트', error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return this.booksRepository.delete(id);
    } catch (error) {
      throw new BookOperationException('삭제', error.message);
    }
  }

  private validateSearchParams(searchDto: SearchBookDto): SearchBookDto {
    const { page = 1, limit = 10, order = 'DESC', title, author } = searchDto;
    if (page < 1) {
      throw new BookOperationException(
        '조회',
        '페이지 번호는 1 이상이어야 합니다.',
      );
    }
    if (limit < 1 || limit > 100) {
      throw new BookOperationException(
        '조회',
        '한 페이지당 항목 수는 1-100 사이여야 합니다.',
      );
    }
    if (!['ASC', 'DESC'].includes(order)) {
      throw new BookOperationException('조회', '정렬 순서가 잘못되었습니다.');
    }
    return {
      page,
      limit,
      order,
      title,
      author,
    };
  }

  private escapeSearchString(str: string): string {
    return str.replace(/[%_\\]/g, '\\$&');
  }
}
