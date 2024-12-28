import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin/:path*"];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/books/list";
    url.searchParams.set("page", "1");
    return NextResponse.redirect(url);
  }

  if (pathname === "/books/list" || pathname === "/admin/books/list") {
    if (!searchParams.has("page")) {
      const url = request.nextUrl.clone();
      url.searchParams.set("page", "1");
      return NextResponse.redirect(url);
    }
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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
