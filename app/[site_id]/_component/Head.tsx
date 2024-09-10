"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { notFound } from "next/navigation";

const Head = ({ params }: { params: { site_id: Id<"sites"> } }) => {
  const result = useQuery(api.documents.getSitesById, {
    id: params.site_id,
  });

  const siteName = result?.site_name;
  const siteDescription = result?.site_description;
  const siteCover = result?.site_coverImage;
  const mainDomain = result?.site_custom_domain;

  if (!result) {
    notFound();
  }

  return (
    <>
      <head>
        <title>{siteName}</title>
        <meta name="site_name" content={siteName} />
        <meta name="description" content={siteDescription} />
        {siteCover && <meta name="image" content={siteCover} />}
        <meta
          name="url"
          content={mainDomain + "." + process.env.NEXT_PUBLIC_FRONTEND_URL}
        ></meta>
        <link rel="icon" href="/assets/icons/logo.webp" />
      </head>
    </>
  );
};

export default Head;
