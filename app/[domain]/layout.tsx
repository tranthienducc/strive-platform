import { ReactNode } from "react";
import NavbarSite from "./_components/NavbarSite";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
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
