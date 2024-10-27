import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const isRootPath = url.pathname === "/";

  // Xử lý cho domain chính
  if (
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    hostname === "localhost:3000"
  ) {
    if (isRootPath) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`${url.pathname}${url.search}`, req.url)
    );
  }

  // Xử lý cho các subdomain
  const path = isRootPath ? "/" : `${url.pathname}${url.search}`;
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

// Cấu hình matcher để khớp với mọi route, bao gồm cả "/"
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/"],
};
