"use client";
import { Id } from "@/convex/_generated/dataModel";
import React, { memo } from "react";
import SiteDashWrapper from "../../_component/SidebarWrapper";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ManageArticle from "../_component/ManageArticle";
import Image from "next/image";
import parse from "html-react-parser";

import { transformNode } from "@/utils/transform-node";

const BlogsPage = ({
  params,
}: {
  params: { site_id: Id<"sites">; slug: string };
}) => {
  const articles = useQuery(api.article.getArticleBySlug, {
    slug: params.slug,
  });

  return (
    <SiteDashWrapper site_id={params.site_id}>
      <main className="flex min-w-screen flex-col items-center justify-between w-full">
        {articles?.map((article) => (
          <React.Fragment key={article._id}>
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start py-6 lg:py-10 w-full">
                <Link
                  href={`/cms/sites/${params?.site_id}`}
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  See all posts
                </Link>
              </div>
              <ManageArticle params={params} article={article} />
            </div>
            <article className="px-10 relative max-w-3xl pt-3 pb-6 lg:pb-10">
              <div className="text-center items-center">
                <p className="block text-sm text-gray9">
                  Publish on{" "}
                  {new Date(article._creationTime).toLocaleDateString()}
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
            </article>
          </React.Fragment>
        ))}
      </main>
    </SiteDashWrapper>
  );
};

export default memo(BlogsPage);
