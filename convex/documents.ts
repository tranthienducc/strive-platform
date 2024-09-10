import { addDomainToVercel } from "../lib/actions/vercel/add-domain";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("inspirations").collect();
    return documents;
  },
});
export const getDiscounts = query({
  handler: async (ctx) => {
    const discounts = await ctx.db.query("discounts").collect();
    return discounts;
  },
});

export const getOrdersInspiration = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("orders").collect();
    return data;
  },
});
export const getCommentInspiration = query({
  handler: async (ctx) => {
    const comment = await ctx.db.query("comment").collect();
    return comment;
  },
});
export const getAllSites = query({
  handler: async (ctx) => {
    const sites = await ctx.db.query("sites").collect();
    return sites;
  },
});
export const getSitesById = query({
  args: { id: v.id("sites") },
  handler: async (ctx, args) => {
    const site = await ctx.db.get(args.id);
    return site;
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

export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    categories: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    slug: v.optional(v.string()),
    url: v.optional(v.string()),
    parentDocument: v.optional(v.id("inspirations")),
    userId: v.optional(v.string()),
    price: v.optional(v.float64()),
    description: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingSlug = await ctx.db
      .query("inspirations")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existingSlug) {
      return {
        type: "error",
        message: "Slug Inspiration invalid!",
      };
    }

    const { ...rest } = args;
    const document = await ctx.db.insert("inspirations", {
      userId: args.userId,
      ...rest,
    });

    return document;
  },
});

export const createDiscoutnCode = mutation({
  args: {
    name_code: v.optional(v.string()),
    code: v.optional(v.string()),
    amount: v.optional(v.float64()),
    inspirations: v.optional(v.string()),
    limit: v.optional(v.float64()),
    start_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    parentDocument: v.optional(v.id("discounts")),
  },
  handler: async (ctx, args) => {
    const { end_date, ...rest } = args;

    const now = new Date();
    const expireDate = end_date ? new Date(end_date) : null;

    if (expireDate && now > expireDate) {
      throw new Error("This discount code has expired.");
    }
    const createdDiscounCode = await ctx.db.insert("discounts", {
      ...rest,
      end_date,
    });

    return createdDiscounCode;
  },
});
export const deleteDiscoutnCode = mutation({
  args: {
    id: v.id("discounts"),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const deleteDiscount = await ctx.db.delete(args.id);

    return deleteDiscount;
  },
});

export const applyDiscountCode = mutation({
  args: {
    code: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { code } = args;
    const coupon = await ctx.db
      .query("discounts")
      .filter((q) => q.eq(q.field("code"), code))
      .first();

    if (!coupon) {
      throw new Error("Invalid discounts code");
    }
    const used = coupon.used ?? 0;
    const limit = coupon.limit ?? 0;

    if (used >= limit) {
      throw new Error("Discount code has reached its usage limit");
    }

    return {
      discountPersent: coupon.amount,
      discoutnInspiration: coupon.inspirations,
      discountLimit: coupon.limit || 0,
      discountUsed: coupon.used || 0,
    };
  },
});

export const buyInspiration = mutation({
  args: {
    order_code: v.string(),
    status: v.string(),
    product_name: v.string(),
    revenue: v.float64(),
    code: v.string(),
    amount: v.float64(),
    users: v.object({
      id: v.string(),
      name: v.string(),
    }),
    parentDocument: v.optional(v.id("orders")),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;

    const document = await ctx.db.insert("orders", {
      ...rest,
    });

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("inspirations"),
    title: v.optional(v.string()),
    categories: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    salePrice: v.optional(v.float64()),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const updateDocument = await ctx.db.patch(args.id, {
      ...rest,
    });

    return updateDocument;
  },
});

