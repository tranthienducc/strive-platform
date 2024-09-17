import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected and enforce authentication if it is
  if (isProtectedRoute(req)) auth().protect();
  const url = req.nextUrl;
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`);

  // Nếu hostname có "www." hoặc các subdomain không cần thiết
  hostname = hostname.replace(/^www\./, "");

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  // Xử lý rewrite cho domain chính
  if (hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    const session = getAuth(req);
    if (!session && path !== "/sign-in") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    } else if (session && path === "/sign-in") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(new URL(path, req.url));
  }

  // Rewrite cho localhost
  if (hostname === "localhost:3000") {
    return NextResponse.rewrite(new URL(path, req.url));
  }

  // Rewrite mọi thứ còn lại về dynamic route `/[domain]/[slug]`
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/dashboard", "/(api|trpc)(.*)"],
};
