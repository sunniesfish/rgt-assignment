# RGT 도서관리 시스템

## 시연 영상

https://youtu.be/504d8aeBEHk

## 프로젝트 개요

RGT 도서관리 시스템은 도서 관리 및 사용자 인증 기능을 제공하는 웹 애플리케이션입니다.

- **백엔드**는 NestJS 기반의 RESTful API 서버로 구현되었으며, 인증, 도서 관리, 데이터 저장 등의 기능을 담당합니다.
- **프론트엔드**는 Next.js를 기반으로 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 활용하여 사용자에게 빠르고 최적화된 경험을 제공합니다.

---

## 기술 스택

### 공통

- **TypeScript**

### 백엔드

- **NestJS**
- **MySQL**
- **TypeORM**
- **JWT**

### 프론트엔드

- **Next.js**
- **React Query**
- **Zustand**

### 배포

1. **프론트엔드 (Vercel)**

   - Next.js 기반의 프론트엔드 애플리케이션이 Vercel에 배포되어 있습니다.
   - 사용자는 브라우저를 통해 이 프론트엔드에 접근합니다.

2. **백엔드 (AWS EC2)**

   - 백엔드는 AWS EC2 인스턴스에서 구동되고 있습니다.
   - 이 인스턴스에는 NestJS 애플리케이션이 설치되어 있으며, Nginx가 리버스 프록시로 설정되어 있습니다.
   - Nginx는 외부 요청을 NestJS 애플리케이션으로 전달합니다.

3. **데이터베이스 (MySQL)**
   - MySQL 데이터베이스는 NestJS 애플리케이션의 데이터 저장소로 사용됩니다.
   - EC2 인스턴스 내에 설치되어 있으며, NestJS 애플리케이션과 상호작용합니다.

```
+-------------------+          +-------------------+
|                   |          |                   |
|     Vercel        |          |     AWS EC2       |
|  (Frontend)       |          |  (Backend)        |
|                   |          |                   |
+-------------------+          +-------------------+
          |                              |
          |                              |
          |                              |
          v                              v
+-------------------+          +-------------------+
|                   |          |                   |
|  User's Browser   | <------> |     Nginx         |
|                   |          |  (Reverse Proxy)  |
+-------------------+          +-------------------+
                                      |
                                      |
                                      v
                             +-------------------+
                             |                   |
                             |     NestJS        |
                             |  (Application)    |
                             |                   |
                             +-------------------+
                                      |
                                      |
                                      v
                             +-------------------+
                             |                   |
                             |     MySQL         |
                             |  (Database)       |
                             |                   |
                             +-------------------+

```

## 주요 기능

### 공통 기능

- **JWT 인증**: HTTP-only 쿠키를 사용한 인증으로 XSS 공격 방어.
- **보안 강화**: 민감 정보는 환경 변수로 관리, 비밀번호는 bcrypt로 해시화.

### 백엔드 주요 기능

- **회원가입 및 로그인**: 사용자 등록 및 인증 기능.
- **인증 상태 확인**: 현재 사용자 인증 여부 확인.
- **도서 관리**:
  - 도서 목록 조회 (페이지네이션 지원)
  - 작가, 제목으로 도서 필터링링
  - 도서 상세 정보 조회
  - 도서 등록, 수정, 삭제

### 프론트엔드 주요 기능

- **데이터 관리**:
  - React Query와 Zustand를 사용한 효율적인 데이터 및 상태 관리.
- **UX 최적화**:
  - 서버 사이드 렌더링과 코드 스플리팅.

---

## 프로젝트 구조

### 백엔드 구조

```
src/
├── auth/                  # 인증 관련 모듈
│   ├── controllers/       # 인증 컨트롤러
│   ├── services/          # 인증 서비스
│   ├── guards/            # 인증 가드
│   ├── strategies/        # 인증 전략
│   └── entities/          # 인증 엔티티
├── books/                 # 도서 관리 모듈
│   ├── controllers/       # 도서 컨트롤러
│   ├── services/          # 도서 서비스
│   ├── entities/          # 도서 엔티티
│   └── dtos/              # 데이터 전송 객체
├── common/                # 공통 모듈
│   ├── filters/           # 예외 필터
│   ├── decorators/        # 커스텀 데코레이터
│   └── utils/             # 유틸리티 함수
└── config/                # 설정 파일
```

### 프론트엔드 구조

```
src/
├── app/                    # Next.js 페이지 및 레이아웃
│   ├── (auth)/            # 인증 관련 페이지
│   ├── admin/             # 관리자 페이지
│   │   ├── books/         # 관리자 도서 관리
│   │   │   ├── detail/    # 도서 상세 정보
│   │   │   ├── list/      # 도서 목록
│   │   │   └── new/       # 새 도서 등록
│   └── books/             # 일반 사용자 페이지
│       ├── detail/        # 도서 상세 정보
│       └── list/          # 도서 목록
├── components/            # 재사용 가능한 컴포넌트
│   ├── auth/              # 인증 관련 컴포넌트
│   ├── books/             # 도서 관련 컴포넌트
│   └── ui/                # UI 컴포넌트
├── config/                # 설정 파일
├── hooks/                 # 커스텀 훅
├── lib/                   # 라이브러리 및 유틸리티
├── services/              # API 서비스
├── store/                 # 상태 관리
├── styles/                # 전역 스타일
└── types/                 # TypeScript 타입 정의
```

