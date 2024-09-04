"use client";
import React from "react";
import { Header } from "./shared";
import { ChildrenType } from "@/utils/types/type";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const Wrapper = ({ children }: ChildrenType) => {
  const pathname = usePathname();

  const isDashboardRoute = [
    "/discount-manage",
    "/inspiration-manage",
    "/manage",
    "/order-template-management",
  ].some((route) => pathname.startsWith(route));
  return (
    <main className="relative wrapper">
      {!isDashboardRoute && (
        <>
          <Header />
        </>
      )}
      <Toaster position="bottom-right" />
      {children}
    </main>
  );
};

export default Wrapper;
