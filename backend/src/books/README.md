# 도서 관리 API 문서

## 기본 정보

- 기본 URL: `/api/books`
- 페이지네이션이 적용된 응답은 다음 형식을 따릅니다:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
```

## API 엔드포인트

### 1. 도서 목록 조회

- **URL**: `/`
- **Method**: `GET`
- **Description**: 도서 목록을 페이지네이션하여 조회합니다.
- **인증 필요**: No

#### Query Parameters

```typescript
{
  page?: number;      // 기본값: 1
  limit?: number;     // 기본값: 10
  order?: 'ASC' | 'DESC';  // 기본값: 'DESC'
  title?: string;     // 제목 검색
  author?: string;    // 저자 검색
}
```

#### 응답

- **성공**: `200 OK`

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "도서 제목",
      "author": "저자",
      "stockQuantity": 10,
      "price": 20000,
      "createdAt": "2024-03-14T12:00:00Z",
      "updatedAt": "2024-03-14T12:00:00Z"
    }
  ],
  "meta": {
    "totalItems": 100,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 10,
    "currentPage": 1
  }
}
```

### 2. 도서 상세 조회

- **URL**: `/:id`
- **Method**: `GET`
- **Description**: 특정 도서의 상세 정보를 조회합니다.
- **인증 필요**: Yes

#### 응답

- **성공**: `200 OK`

```json
{
  "id": "uuid",
  "title": "도서 제목",
  "author": "저자",
  "publishedDate": "2024-01-01",
  "coverImage": "이미지 URL",
  "coverImageThumbnail": "썸네일 URL",
  "description": "도서 설명",
  "metadata": {
    "id": "uuid",
    "stockQuantity": 10,
    "price": 20000,
    "createdAt": "2024-03-14T12:00:00Z",
    "updatedAt": "2024-03-14T12:00:00Z"
  }
}
```

### 3. 도서 등록

- **URL**: `/`
- **Method**: `POST`
- **Description**: 새로운 도서를 등록합니다.
- **인증 필요**: Yes

#### Request Body

```typescript
{
  title: string;
  author: string;
  publishedDate: Date;
  description?: string;
  coverImage?: string;
  coverImageThumbnail?: string;
  metadata?: {
    stockQuantity?: number;
    price?: number;
  };
}
```

#### 응답

- **성공**: `201 Created`

```json
{
  "id": "uuid",
  "title": "도서 제목",
  "author": "저자",
  "publishedDate": "2024-01-01",
  "coverImage": "이미지 URL",
  "coverImageThumbnail": "썸네일 URL",
  "description": "도서 설명",
  "metadata": {
    "id": "uuid",
    "stockQuantity": 10,
    "price": 20000,
    "createdAt": "2024-03-14T12:00:00Z",
    "updatedAt": "2024-03-14T12:00:00Z"
  }
}
```

### 4. 도서 수정

- **URL**: `/:id`
- **Method**: `PUT`
- **Description**: 기존 도서 정보를 수정합니다.
- **인증 필요**: Yes

#### Request Body

```typescript
{
  title?: string;
  author?: string;
  publishedDate?: Date;
  coverImage?: string;
  coverImageThumbnail?: string;
  description?: string;
  metadata?: {
    price?: number;
    stockQuantity?: number;
  };
}
```

#### 응답

- **성공**: `200 OK`

```typescript
boolean; // true: 수정 성공
```

### 5. 도서 삭제

- **URL**: `/:id`
- **Method**: `DELETE`
- **Description**: 도서를 삭제합니다.
- **인증 필요**: Yes

#### 응답

- **성공**: `200 OK`

```typescript
boolean; // true: 삭제 성공
```

## 에러 응답

모든 에러 응답은 다음 형식을 따릅니다:

```typescript
{
  statusCode: number;
  error: string;
  message: string;
  timestamp: string;
}
```

### 주요 에러 코드

- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 필요
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 도서를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류
