import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
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

export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    categories: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    slug: v.optional(v.string()),
    url: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
    userId: v.optional(v.string()),
    price: v.optional(v.float64()),
    description: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingSlug = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existingSlug) {
      return {
        type: "error",
        message: "Slug Inspiration invalid!",
      };
    }

    const { ...rest } = args;
    const document = await ctx.db.insert("documents", {
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
    userId: v.string(),
    parentDocument: v.optional(v.id("orders")),
  },
  handler: async (ctx, args) => {
    const { userId, ...rest } = args;

    const document = await ctx.db.insert("orders", {
      userId,
      ...rest,
    });

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
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
  args: { id: v.id("documents"), userId: v.optional(v.string()) },
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
    id: v.id("documents"),
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
    id: v.id("documents"),
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

    const notifications = await ctx.db.query("documents").collect();
    return notifications;
  },
});

export const watchInspiration = mutation({
  args: {
    id: v.id("documents"),
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
