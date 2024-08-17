import { Sidebar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strive - Admin Dashboard",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen relative items-start flex flex-row max-w-full w-full">
      <Sidebar />
      <div className="pr-7 py-8 bg-[#141517]  max-w-full w-full pl-[19rem]">
        {children}
      </div>
    </main>
  );
}
