import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/session-token";

// IMPORTANT: only import from "@/lib/session-token" here, never from
// "@/lib/auth" or "@/lib/db" — middleware runs on the Edge Runtime,
// which does not support the `pg` package's Node.js APIs.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = verifySessionToken(token);
    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
