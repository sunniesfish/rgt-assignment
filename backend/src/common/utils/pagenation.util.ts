import {
  PaginationDto,
  DEFAULT_PAGINATION_VALUES,
} from '../dtos/pagenation.dto';

export function createPaginationOptions(dto: PaginationDto) {
  return {
    page: dto.page || DEFAULT_PAGINATION_VALUES.PAGE,
    limit: dto.limit || DEFAULT_PAGINATION_VALUES.LIMIT,
    order: dto.order || DEFAULT_PAGINATION_VALUES.ORDER,
    skip:
      ((dto.page || DEFAULT_PAGINATION_VALUES.PAGE) - 1) *
      (dto.limit || DEFAULT_PAGINATION_VALUES.LIMIT),
  };
}

export function calculatePaginationMeta(
  total: number,
  page: number,
  limit: number,
) {
  const lastPage = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    lastPage,
    hasNextPage: page < lastPage,
    hasPreviousPage: page > 1,
  };
}
