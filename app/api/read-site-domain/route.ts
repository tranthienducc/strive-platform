import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const site_subdomain = searchParams.get("site_subdomain");

    if (!site_subdomain) {
      return NextResponse.json(
        { error: "Missing site_subdomain parameter" },
        { status: 400 }
      );
    }

    const response = await convex.query(api.documents.readSiteDomain, {
      site_subdomain,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
