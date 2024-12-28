import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  UserExistsException,
  InvalidCredentialsException,
} from './exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { userId, password, employeeId } = signUpDto;

    const existingUserById = await this.userRepository.findOne({
      where: { userId },
    });
    if (existingUserById) {
      throw new UserExistsException('사용자 ID');
    }

    const existingUserByEmployeeId = await this.userRepository.findOne({
      where: { employeeId },
    });
    if (existingUserByEmployeeId) {
      throw new UserExistsException('사원 번호');
    }

    try {
      const user = this.userRepository.create({
        userId,
        password,
        employeeId,
      });
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error('사용자 등록 중 오류가 발생했습니다. :' + error);
    }
  }

  async signIn(signInDto: SignInDto, res: Response): Promise<void> {
    const { userId, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user || !(await user.validatePassword(password))) {
      throw new InvalidCredentialsException();
    }

    try {
      const token = this.getJwtToken(user);
      res.cookie('Authentication', token, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'strict',
        maxAge: 1 * 60 * 60 * 1000, // 1 hours
      });
    } catch (error) {
      throw new Error('로그인 처리 중 오류가 발생했습니다. :' + error);
    }
  }

  async signOut(res: Response): Promise<void> {
    try {
      res.clearCookie('Authentication');
    } catch (error) {
      throw new Error('로그아웃 처리 중 오류가 발생했습니다. :' + error);
    }
  }

  async checkUserId(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { userId } });
    return !!user;
  }

  private getJwtToken(user: User): string {
    try {
      const payload = { userId: user.userId, sub: user.employeeId };
      return this.jwtService.sign(payload, {
        expiresIn: '1h',
      });
    } catch (error) {
      throw new Error('토큰 생성 중 오류가 발생했습니다. :' + error);
    }
  }
}
