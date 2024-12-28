# RGT 도서관리 시스템

## 프로젝트 소개

RGT 도서관리 시스템은 도서 목록을 관리하고 조회할 수 있는 웹 애플리케이션입니다.

## 주요 기능

### 일반 사용자

- 도서 목록 조회
- 도서 상세 정보 조회
- 제목/저자 기반 도서 검색
- 페이지네이션

### 관리자

- 도서 등록/수정/삭제
- 재고 관리
- 도서 정보 관리

### 인증 시스템

- HTTP-only 쿠키 기반 JWT 인증
- 미들웨어를 통한 관리자 페이지 보호
- 로그인/로그아웃 관리

### 도서 관리

- 서버 사이드 렌더링을 통한 초기 데이터 로드
- React Query를 활용한 클라이언트 사이드 데이터 관리
- 실시간 검색 및 필터링

### 페이지네이션

- 쿼리 파라미터 기반 페이지네이션
- 검색 조건 유지
- 동적 페이지 이동

## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- Zustand

## 프로젝트 구조
```
src/
├── app/ # Next.js 페이지 및 레이아웃
│ ├── (auth)/ # 인증 관련 페이지
│ ├── admin/ # 관리자 페이지
│ └── books/ # 일반 사용자 페이지
├── components/ # 재사용 가능한 컴포넌트
├── hooks/ # 커스텀 훅
├── services/ # API 서비스
├── store/ # 상태 관리
├── styles/ # 전역 스타일
└── types/ # TypeScript 타입 정의
```
## 라우팅 구조

- `/books/list` - 도서 목록 (일반 사용자)
- `/books/detail/:id` - 도서 상세 정보
- `/admin/books/list` - 관리자 도서 목록
- `/admin/books/new` - 새 도서 등록
- `/admin/books/detail/:id/edit` - 도서 정보 수정
