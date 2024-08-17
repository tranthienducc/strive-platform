import type { Metadata } from "next";
import CategoryLists from "../_component/CategoryLists";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Premium Website Templates - Strive",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex flex-row max-w-full w-full px-10 pb-8 pt-28  bg-black">
      <CategoryLists />
      <Header />
      <div className="max-w-full w-full pl-20 h-screen bg-inherit">
        {children}
      </div>
    </main>
  );
}
