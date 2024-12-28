import { IsObject } from 'class-validator';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  coverImage?: string;
  @IsOptional()
  @IsString()
  coverImageThumbnail?: string;
  @IsOptional()
  @IsObject()
  metadata?: {
    stockQuantity?: number;
    price?: number;
  };
}
