export class PaginationDto {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const DEFAULT_PAGINATION_VALUES = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: 'DESC',
} as const;
