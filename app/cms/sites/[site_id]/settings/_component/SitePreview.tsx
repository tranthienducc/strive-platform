"use client";

import NavbarSite from "@/app/[domain]/_component/NavbarSite";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SitePreview = ({ site_id }: { site_id: Id<"sites"> }) => {
  const articles = useQuery(api.article.getArticleBySiteId, {
    site_id: site_id,
  });
  const sites = useQuery(api.sites.getSitesById, {
    id: site_id,
  });
  return (
    <div className="rounded border mt-[1rem] border-white/15">
      <NavbarSite
        description={sites?.site_description}
        title={sites?.site_name}
      />

      <div className="flex flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center p-3 w-full">
          <div className="flex flex-col justify-start items-center gap-2 w-full">
            <div className="flex gap-3 justify-start items-center w-full">
              <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
                {sites?.site_name}
              </h1>
            </div>
            <div className="flex gap-3 justify-start items-center w-full border-b border-white/15 pb-4">
              <p className="text-gray-500">{sites?.site_description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full">
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
            {articles?.map((article) => (
              <Link key={article?._id} href={`/${article?.slug}`}>
                <article className="flex flex-col space-y-2 p-4 rounded-md border border-white/15 w-[350px]">
                  {article?.image && (
                    <Image
                      src={article?.image}
                      alt={""}
                      width={804}
                      height={452}
                      className="rounded-md"
                    />
                  )}
                  <h2 className="text-xl font-bold">{article?.title}</h2>
                  <p className="text-sm text-gray9">{article?.sub_title}</p>
                  <div className="flex lg:flex-row w-full justify-between items-center gap-1">
                    <p className="text-sm text-gray9">
                      {new Date(article?._creationTime)?.toLocaleDateString()}
                    </p>
                    <div>
                      <Badge className="bg-white text-black">
                        {article?.category}
                      </Badge>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitePreview;
