import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    if (isProtectedRoute(req)) {
      auth().protect();
    }

    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    const path = `${url.pathname}${url.search}`;

    // Xử lý domain chính
    const mainDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
    const isMainDomain =
      hostname === mainDomain || hostname === "localhost:3000";

    // Phân tích subdomain
    const currentDomain = hostname.replace(`.${mainDomain}`, "");
    const isSubDomain = hostname.includes(`.${mainDomain}`);

    // Xử lý cho domain chính
    if (isMainDomain) {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return NextResponse.rewrite(new URL(normalizedPath, req.url));
    }

    // Xử lý cho subdomain
    if (isSubDomain) {
      // Nếu là route gốc của subdomain
      if (path === "/" || path === "") {
        return NextResponse.rewrite(
          new URL(`/_sites/${currentDomain}/home`, req.url)
        );
      }

      // Cho các route khác của subdomain
      return NextResponse.rewrite(
        new URL(`/_sites/${currentDomain}${path}`, req.url)
      );
    }

    // Fallback cho các trường hợp khác
    return NextResponse.rewrite(new URL(path, req.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public/|assets/).*)",
  ],
};
