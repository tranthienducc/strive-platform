import { ReactNode } from "react";
import CustomHeader from "./_component/Head";
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
      <CustomHeader params={params} />
      <NavbarSite
        title="Demo"
        description="demo description"
        logoPath="/assets/icons/logo.webp"
      />

      <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
        {children}
      </main>
    </>
  );
}
