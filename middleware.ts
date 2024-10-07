import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const path = `${url.pathname}${url.search}`;

  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;

  // Xử lý cho domain chính
  if (hostname === baseDomain || hostname === "localhost:3000") {
    // Kiểm tra các route cần bảo vệ
    if (isProtectedRoute(req)) {
      auth().protect();
    }

    // Cho phép truy cập trực tiếp vào route của domain chính
    return NextResponse.next();
  }

  // Xử lý cho các subdomain
  const subdomain = hostname.replace(`.${baseDomain}`, "");

  // Rewrite tất cả các request từ subdomain về [domain] folder
  return NextResponse.rewrite(
    new URL(`/${subdomain}${path === "/" ? "" : path}`, req.url)
  );
});

export const config = {
  matcher: ["/((?!.\\..|_next).)", "/", "/(api|trpc)(.)"],
};
