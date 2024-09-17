import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const path = `${url.pathname}${url.search}`;

  // Xử lý cho domain chính
  if (
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    hostname === "localhost:3000"
  ) {
    // Chỉ kiểm tra session cho các route cần bảo vệ
    if (isProtectedRoute(req)) {
      const session = getAuth(req);
      if (!session) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
    return NextResponse.rewrite(new URL(path, req.url));
  }

  // Xử lý cho các subdomain
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
