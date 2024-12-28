# 인증 API 문서

## 기본 정보

- 기본 URL: `/api/auth`
- 모든 응답은 다음 형식을 따릅니다:

```typescript
interface AuthResponse<T = void> {
  statusCode: number; // HTTP 상태 코드
  message: string; // 응답 메시지
  data?: T; // 선택적 데이터
}
```

## API 엔드포인트

### 1. 회원가입

- **URL**: `/signup`
- **Method**: `POST`
- **Description**: 새로운 사용자를 생성합니다.

#### Request Body

```typescript
{
  userId: string; // 4-10자, 영문자와 숫자만 허용
  password: string; // 6-30자, 대문자/소문자/숫자/특수문자 포함
  employeeId: string; // 4-15자, 대문자와 숫자만 허용
}
```

#### 예제

```json
{
  "userId": "john123",
  "password": "Test1234!",
  "employeeId": "EMP123"
}
```

#### 응답

- **성공**: `201 Created`

```json
{
  "statusCode": 201,
  "message": "회원가입이 성공적으로 완료되었습니다."
}
```

- **실패**: `409 Conflict` - 중복된 사용자

```json
{
  "statusCode": 409,
  "error": "User Already Exists",
  "message": "이미 존재하는 사용자 ID입니다."
}
```

### 2. 로그인

- **URL**: `/signin`
- **Method**: `POST`
- **Description**: 사용자 인증 후 JWT 토큰을 HTTP-only 쿠키로 설정합니다.

#### Request Body

```typescript
{
  userId: string; // 사용자 ID
  password: string; // 비밀번호
}
```

#### 예제

```json
{
  "userId": "john123",
  "password": "Test1234!"
}
```

#### 응답

- **성공**: `200 OK`

```json
{
  "statusCode": 200,
  "message": "로그인이 성공적으로 완료되었습니다."
}
```

- **Cookie**: `Authentication={jwt_token}` (HTTP-only)

- **실패**: `401 Unauthorized`

```json
{
  "statusCode": 401,
  "error": "Invalid Credentials",
  "message": "아이디 또는 비밀번호가 잘못되었습니다."
}
```

### 3. 로그아웃

- **URL**: `/signout`
- **Method**: `POST`
- **Description**: 인증 쿠키를 제거합니다.
- **인증 필요**: Yes

#### 응답

- **성공**: `200 OK`

```json
{
  "statusCode": 200,
  "message": "로그아웃이 성공적으로 완료되었습니다."
}
```

### 4. 사용자 ID 중복 확인

- **URL**: `/check-user-id`
- **Method**: `POST`
- **Description**: 사용자 ID의 사용 가능 여부를 확인합니다.

#### Request Body

```json
{
  "userId": "john123"
}
```

#### 응답

- **성공**: `200 OK`

```typescript
boolean; // true: 사용 가능, false: 사용 불가
```

### 5. 인증 상태 확인

- **URL**: `/check-auth`
- **Method**: `GET`
- **Description**: 현재 사용자의 인증 상태를 확인합니다.
- **인증 필요**: Yes

#### 응답

- **성공**: `200 OK`

```typescript
boolean; // true: 인증됨
```

## 에러 응답 형식

모든 에러 응답은 다음 형식을 따릅니다:

```typescript
{
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: string;
}
```
