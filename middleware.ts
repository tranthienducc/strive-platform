import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected and enforce authentication if it is
  const url = req.nextUrl;
  if (isProtectedRoute(req)) auth().protect();
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`);

  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Get hostname (e.g., 'strive.vercel.app', 'test.strive.vercel.app')
  if (hostname == `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`) {
    const session = getAuth(req);
    if (!session && path !== "/sign-in") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    } else if (session && path == "/sign-in") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`${path === "/" ? "" : path}`, req.url)
    );
  }

  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_BASE_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/dashboard", "/(api|trpc)(.*)"],
};
