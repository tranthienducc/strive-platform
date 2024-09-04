"use client";
import { ChildrenType } from "@/utils/types/type";
import { SidebarAdminMobile, SidebarAdmin } from "@/components/shared/index";

import { useAuth } from "@clerk/nextjs";
import PageNotFound from "@/app/not-found";
import useCheckIsMobile from "@/state/hooks/useCheckIsMobile";

const WrapperAdminDashboard = ({ children }: ChildrenType) => {
  const isMobile = useCheckIsMobile();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <PageNotFound />;
  }
  return (
    <main className="relative lg:items-start flex lg:flex-row max-w-full w-full">
      {isMobile ? <SidebarAdminMobile /> : <SidebarAdmin />}
      {children}
    </main>
  );
};

export default WrapperAdminDashboard;
