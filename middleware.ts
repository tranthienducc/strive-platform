import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");
  const path = `${url.pathname}${url.search}`;

  // Bảo vệ route /cms
  if (path.startsWith("/cms")) {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Xử lý domain chính
  if (
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    hostname === "localhost:3000"
  ) {
    return NextResponse.rewrite(new URL(path || "/", req.url));
  }

  // Xử lý subdomain
  try {
    const subdomain = hostname?.split(".")[0];
    return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
