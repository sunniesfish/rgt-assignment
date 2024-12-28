import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagenation.dto';

export class SearchBookDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  author?: string;
}
