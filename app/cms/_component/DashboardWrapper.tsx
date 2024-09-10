import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DashboardSidebar />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4  lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardWrapper;
