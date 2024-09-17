"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const subdomainRegex = /^[a-zA-Z0-9-]+$/;

const ChangeSiteSubdomain = ({
  site_id,
  sites,
}: {
  sites: any;
  site_id: Id<"sites">;
}) => {
  const changedSiteSubdomain = useMutation(api.sites.changeSiteSubdomain);
  const [siteSubdomain, setSiteSubDomain] = useState(
    sites?.site_subdomain || ""
  );

  const handleChangeSiteDomain = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validate the subdomain
    if (!subdomainRegex.test(siteSubdomain)) {
      toast(
        "Subdomain must only contain alphanumeric characters or hyphens, and must not contain '.', '#', or '$'"
      );
      setSiteSubDomain(sites?.site_subdomain);
      return;
    }

    if (siteSubdomain?.length < 1 || siteSubdomain?.length > 63) {
      toast("Subdomain must be between 1 and 63 characters");
      setSiteSubDomain(sites?.site_subdomain);
      return;
    }
    try {
      const response = await changedSiteSubdomain({
        id: site_id,
        site_subdomain: siteSubdomain,
      });
      toast.success("Site subdomain has been updated");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while trying to update site subdomain");
    }
  };

  return (
    <div className="w-[80%] mt-[1rem]">
      <Card className="bg-black text-white border border-white/15">
        <CardHeader>
          <CardTitle>Sub domain</CardTitle>
          <CardDescription className="text-gray9">
            The subdomain for your site.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeSiteDomain}>
          <CardContent>
            <Input
              placeholder="Site Description"
              value={siteSubdomain}
              onChange={(e) => setSiteSubDomain(e.target.value)}
              className="bg-inherit border border-white/15 text-white"
            />
          </CardContent>
          <CardFooter className="border-t border-white/15 px-6 py-4">
            <Button type="submit" className="bg-white text-black">
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ChangeSiteSubdomain;
