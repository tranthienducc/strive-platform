"use client";
import { ChildrenType } from "@/utils/types/type";
import { SidebarAdminMobile, SidebarAdmin } from "@/components/shared/index";
import useCheckISMobile from "@/state/hooks/useCheckIsMobile";

const WrapperAdminDashboard = ({ children }: ChildrenType) => {
  const isMobile = useCheckISMobile();
  return (
    <main className="relative lg:items-start flex lg:flex-row max-w-full w-full">
      {isMobile ? <SidebarAdminMobile /> : <SidebarAdmin />}
      {children}
    </main>
  );
};

export default WrapperAdminDashboard;
