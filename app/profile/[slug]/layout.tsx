import type { Metadata } from "next";
import SidebarProfile from "./_component/SidebarProfile";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/shared";

export const metadata: Metadata = {
  title: "Strive - Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative items-start flex flex-col max-w-full w-full h-screen px-[72px]">
      <SidebarProfile />
      <Separator className="max-w-full w-full bg-white/15" />

      <div className="py-8 max-w-full w-full h-screen">{children}</div>
      <Footer />
    </main>
  );
}
