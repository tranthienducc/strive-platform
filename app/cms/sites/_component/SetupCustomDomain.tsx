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
import React, { useState } from "react";
import { toast } from "sonner";

const SetupCustomDomain = ({
  data,
  site_id,
}: {
  data: any;
  site_id: Id<"sites">;
}) => {
  const [siteCustomDomain, setSiteCustomDomain] = useState<any>(
    data.site_custom_domain || ""
  );
  const [verificationRecords, setVerificationRecords] = useState<any>(null);
  const changeSiteDomain = useMutation(api.sites.changeSiteDomain);

  const handleChangeSiteDomain = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await changeSiteDomain({
        id: site_id,
        site_custom_domain: siteCustomDomain,
      });
      toast.success("Site custom domain has been updated");
      setVerificationRecords(data.verificationRecords);
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while trying to update site subdomain");
    }
  };

  console.log("verificationRecords", verificationRecords);

  return (
    <div className="w-[80%] mt-[1rem]">
      <Card>
        <CardHeader>
          <CardTitle>Custom domain</CardTitle>
          <CardDescription>The custom domain for your site.</CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeSiteDomain}>
          <CardContent>
            <Input
              value={siteCustomDomain}
              onChange={(e) => setSiteCustomDomain(e.target.value)}
              placeholder="yourdomain.com"
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
      {verificationRecords && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Domain Verification</CardTitle>
            <CardDescription>
              Add these records to your DNS provider to verify your domain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="font-bold">A Record:</h3>
              <p>Name: @</p>
              <p>Value: {verificationRecords?.domain}</p>
            </div>
            <div className="mt-2">
              <h3 className="font-bold">CNAME Record:</h3>
              <p>Name: www</p>
              <p>Value: {verificationRecords?.cname}</p>
            </div>
            {verificationRecords?.txt && (
              <div className="mt-2">
                <h3 className="font-bold">TXT Record:</h3>
                <p>Name: @</p>
                <p>Value: {verificationRecords?.txt}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SetupCustomDomain;
