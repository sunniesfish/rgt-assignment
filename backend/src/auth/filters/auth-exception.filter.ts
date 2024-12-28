import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {
  AuthenticationException,
  UserExistsException,
  InvalidCredentialsException,
} from '../exceptions/auth.exception';

@Catch(
  AuthenticationException,
  UserExistsException,
  InvalidCredentialsException,
)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | AuthenticationException
      | UserExistsException
      | InvalidCredentialsException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    return response.status(status).json({
      statusCode: status,
      error: exceptionResponse.error,
      message: exceptionResponse.message,
      timestamp: new Date().toISOString(),
    });
  }
}
