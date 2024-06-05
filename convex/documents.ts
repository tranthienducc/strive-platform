import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  handler: async (ctx) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Not authenticated");
    }

    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    categories: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    fullName: v.optional(v.string()),
    description: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
  },

  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Not authenticated");
    }

    const userId = indentity.subject;
    const document = await ctx.db.insert("documents", {
      userId,
      title: args.title,
      categories: args.categories,
      coverImage: args.coverImage,
      parentDocument: args.parentDocument,
      fullName: args.fullName,
      description: args.description,
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
    fullName: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    });

    return document;
  },
});

export const deleted = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error("Not authenticated");
    }

    const userId = indentity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }
    if (existingDocument.userId !== userId) {
      throw new Error("UUnauthorized");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const updateHeart = mutation({
  args: {
    id: v.id("documents"),
    heart: v.optional(v.number()),
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
      heart: args.heart,
    });

    return document;
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
