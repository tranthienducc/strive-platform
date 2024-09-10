"use client";
import SiteDashWrapper from "./_component/SidebarWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ExternalLinkIcon } from "lucide-react";

const CMS = ({ params }: { params: { site_id: Id<"sites"> } }) => {
  const sites = useQuery(api.documents.getSitesById, {
    id: params.site_id,
  });

  console.log(sites);

  return (
    <SiteDashWrapper site_id={params.site_id}>
      <main className="flex w-full flex-col items-center p-4 justify-between">
        <div className="w-full">
          <h1 className="scroll-m-2 font-medium tracking-tight text-3xl">
            Articles
          </h1>

          <Link
            href={`https://${sites?.site_subdomain[0]}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
            target="_blank"
            className="flex items-center justify-center"
          >
            <Button variant={"secondary"} size="sm">
              <ExternalLinkIcon className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex flex-wrap justify-start items-center gap-3 mt-[1.5rem] mb-[2rem] w-full">
            <main className="flex flex-col gap-2 lg:gap-2 min-h-[30vh] w-full">
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/20 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    You have no articles
                  </h3>
                  <p className="text-sm text-gray9 mb-3">
                    Articles will show here once you&apos;ve published articles
                  </p>
                  <Link href={`/cms/sites/${params?.site_id}/documents`}>
                    <Button className="bg-white text-sm font-medium text-black">
                      My Documents
                    </Button>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </main>
    </SiteDashWrapper>
  );
};

export default CMS;
