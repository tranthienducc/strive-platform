import { ReactNode } from "react";

export default function DashboardCMSLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen min-w-full lg:grid-cols-[280px_1fr] mt-[60px]">
      {children}
    </div>
  );
}
