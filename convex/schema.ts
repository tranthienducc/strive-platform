import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.optional(v.string()),
    categories: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    slug: v.optional(v.string()),
    price: v.optional(v.float64()),
    salePrice: v.optional(v.float64()),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    code: v.optional(v.string()),
    likedBy: v.optional(v.array(v.string())),
    watch: v.optional(v.float64()),
    userId: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),

  notifications: defineTable({
    templateName: v.optional(v.string()),
    userName: v.optional(v.string()),
    content: v.optional(v.string()),
    avatar: v.optional(v.string()),
    userId: v.optional(v.string()),
    parentDocument: v.optional(v.id("notifications")),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),

  orders: defineTable({
    order_code: v.string(),
    status: v.string(),
    product_name: v.string(),
    revenue: v.float64(),
    code: v.string(),
    amount: v.float64(),
    userId: v.string(),
    parentDocument: v.optional(v.id("orders")),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),

  discounts: defineTable({
    name_code: v.optional(v.string()),
    code: v.optional(v.string()),
    amount: v.optional(v.float64()),
    limit: v.optional(v.float64()),
    used: v.optional(v.float64()),
    inspirations: v.optional(v.string()),
    start_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    parentDocument: v.optional(v.id("discounts")),
  }).index("by_user_parent", ["parentDocument"]),
});
