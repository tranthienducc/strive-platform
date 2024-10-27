import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { addDomainToVercel } from "@/lib/actions/vercel/add-domain";
import { revalidatePath } from "next/cache";

export const deleteSite = mutation({
  args: {
    id: v.id("sites"),
  },
  handler: async (ctx, args) => {
    const deleteDocument = await ctx.db.delete(args.id);

    return deleteDocument;
  },
});
export const changeSiteName = mutation({
  args: {
    id: v.id("sites"),
    site_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const changedSiteName = await ctx.db.patch(args.id, {
      site_name: args.site_name,
    });

    return changedSiteName;
  },
});
export const changeSiteDescription = mutation({
  args: {
    id: v.id("sites"),
    site_description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const changedSiteDescription = await ctx.db.patch(args.id, {
      site_description: args.site_description,
    });

    return changedSiteDescription;
  },
});
export const changeSiteSubdomain = mutation({
  args: {
    id: v.id("sites"),
    site_subdomain: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const changedSiteSubdomain = await ctx.db.patch(args.id, {
      site_subdomain: args.site_subdomain,
    });

    return changedSiteSubdomain;
  },
});

export const changeSiteDomain = mutation({
  args: {
    id: v.id("sites"),
    site_custom_domain: v.string(),
  },
  handler: async (ctx, args) => {
    const { site_custom_domain } = args;

    // Validate domain
    const subdomainRegex = /^[a-zA-Z0-9-]+$/;
    if (!subdomainRegex.test(site_custom_domain)) {
      throw new Error(
        "Subdomain must only contain alphanumeric characters or hyphens"
      );
    }

    if (site_custom_domain.length < 1 || site_custom_domain.length > 63) {
      throw new Error("Subdomain must be between 1 and 63 characters");
    }

    // Update site in the database
    const updatedSite = await ctx.db.patch(args.id, {
      site_custom_domain: args.site_custom_domain,
    });

    const domainAdding = await addDomainToVercel(
      site_custom_domain.toLowerCase()
    );
    revalidatePath("/cms/sites");

    // Fetch verification records from Vercel for the non-www domain
    const vercelDomainResponse = await fetch(
      `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${site_custom_domain.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROJECT_ID_VERCEL}`,
        },
      }
    );
    const domainData = await vercelDomainResponse.json();

    return {
      updatedSite,
      domainAdding,
      verificationRecords: domainData.verification,
    };
  },
});

const subdomainRegex = /^[a-zA-Z0-9-]+$/;

export const createSites = mutation({
  args: {
    site_name: v.string(),
    site_description: v.string(),
    site_subdomain: v.string(),
    site_coverImage: v.string(),
    site_custom_domain: v.optional(v.string()),
    userId: v.optional(v.string()),
    parentDocument: v.optional(v.id("sites")),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;

    if (!subdomainRegex.test(args.site_subdomain)) {
      return {
        message:
          "Subdomain must only contain alphanumeric characters or hyphens, and must not contain '.', '#', or '$'",
      };
    }

    if (args.site_subdomain.length < 1 || args.site_subdomain.length > 63) {
      return {
        message: "Subdomain must be between 1 and 63 characters",
      };
    }
    const createSite = await ctx.db.insert("sites", {
      ...rest,
    });

    return createSite;
  },
});

export const readSiteDomain = query({
  args: {
    site_subdomain: v.string(),
  },
  handler: async (ctx, args) => {
    const subdomain = args.site_subdomain.toLowerCase();

    const site = await ctx.db
      .query("sites")
      .filter((q) => q.eq(q.field("site_subdomain"), subdomain))
      .first();

    if (!site) {
      console.log("No site found for subdomain:", subdomain);
      return null;
    }

    return site;
  },
});

export const getAllSites = query({
  handler: async (ctx) => {
    const sites = await ctx.db.query("sites").collect();
    return sites;
  },
});
export const getSitesBySub = query({
  args: {
    site_subdomain: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const sites = await ctx.db
      .query("sites")
      .filter((q) => q.eq(q.field("site_subdomain"), args.site_subdomain))
      .collect();

    // Trả về site đầu tiên nếu có, hoặc null nếu không tìm thấy
    return sites.length > 0 ? sites[0] : null;
  },
});
export const getSitesById = query({
  args: {
    id: v.id("sites"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const site = await ctx.db.get(id);

    return site;
  },
});
export const getSitesByIdAndName = query({
  args: {
    userId: v.optional(v.string()),
    site_name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const sites = await ctx.db
        .query("sites")
        .filter((q) =>
          q.and(
            q.eq(q.field("userId"), args.userId),
            q.eq(q.field("site_name"), args.site_name)
          )
        )
        .collect();

      return sites;
    } catch (error) {
      return error;
    }
  },
});
