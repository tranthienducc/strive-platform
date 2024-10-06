import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const path = `${url.pathname}${url.search}`;

  // Nếu là route chính, không cần bảo vệ

  // Xử lý cho domain chính
  if (
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    hostname === "localhost:3000"
  ) {
    // Kiểm tra các route cần bảo vệ
    if (isProtectedRoute(req)) {
      auth().protect();
    }
    return NextResponse.rewrite(new URL("/", req.url));
  }

  // Xử lý cho các subdomain
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  matcher: ["/((?!.\\..|_next).)", "/", "/(api|trpc)(.)"],
};
