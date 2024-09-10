"use server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convex } from "@/services/providers/convex-provider";

export default async function getSiteByID(site_id: Id<"sites">) {
  try {
    const res = await convex.query(api.documents.getSitesById, {
      id: site_id,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
