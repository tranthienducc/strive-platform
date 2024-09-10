import React, { ReactNode } from "react";
import SitesDashNav from "./SideDashNav";
import { Id } from "@/convex/_generated/dataModel";

export default function SiteDashWrapper({
  children,
  site_id,
}: {
  children: ReactNode;
  site_id: Id<"sites">;
}) {
  return (
    <>
      <SitesDashNav site_id={site_id} />
      <div className="flex flex-col mt-[60px]">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </>
  );
}
