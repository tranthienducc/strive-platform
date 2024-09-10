import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  inspirations: defineTable({
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
    parentDocument: v.optional(v.id("inspirations")),
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
    users: v.object({
      id: v.string(),
      name: v.string(),
    }),
    parentDocument: v.optional(v.id("orders")),
  })
    .index("by_user", ["users.id"])
    .index("by_user_parent", ["users.id", "parentDocument"]),

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
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    userName: v.string(),
    avatar: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
  }),
  comment: defineTable({
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
  })
    .index("by_user", ["users.id"])
    .index("by_user_parent", ["users.id", "parentDocument"]),
  sites: defineTable({
    site_name: v.string(),
    site_description: v.string(),
    site_subdomain: v.string(),
    site_custom_domain: v.string(),
    site_coverImage: v.string(),
    userId: v.optional(v.string()),
    parentDocument: v.optional(v.id("sites")),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
  documents: defineTable({
    name: v.string(),
    sites: v.object({
      id: v.string(),
    }),
    parentDocument: v.optional(v.id("documents")),
  })
    .index("by_user", ["sites.id"])
    .index("by_user_parent", ["sites.id", "parentDocument"]),
  article: defineTable({
    userId: v.string(),
    blog_html: v.string(),
    image: v.string(),
    title: v.string(),
    slug: v.string(),
    keywords: v.array(v.string()),
    site_id: v.string(),
    shareable: v.boolean(),
    published: v.boolean(),
    parentDocument: v.optional(v.id("article")),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});
