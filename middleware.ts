import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    // Kiểm tra route được bảo vệ trước
    if (isProtectedRoute(req)) {
      auth().protect();
    }

    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    const path = `${url.pathname}${url.search}`;

    // Kiểm tra path rỗng và chuyển hướng về trang chủ
    if (path === "" || path === "/") {
      return NextResponse.rewrite(new URL("/", req.url));
    }

    // Xử lý cho domain chính
    if (
      hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
      hostname === "localhost:3000"
    ) {
      // Đảm bảo path bắt đầu bằng '/'
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return NextResponse.rewrite(new URL(normalizedPath, req.url));
    }

    // Xử lý cho các subdomain
    const subdomain = `/${hostname}${path}`;
    return NextResponse.rewrite(new URL(subdomain, req.url));
  } catch (error) {
    console.error("Middleware error:", error);
    // Trong trường hợp lỗi, chuyển hướng về trang chủ
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/cms", "/(api|trpc)(.*)"],
};
