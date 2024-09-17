"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
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

const ChangeSiteDescription = ({
  site_id,
  sites,
}: {
  sites: any;
  site_id: Id<"sites">;
}) => {
  const changedSiteDescription = useMutation(api.sites.changeSiteDescription);
  const [siteDescription, setSiteDescription] = useState(
    sites?.site_description || ""
  );

  const handleChangeSiteDesciption = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await changedSiteDescription({
        id: site_id,
        site_description: siteDescription,
      });
      toast.success("Site name has been updated");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error occured while trying to update site name");
    }
  };

  return (
    <div className="w-[80%] mt-[1rem]">
      <Card className="bg-black text-white border border-white/15">
        <CardHeader>
          <CardTitle>Description</CardTitle>
          <CardDescription className="text-gray9">
            The name of your site. This will be used as the meta title on Google
            as well.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeSiteDesciption}>
          <CardContent>
            <Input
              placeholder="Site Description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
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

export default ChangeSiteDescription;
