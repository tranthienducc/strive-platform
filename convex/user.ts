import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
