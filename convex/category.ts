import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCategory = mutation({
  args: {
    userId: v.optional(v.string()),
    category: v.string(),
    site_id: v.string(),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;

    const createdCategory = ctx.db.insert("category", {
      ...rest,
    });

    return createdCategory;
  },
});

export const getAllCategory = query({
  handler: async (ctx) => {
    const allCategory = await ctx.db.query("category").collect();
    return allCategory;
  },
});

export const deleteCategory = mutation({
  args: {
    id: v.id("category"),
  },
  handler: async (ctx, args) => {
    const deleledCategory = ctx.db.delete(args.id);
    return deleledCategory;
  },
});

export const updateArticle = mutation({
  args: {
    id: v.id("category"),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const updatedCategory = ctx.db.patch(args.id, {
      category: args.category,
    });
    return updatedCategory;
  },
});
