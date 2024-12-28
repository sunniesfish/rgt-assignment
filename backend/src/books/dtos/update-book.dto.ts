import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for updating book metadata
 */
class BookMetadataDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stockQuantity?: number;
}

/**
 * DTO for updating a book
 */
export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedDate?: Date;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  coverImageThumbnail?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  metadata?: BookMetadataDto;
}
