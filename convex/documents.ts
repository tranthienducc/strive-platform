import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    categories: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
    userId: v.optional(v.string()),
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

    const document = await ctx.db.insert("documents", {
      userId: args.userId,
      title: args.title,
      categories: args.categories,
      coverImage: args.coverImage,
      parentDocument: args.parentDocument,
      slug: args.slug,
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
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(args.id, {
      _id: args.id,
      ...rest,
    });

    return document;
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
