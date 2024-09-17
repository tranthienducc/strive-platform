"use client";

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
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

const ChangeSiteName = ({
  sites,
  site_id,
}: {
  sites: any;
  site_id: Id<"sites">;
}) => {
  const changedSiteName = useMutation(api.sites.changeSiteName);
  const [siteName, setSiteName] = useState(sites?.name || "");

  const handleChangeSiteName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await changedSiteName({
        id: site_id,
        site_name: siteName,
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
          <CardTitle>Name</CardTitle>
          <CardDescription className="text-gray9">
            The name of your site. This will be used as the meta title on Google
            as well.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeSiteName}>
          <CardContent>
            <Input
              placeholder="Site Name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
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

export default ChangeSiteName;
