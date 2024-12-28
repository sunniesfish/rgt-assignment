import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsAlphanumeric,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: '사용자 ID는 최소 4자 이상이어야 합니다' })
  @MaxLength(10, { message: '사용자 ID는 최대 10자까지 가능합니다' })
  @IsAlphanumeric('en-US', {
    message: '사용자 ID는 영문자와 숫자만 사용 가능합니다',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
  @MaxLength(30, { message: '비밀번호는 최대 30자까지 가능합니다' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: '사원번호는 최소 4자 이상이어야 합니다' })
  @MaxLength(15, { message: '사원번호는 최대 15자까지 가능합니다' })
  @Matches(/^[A-Z0-9]+$/, {
    message: '사원번호는 대문자와 숫자만 사용 가능합니다',
  })
  employeeId: string;
}
