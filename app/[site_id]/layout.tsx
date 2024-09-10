import { Id } from "@/convex/_generated/dataModel";

import { ReactNode } from "react";
import NavbarSite from "./_component/NavbarSite";

import Head from "./_component/Head";

export default async function SiteLayout({
  params,
  children,
}: {
  params: { site_id: Id<"sites"> };
  children: ReactNode;
}) {
  return (
    <>
      <Head params={params} />
      <body>
        <NavbarSite
          title="Demo"
          description="demo description"
          logoPath="/assets/icons/logo.webp"
        />
        <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
          {children}
        </main>
      </body>
    </>
  );
}
