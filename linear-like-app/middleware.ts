import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  // Публичные маршруты
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(pathname);
  
  // Защищенные маршруты
  const protectedPaths = ["/dashboard", "/profile"];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // Если нет токена и маршрут защищен - редирект на логин
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Если есть токен и маршрут публичный - редирект на дашборд
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};