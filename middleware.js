import { NextResponse } from "next/server";

const COOKIE_NAME = "dash_auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Lascia passare la pagina di login, l'API di login e i file statici
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);

  if (authCookie && authCookie.value === "granted") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