export const deleted = mutation({
  args: { id: v.id("inspirations"), userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }
    if (existingDocument.userId !== args.userId) {
      throw new Error("UUnauthorized");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const likeInspiration = mutation({
  args: {
    id: v.id("inspirations"),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const likedBy = existingDocument.likedBy || [];

    if (!likedBy.includes(args.userId as string)) {
      likedBy.push(args.userId as string);
    }
    const document = await ctx.db.patch(args.id, {
      likedBy,
    });

    return document;
  },
});

export const unikeInspiration = mutation({
  args: {
    id: v.id("inspirations"),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    let likedBy = existingDocument.likedBy || [];
    likedBy = likedBy.filter((user) => user !== args.userId);
    const document = await ctx.db.patch(args.id, {
      likedBy,
    });

    return document;
  },
});

export const getLikeInspirationById = query({
  handler: async (ctx) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Not authenticated");
    }

    const notifications = await ctx.db.query("inspirations").collect();
    return notifications;
  },
});

export const watchInspiration = mutation({
  args: {
    id: v.id("inspirations"),
    watch: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      watch: args.watch,
    });

    return document;
  },
});

export const createNotifi = mutation({
  args: {
    templateName: v.optional(v.string()),
    userName: v.optional(v.string()),
    content: v.optional(v.string()),
    avatar: v.optional(v.string()),
    parentDocument: v.optional(v.id("notifications")),
  },

  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Not authenticated");
    }

    const userId = indentity.subject;
    const noti = await ctx.db.insert("notifications", {
      userId,
      templateName: args.templateName,
      userName: args.userName,
      content: args.content,
      avatar: args.avatar,
      parentDocument: args.parentDocument,
    });

    return noti;
  },
});

export const getNotifiById = query({
  handler: async (ctx) => {
    const notifications = await ctx.db.query("notifications").collect();
    return notifications;
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    userName: v.string(),
    avatar: v.string(),
    name: v.string(),
    email: v.string(),
    bio: v.string(),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;
    const createUsers = await ctx.db.insert("users", {
      ...rest,
    });

    return createUsers;
  },
});
export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    userName: v.string(),
    avatar: v.string(),
    name: v.string(),
    email: v.string(),
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;
    const updateUsers = await ctx.db.patch(args.id, {
      ...rest,
    });

    return updateUsers;
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users"), clerkId: v.string() },
  handler: async (ctx, args) => {
    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const createComment = mutation({
  args: {
    content: v.string(),
    inspirations: v.optional(
      v.object({
        id: v.string(),
        title: v.string(),
      })
    ),
    users: v.object({
      id: v.string(),
      name: v.optional(v.string()),
      avatar: v.optional(v.string()),
    }),
    parentDocument: v.optional(v.id("comment")),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;
    const createUsers = await ctx.db.insert("comment", {
      ...rest,
    });

    return createUsers;
  },
});
export const replyComment = mutation({
  args: {
    content: v.string(),
    users: v.object({
      id: v.string(),
      name: v.optional(v.string()),
      avatar: v.optional(v.string()),
    }),
    parentDocument: v.optional(v.id("comment")),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;
    const createUsers = await ctx.db.insert("comment", {
      ...rest,
    });

    return createUsers;
  },
});

export const deleteComment = mutation({
  args: {
    id: v.id("comment"),
    users: v.object({
      id: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const deleteOrders = mutation({
  args: {
    id: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const deleteOrder = await ctx.db.delete(args.id);

    return deleteOrder;
  },
});

const subdomainRegex = /^[a-zA-Z0-9-]+$/;
export const createSites = mutation({
  args: {
    site_name: v.string(),
    site_description: v.string(),
    site_subdomain: v.string(),
    site_coverImage: v.string(),
    site_custom_domain: v.string(),
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

    // Fetch verification records from Vercel for the non-www domain
    const vercelDomainResponse = await fetch(
      `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${site_custom_domain.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
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

export const createDocuments = mutation({
  args: {
    name: v.string(),
    sites: v.object({
      id: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;

    const documents = await ctx.db.insert("documents", {
      ...rest,
    });

    return documents;
  },
});

export const deleteDocuments = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const deleteDocument = await ctx.db.delete(args.id);

    return deleteDocument;
  },
});
export const deleteSite = mutation({
  args: {
    id: v.id("sites"),
  },
  handler: async (ctx, args) => {
    const deleteDocument = await ctx.db.delete(args.id);

    return deleteDocument;
  },
});