---

## 보안

1. HTTP-only 쿠키를 통해 JWT 토큰 관리.
2. Nginx 또는 AWS와 같은 프록시 서버를 사용하여 HTTPS로 트래픽 보호.
3. 환경 변수로 민감 정보 관리.

---

## 구현 상의 특징

### 초기 데이터 로딩 전략

이 프로젝트는 React Server Components(RSC)와 TanStack Query(React Query)를 활용하여 초기 데이터를 효율적으로 로딩합니다.

1. **서버 사이드 데이터 페칭 (RSC)**

   - React Server Components를 사용하여 서버에서 직접 데이터를 페치.
   - 클라이언트 사이드에서 불필요한 데이터 페칭을 줄이고, 초기 로딩 시간을 단축.
   - 서버에서 데이터를 렌더링하므로 SEO 최적화에 유리.

2. **클라이언트 사이드 데이터 관리 (TanStack Query)**

   - RSC를 통해 받은 초기 데이터를 TanStack Query의 `initialData`로 설정하여, 클라이언트에서 즉시 사용할 수 있도록 구현.
   - 적절한 `staleTime`을 설정하여 데이터가 일정 시간 동안 신선하게 유지되도록 하여, 불필요한 재요청을 방지.

3. **사용자 경험 개선**
   - 초기 로딩 시 서버에서 데이터를 가져와 사용자에게 빠르게 콘텐츠를 제공.
   - 클라이언트에서 데이터가 변경되면 TanStack Query가 자동으로 업데이트를 관리하여, 사용자에게 최신 정보를 제공.

```
export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const author = Array.isArray(params.author)
    ? params.author[0]
    : params.author;
  const pageNumber = parseInt(params.page || "1", 10);

  const books = await bookService.getBooks({
    page: pageNumber,
    title,
    author,
  });

  return <Books booksData={books} pageNo={pageNumber} />;
}

export default function Books({
  booksData,
  pageNo,
}: {
  booksData: PaginatedResponse<BookSearchData>;
  pageNo: number;
}) {
  const searchParams = useSearchParams();
  const {
    data: booksPage,
    isLoading,
    isError,
    error,
  } = useBooksQuery(
    pageNo,
    {
      author: searchParams.get("author") || "",
      title: searchParams.get("title") || "",
      limit: 10,
      page: pageNo,
      order: "DESC",
    },
    booksData
  );

  return (
    <>
      <SearchForm baseUrl="/books/list" />
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <BookList books={booksPage?.data ?? []} />
          <Pagination
            currentPage={pageNo ?? 1}
            hasNextPage={booksPage?.meta.hasNextPage ?? false}
            hasPreviousPage={booksPage?.meta.hasPreviousPage ?? false}
            lastPage={booksPage?.meta.lastPage ?? 1}
            baseUrl="/books/list"
          />
        </>
      )}
    </>
  );
}

```

### 보안 관련 기능

## 미들웨어 (`middleware.ts`)

- **관리자 경로 보호**:
  - `ADMIN_PATHS` 배열을 사용하여 관리자 페이지 경로를 식별합니다.
  - 요청된 경로가 관리자 페이지에 해당할 경우, `Authentication` 쿠키를 확인하여 인증되지 않은 사용자를 로그인 페이지로 리다이렉션합니다.
- **CORS 설정**:
  - 개발 및 프로덕션 환경에 따라 `Access-Control-Allow-Origin` 헤더를 설정하여 보안을 강화합니다.

```
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/books/list";
    url.searchParams.set("page", "1");
    return NextResponse.redirect(url);
  }

  const isAdminPage = ADMIN_PATHS.some((path) => {
    const pattern = new RegExp(`^${path.replace(/\*/g, ".*")}$`);
    return pattern.test(pathname);
  });

  if (!isAdminPage) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("Authentication");
  if (!authCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  const url = new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : process.env.NEXT_PUBLIC_API_URL!
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", url.origin);

  return response;
}
```

## 인증 상태 관리 (`auth-store.ts`)

- **상태 관리**:
  - `zustand` 라이브러리를 사용하여 `isAuthenticated`와 `isLoading` 상태를 관리합니다.
- **인증 확인 및 로그아웃**:
  - `checkAuth` 메서드를 통해 서버로부터 인증 상태를 확인하고, 결과에 따라 상태를 업데이트합니다.
  - `signOut` 메서드를 통해 사용자가 로그아웃할 수 있으며, 로그아웃 후에는 로그인 페이지로 리다이렉션합니다.

```
interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const result = await authService.checkAuth();
      set({ isAuthenticated: result, isLoading: false });
    } catch {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  signOut: async () => {
    try {
      await authService.signOut();
      set({ isAuthenticated: false });
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
}));
```

## 인증 가드 (`auth-guard.tsx`)

- **접근 제어**:
  - `AuthGuard` 컴포넌트를 사용하여 인증이 필요한 경로에 대한 접근을 제어합니다.
  - 인증되지 않은 사용자는 로그인 페이지로 리다이렉션됩니다.
- **로딩 처리**:
  - 인증 상태를 확인하는 동안 로딩 컴포넌트를 표시하여 사용자 경험을 개선합니다.

```
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
  return children;
}
```
