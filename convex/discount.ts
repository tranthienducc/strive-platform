import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDiscounts = query({
  handler: async (ctx) => {
    const discounts = await ctx.db.query("discounts").collect();
    return discounts;
  },
});

export const createDiscountCode = mutation({
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
export const deleteDiscountCode = mutation({
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
