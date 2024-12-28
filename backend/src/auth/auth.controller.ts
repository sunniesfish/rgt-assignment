import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  UseFilters,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthExceptionFilter } from './filters/auth-exception.filter';
import { AuthResponse } from './interfaces/auth-response.interface';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponse> {
    await this.authService.signUp(signUpDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입이 성공적으로 완료되었습니다.',
    };
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    await this.authService.signIn(signInDto, res);
    return {
      statusCode: HttpStatus.OK,
      message: '로그인이 성공적으로 완료되었습니다.',
    };
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    await this.authService.signOut(res);
    return {
      statusCode: HttpStatus.OK,
      message: '로그아웃이 성공적으로 완료되었습니다.',
    };
  }

  @Public()
  @Post('check-user-id')
  @HttpCode(HttpStatus.OK)
  async checkUserId(@Body('userId') userId: string): Promise<boolean> {
    return !(await this.authService.checkUserId(userId));
  }

  @Get('check-auth')
  @HttpCode(HttpStatus.OK)
  async checkAuth(): Promise<boolean> {
    return true;
  }
}
