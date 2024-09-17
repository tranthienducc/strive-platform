import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllInspiration = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("inspirations").collect();
    return documents;
  },
});

export const createInspiration = mutation({
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

export const getAllLikeInspiration = query({
  handler: async (ctx) => {
    const liked = await ctx.db.query("inspirations").collect();
    return liked;
  },
});

export const watchInspiration = mutation({
  args: {
    id: v.id("inspirations"),
    watch: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const document = await ctx.db.patch(args.id, {
      watch: args.watch,
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

export const deletedInspiration = mutation({
  args: { id: v.id("inspirations"), userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const updatedInspiration = mutation({
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
