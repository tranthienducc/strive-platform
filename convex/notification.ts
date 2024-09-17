import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const getAllNotification = query({
  handler: async (ctx) => {
    const notifications = await ctx.db.query("notifications").collect();
    return notifications;
  },
});
