"use client";
import { useQuery } from "convex/react";
import DashboardWrapper from "./_component/DashboardWrapper";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import CreateSites from "./sites/_component/CreateSites";

export default function Sites() {
  const sites = useQuery(api.documents.getAllSites);
  return (
    <DashboardWrapper>
      <main className="flex min-w-screen p-4 flex-col items-center justify-between w-full">
        <div className="flex mb-[1.5rem] w-full justify-between items-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Your Blog Sites
          </h1>
          <CreateSites />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          {sites?.length === 0 ? (
            <main className="flex flex-col gap-2 lg:gap-2 min-h-[80vh] w-full">
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    You have no site
                  </h3>
                  <p className="text-sm font-normal text-gray9 mb-3">
                    Site(s) will show here once you&apos;ve created a site
                  </p>
                  <CreateSites />
                </div>
              </div>
            </main>
          ) : null}
          {sites?.map((site) => (
            <Link
              href={`/cms/sites/${site._id}`}
              key={site._id}
              prefetch={true}
              className="flex flex-col rounded-md w-[350px] hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
            >
              <div className="flex flex-col rounded-md border border-white/15 px-4 justify-between h-full py-4">
                <div className="flex flex-col  w-full justify-center items-start">
                  <h2 className="text-lg font-bold text-white">
                    {site.site_name}
                  </h2>
                  <p className="text-gray9 pt-1 text-sm font-normal">
                    {site.site_description}
                  </p>
                </div>
                <div className="flex justify-between mt-2 items-center w-full">
                  <p className="text-xs px-2 py-1 rounded-full border bg-zinc-900 text-gray9">
                    {site.site_subdomain}.{process.env.NEXT_PUBLIC_FRONTEND_URL}
                  </p>
                  <p className="text-xs text-gray9 font-normal">
                    {new Date(site._creationTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </DashboardWrapper>
  );
}
