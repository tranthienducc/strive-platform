import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createArticle = mutation({
  args: {
    userId: v.optional(v.string()),
    document_title: v.string(),
    image: v.string(),
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    sub_title: v.string(),
    blog_html: v.string(),
    keywords: v.array(v.string()),
    site_subdomain: v.optional(v.string()),
    site_id: v.string(),
    shareable: v.optional(v.boolean()),
    published: v.optional(v.boolean()),
    parentDocument: v.optional(v.id("article")),
  },
  handler: async (ctx, args) => {
    const { ...rest } = args;

    const article = await ctx.db.insert("article", {
      ...rest,
    });

    return article;
  },
});

export const getArticleBySiteId = query({
  args: {
    site_id: v.string(),
  },

  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("article")
      .filter((q) => q.eq(q.field("site_id"), args.site_id))
      .collect();

    return articles;
  },
});
export const getArticleBySub = query({
  args: {
    site_subdomain: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("article")
      .filter((q) => q.eq(q.field("site_subdomain"), args.site_subdomain))
      .collect();

    return articles;
  },
});

export const getArticleBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("article")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .collect();

    return articles;
  },
});

export const deleteArticle = mutation({
  args: {
    id: v.id("article"),
  },
  handler: async (ctx, args) => {
    const deleteArticles = await ctx.db.delete(args.id);

    return deleteArticles;
  },
});

export const statusArticle = mutation({
  args: {
    id: v.id("article"),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const updatedStatusArticle = ctx.db.patch(args.id, {
      published: args.published,
    });
    return updatedStatusArticle;
  },
});
export const updateArticle = mutation({
  args: {
    id: v.id("article"),
    image: v.string(),
    blog_html: v.string(),
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    sub_title: v.string(),
    keywords: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const updatedArticle = ctx.db.patch(id, {
      ...rest,
    });
    return updatedArticle;
  },
});

export const getAllArticle = query({
  handler: async (ctx) => {
    const allArticle = await ctx.db.query("article").collect();
    return allArticle;
  },
});
