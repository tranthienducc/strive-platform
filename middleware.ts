import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;

  // Handle root path specifically for production
  if (url.pathname === "/") {
    if (
      hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
      hostname === "localhost:3000"
    ) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL(`/${hostname}/`, req.url));
  }

  // Handle other paths
  if (
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN ||
    hostname === "localhost:3000"
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(`/${hostname}${url.pathname}${url.search}`, req.url)
  );
});

// Điều chỉnh matcher để xử lý root path rõ ràng hơn
export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
