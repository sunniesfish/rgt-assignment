import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Authentication Error',
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class UserExistsException extends HttpException {
  constructor(field: string) {
    super(
      {
        status: HttpStatus.CONFLICT,
        error: 'User Already Exists',
        message: `이미 존재하는 ${field}입니다.`,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid Credentials',
        message: '아이디 또는 비밀번호가 잘못되었습니다.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
