"use client";
import React from "react";
import { Header } from "./shared";
import { ChildrenType } from "@/utils/types/type";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const Wrapper = ({ children }: ChildrenType) => {
  const pathname = usePathname();

  const renderHeader = !pathname.startsWith("/dashboard");
  return (
    <main className="relative wrapper">
      {renderHeader && (
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
