import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllDocuments = query({
  handler: async (ctx) => {
    const allDocuments = await ctx.db.query("documents").collect();
    return allDocuments;
  },
});
export const getDocumentById = query({
  args: {
    id: v.id("documents"),
  },

  handler: async (ctx, args) => {
    const documents = await ctx.db.get(args.id);

    return documents;
  },
});
export const getDocumentBySite = query({
  args: {
    sites: v.optional(
      v.object({
        id: v.string(),
      })
    ),
  },

  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("sites.id"), args.sites?.id))
      .first();

    return documents;
  },
});

export const createDocuments = mutation({
  args: {
    name: v.optional(v.string()),
    userId: v.optional(v.string()),
    sites: v.optional(
      v.object({
        id: v.string(),
      })
    ),
    description: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;

    const documents = await ctx.db.insert("documents", {
      ...rest,
    });

    return documents;
  },
});
export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db.patch(args.id, {
      name: args.name,
      description: args.description,
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
