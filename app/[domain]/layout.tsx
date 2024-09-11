import { ReactNode } from "react";
import Head from "./_component/Head";
import NavbarSite from "./_component/NavbarSite";

export default async function SiteLayout({
  params,
  children,
}: {
  params: { subdomain: string };
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
