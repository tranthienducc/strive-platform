import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const path = `${url.pathname}${url.search}`;

  // Kiểm tra xem có phải trang gốc hay không
  if (
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    hostname === "localhost:3000"
  ) {
    // Nếu là trang gốc, rewrite tới chính trang gốc
    if (path === "/") {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    return NextResponse.rewrite(new URL(path, req.url));
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|api|trpc).*)", "/", "/cms"],
};
