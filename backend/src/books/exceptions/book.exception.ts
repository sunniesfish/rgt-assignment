import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotFoundException extends HttpException {
  constructor(bookId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Book Not Found',
        message: `ID가 ${bookId}인 도서를 찾을 수 없습니다.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class BookOperationException extends HttpException {
  constructor(operation: string, detail: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Book Operation Failed',
        message: `도서 ${operation} 작업 실패: ${detail}`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
