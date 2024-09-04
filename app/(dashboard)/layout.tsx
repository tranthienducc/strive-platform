import WrapperAdminDashboard from "@/components/WrapperAdminDashboard";
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
    <WrapperAdminDashboard>
      <div className="lg:pr-7 lg:py-8 py-4 px-4  max-w-full w-full lg:pl-[19rem] h-full lg:h-screen">
        {children}
      </div>
    </WrapperAdminDashboard>
  );
}
