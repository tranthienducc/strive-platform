import { api } from "@/convex/_generated/api";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getInspirations(slug: string) {
  const inspirations = await convex.query(api.documents.getById);

  if (!inspirations) return null;

  const filterInspiration = inspirations.find(
    (item: any) => item.slug === slug
  );

  return filterInspiration;
}
