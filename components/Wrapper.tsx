"use client";
import React, { useEffect, useState } from "react";
import { Header } from "./shared";
import { ChildrenType } from "@/utils/types/type";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Wrapper = ({ children }: ChildrenType) => {
  const pathname = usePathname();
  const sites = useQuery(api.sites.getAllSites);
  const siteSubdomain = sites?.[0]?.site_subdomain;
  const [isStrivePlatformUrl, setIsStrivePlatformUrl] = useState(false);

  const showHeaderRoutes = [
    "/discount-manage",
    "/inspiration-manage",
    "/manage",
    "/orders-manage",
  ];

  // Sử dụng useEffect để kiểm tra hostname trên client-side
  useEffect(() => {
    if (siteSubdomain && typeof window !== "undefined") {
      const currentHostname = window.location.hostname;

      // Kiểm tra cho cả môi trường development và production
      const isDevelopment = currentHostname === `${siteSubdomain}.localhost`;
      const isProduction =
        currentHostname === `${siteSubdomain}.strive-platform.xyz`;

      setIsStrivePlatformUrl(isDevelopment || isProduction);
    }
  }, [siteSubdomain]);

  // Kiểm tra xem pathname có bắt đầu bằng bất kỳ route nào trong showHeaderRoutes
  const shouldShowHeader = showHeaderRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <main className="relative wrapper">
      {!shouldShowHeader && !isStrivePlatformUrl && (
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
