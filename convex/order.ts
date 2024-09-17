import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

    const buy = await ctx.db.insert("orders", {
      ...rest,
    });

    return buy;
  },
});

export const getOrdersInspiration = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("orders").collect();
    return data;
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
