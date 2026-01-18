import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get("token");
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (jwt) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (pathname !== "/" && !jwt) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/checkout-success",
    "/order-history",
    "/cart",
    "/",
  ],
};
