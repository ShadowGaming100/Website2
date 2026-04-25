import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Passes the current pathname as a request header so server components
 * (e.g. GlobalStructuredData) can read it without being client components.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
