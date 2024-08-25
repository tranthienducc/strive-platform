import { BreadcumsCustom } from "@/components/common/index";
import { Shell } from "@/components/Shell";
import React from "react";
import { UsersTable } from "./component/user-table/user-table";
import { DataTableSkeleton } from "./component/data-table/index";

const OrderManagePage = () => {
  return (
    <div className="h-full">
      <BreadcumsCustom link="Order Management" page=" Order Infomation" />

      <div className="flex flex-col items-start mt-3 mb-7">
        <h4 className="text-xl font-semibold text-white">
          All Orders Template
        </h4>
        <span className="text-sm font-normal text-gray9">
          All orders templates is hear.
        </span>
      </div>

      <Shell className="gap-2">
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          <UsersTable />
        </React.Suspense>
      </Shell>
    </div>
  );
};

export default OrderManagePage;
