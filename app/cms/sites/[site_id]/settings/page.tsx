"use client";
import { useQuery } from "convex/react";
import SiteDashWrapper from "../_component/SidebarWrapper";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SitePreview from "./_component/SitePreview";
import DeleteSite from "../../_component/DeleteSite";
import ChangeSiteName from "../../_component/ChangeSiteName";
import ChangeSiteDescription from "../../_component/ChangeSiteDescription";
import ChangeSiteSubdomain from "../../_component/ChangeSiteSubdomain";

const SettingsCMSPage = ({ params }: { params: { site_id: Id<"sites"> } }) => {
  const sites = useQuery(api.sites.getSitesById, {
    id: params.site_id,
  });
  return (
    <SiteDashWrapper site_id={params.site_id}>
      <div className="flex flex-col justify-center items-start w-full">
        <div className="flex justify-between w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/cms/sites" className="text-gray9">
                  Sites
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {sites?.site_name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex gap-2">
            <DeleteSite site_id={params?.site_id} />
            <Link
              href={`https://${sites?.site_subdomain}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
              target="_blank"
              className="flex justify-center items-center"
            >
              <Button size="sm" className="border border-white/15 bg-inherit">
                <ExternalLinkIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="general" className="w-full mt-[2rem]">
          <TabsList className="bg-gray9 text-black">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="site-preview">Site Preview</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="w-full">
              <ChangeSiteName sites={sites} site_id={params?.site_id} />
              <ChangeSiteDescription sites={sites} site_id={params?.site_id} />
            </div>
          </TabsContent>
          <TabsContent value="site-preview">
            <div className="w-full">
              <SitePreview site_id={params?.site_id} />
            </div>
          </TabsContent>
          <TabsContent value="domain">
            <div className="w-full">
              <ChangeSiteSubdomain sites={sites} site_id={params?.site_id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SiteDashWrapper>
  );
};

export default SettingsCMSPage;
