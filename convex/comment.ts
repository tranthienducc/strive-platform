import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCommentInspiration = query({
  handler: async (ctx) => {
    const comment = await ctx.db.query("comment").collect();
    return comment;
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
    const createdComment = await ctx.db.insert("comment", {
      ...rest,
    });

    return createdComment;
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
    const reply = await ctx.db.insert("comment", {
      ...rest,
    });

    return reply;
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
