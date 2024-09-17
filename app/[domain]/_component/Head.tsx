"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Head from "next/head";
const CustomHeader = ({ params }: { params: { subdomain: string } }) => {
  const result = useQuery(api.sites.getSitesBySub, {
    site_subdomain: params.subdomain,
  });

  const siteName = result?.site_name;
  const siteDescription = result?.site_description;
  const siteCover = result?.site_coverImage;
  const mainDomain = result?.site_custom_domain;

  return (
    <Head>
      <title>{siteName}</title>
      <meta name="site_name" content={siteName} />
      <meta name="description" content={siteDescription} />
      {siteCover && <meta name="image" content={siteCover} />}
      <meta
        name="url"
        content={mainDomain + "." + process.env.NEXT_PUBLIC_FRONTEND_URL}
      ></meta>
      <link rel="icon" href="/assets/icons/favicon.ico" />
    </Head>
  );
};

export default CustomHeader;
