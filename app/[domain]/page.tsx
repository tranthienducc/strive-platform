"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";

import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SitePage({ params }: { params: { domain: string } }) {
  const subdomain = params.domain.split(".")[0];

  const result = useQuery(api.sites.getSitesBySub, {
    site_subdomain: subdomain,
  });
  const articles = useQuery(api.article.getArticleBySub, {
    site_subdomain: subdomain,
  });

  if (result === undefined || articles === undefined) {
    return <LoadingSkeleton />;
  }

  // Sort articles by creation time (newest first) if they exist
  const sortArticle = articles?.sort(
    (a, b) => b._creationTime - a._creationTime
  );

  const publishedArticles = sortArticle?.filter((article) => article.published);
  const latestArticle = publishedArticles?.[0];
  const otherArticles = publishedArticles?.slice(1);

  // check if site null
  if (result === null) {
    notFound();
  }

  return (
    <div className="flex flex-col mt-4  justify-center items-center w-[90%] mb-24">
      <div className="flex flex-col items-center p-3 w-full">
        <div className="flex flex-col justify-start items-center gap-2 w-full">
          <div className="flex gap-3 justify-start items-center w-full">
            <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center text-white">
              {result?.site_name}
            </h1>
          </div>
          <div className="flex gap-3 justify-start items-center w-full border-b border-b-white/15 pb-4">
            <p className="text-gray9">{result?.site_description}</p>
          </div>
        </div>
      </div>

      {latestArticle ? (
        <Link
          href={`${latestArticle.slug}`}
          className="w-full mt-5 flex flex-col gap-10"
        >
          <Image
            src={latestArticle.image}
            alt="blog-img"
            width={1300}
            height={1300}
            className="rounded-2xl border-b-white/20 max-w-[1267px] w-full h-[556px] object-cover"
            priority={true}
          />
          <h2 className="text-6xl font-bold">{latestArticle.title}</h2>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-normal">{latestArticle.sub_title}</p>
            <div className="flex flex-row items-center gap-4">
              <Image
                src="/assets/images/clients-avatar-1.webp"
                alt="author-img"
                className="rounded-full object-cover"
                width={32}
                height={32}
              />
              <p className="text-base font-semibold">James</p>
              <div className="h-6 border-stone-400 border-l"></div>
              <p className="text-base font-normal text-gray9">
                {new Date(latestArticle._creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      ) : null}

      <div className="flex flex-col items-start justify-start w-full mt-28">
        <h2 className="text-5xl font-bold mb-10 items-start justify-start flex">
          More blogs
        </h2>
        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 mt-5">
          {otherArticles?.length > 0 ? (
            otherArticles.map((article) => (
              <Link
                href={`${article.slug}`}
                key={article._id}
                className="max-w-[413px] w-full min-h-[144px] h-full rounded-2xl border border-white/20"
              >
                <Image
                  src={article.image}
                  alt="blog-img"
                  width={413}
                  height={256}
                  className="rounded-t-2xl border-b-white/20"
                  priority={true}
                />
                <div className="px-5 pt-[33px] pb-[23px] flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {article.title}
                  </h3>
                  <p className="line-clamp-1 italic text-sm text-gray9">
                    {article.sub_title}
                  </p>
                  <span className="text-sm font-normal text-gray9">
                    Published{" "}
                    {new Date(article._creationTime).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray9 font-normal">
              No article data available here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col mt-4 justify-center items-center w-[90%]">
      <Skeleton className="w-full h-12 mb-4" />
      <Skeleton className="w-full h-6 mb-8" />
      <Skeleton className="w-full h-[556px] mb-10" />
      <Skeleton className="w-3/4 h-12 mb-4" />
      <Skeleton className="w-1/2 h-6 mb-8" />
    </div>
  );
}
