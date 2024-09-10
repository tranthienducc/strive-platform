"use client";

import getColumns from "@/components/users-table-column";
import { useDataTable } from "@/state/hooks/use-data-table";
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BreadcumsCustom } from "@/components/common";
import { Shell } from "@/components/Shell";
import DataTableSkeleton from "./data-table-skeleton";
import DataTableToolbar from "./data-table-toolbar";
import { getCommonPinningStyles } from "@/lib/data-table/data-table";
import { flexRender } from "@tanstack/react-table";
import DataTablePagination from "./data-table-pagination";

const DataTable = ({ data, pageCount }: { data: any; pageCount: number }) => {
  const columns = useMemo(() => getColumns({ data }), [data]);

  // const filterFields = [
  //   {
  //     label: "Product name",
  //     value: "product_name" as keyof typeof data[0],
  //     placeholder: "Filter product_name...",
  //   },
  // ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // filterFields,
  });
  console.log(table.getRowModel().rows.map((data) => data));

  console.log(data);

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
          <DataTableToolbar table={table}></DataTableToolbar>
          <div className="w-full space-y-2.5 overflow-auto">
            <div className="overflow-hidden rounded-md border  border-white/20">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-white/10"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            className="border-b text-gray9 border-b-white/20"
                            style={{
                              ...getCommonPinningStyles({
                                column: header.column,
                              }),
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="text-white border-b border-b-white/20 hover:bg-white/10"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            style={{
                              ...getCommonPinningStyles({
                                column: cell.column,
                              }),
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={table.getAllColumns()?.length}
                        className="h-24 text-center text-white"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-2.5">
              <DataTablePagination table={table} />
              {table.getFilteredSelectedRowModel().rows?.length > 0}
            </div>
          </div>
        </React.Suspense>{" "}
      </Shell>
    </div>
  );
};

export default DataTable;
