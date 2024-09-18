"use client";

import Image from "next/image";
import React, { memo } from "react";
import parse from "html-react-parser";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { transformNode } from "@/utils/transform-node";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next";
import { convex } from "@/services/providers/convex-provider";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const articles = await convex.query(api.article.getArticleBySlug, {
    slug: slug,
  });

  return {
    title: articles?.[0].title || "Article Title",
    description: articles?.[0].blog_html || "Article Description",
    keywords: articles?.[0].keywords,
    openGraph: {
      title: articles?.[0].title,
      description: articles?.[0].blog_html,
      images: [articles?.[0].image || "/bg-dashboard.webp"],
    },
  };
}

const BlogPostPage = ({ params }: Props) => {
  const articles = useQuery(api.article.getArticleBySlug, {
    slug: params.slug,
  });

  const allArticle = useQuery(api.article.getAllArticle);
  return (
    <article className="container relative max-w-full w-full py-6 lg:py-10">
      {articles?.map((article) => (
        <div className="mb-10 px-[253px]" key={article._id}>
          <div className="text-center items-center">
            <p className="block text-sm text-gray9">
              Publish on {new Date(article._creationTime).toLocaleDateString()}
            </p>
            <h1 className="scroll-m-20 lg:text-6xl font-bold pt-4 tracking-tight text-3xl">
              {article.title}
            </h1>
            <p className="text-lg font-normal text-gray9 pt-10">
              {article.sub_title}
            </p>
            <div className="mt-8 flex items-center justify-center space-x-3 mb-8">
              <Image
                src="/assets/images/clients-avatar-1.webp"
                alt="author-avatar"
                width={42}
                height={42}
                className="rounded-full size-12"
              />
              <div className="text-lg font-normal">
                by <span className="font-semibold">James</span>
              </div>
            </div>

            <Image
              src={article.image}
              alt="blog-img"
              width={1013}
              height={600}
              priority={true}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <div className="mt-20 max-w-full w-full text-gray9">
            {parse(article.blog_html, {
              replace: transformNode,
            })}
          </div>
        </div>
      ))}
      <div className="w-full items-center justify-center gap-2 mb-6 flex flex-row">
        <Separator className="bg-white/15 max-w-[450px]" />
        <span className="text-sm font-normal text-gray9 whitespace-normal">
          Continue Reading
        </span>
        <Separator className="bg-white/15 max-w-[450px]" />
      </div>

      <div className="grid grid-cols-3 gap-2 px-[253px]">
        {allArticle?.map((data) => (
          <Link
            href={`${data.slug}`}
            key={data._id}
            className="max-w-[413px]  w-full min-h-[144px] h-full rounded-2xl border border-white/20"
          >
            <Image
              src={data.image}
              alt="blog-img"
              width={413}
              height={256}
              className="rounded-t-2xl border-b-white/20"
              priority={true}
            />
            <div className="px-5 pt-[33px] pb-[23px] flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {data.title}
              </h3>
              <p className="line-clamp-1 italic text-sm text-gray9">
                {data.sub_title}
              </p>
              <span className="text-sm font-normal text-gray9">
                Published {new Date(data._creationTime).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default memo(BlogPostPage);
