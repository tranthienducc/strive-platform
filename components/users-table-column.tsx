import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { multiFormatDateString, multiPrice } from "@/utils";
import DataTableColumnHeader from "../app/(dashboard)/orders-manage/_component/data-table/data-table-column-header";
import DialogDeleteOrder from "@/app/(dashboard)/orders-manage/_component/DialogDeleteOrder";
import { useState } from "react";

export default function getColumns({ data }: any) {
  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 border border-white bg-gray9"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5 border border-white bg-gray9"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "#",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="#" />
      ),
      cell: ({ row }: any) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-5 text-white font-medium">{row.index}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "order_code",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Order Code" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.order_code)
          .find((label: any) => label === row.original.order_code);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {label}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "users",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="User name" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.users)
          .find((label: any) => label === row.original.users);

        return (
          <div className="flex space-x-2">
            <span className="max-w-10 whitespace-nowrap font-medium">
              {label.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "product_name",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Product name" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.product_name)
          .find((label: any) => label === row.original.product_name);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {label}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "revenue",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Revenue" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.revenue)
          .find((label: any) => label === row.original.revenue);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {multiPrice(label)} VND
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.amount)
          .find((label: any) => label === row.original.amount);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {multiPrice(label)} VND
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.status)
          .find((label: any) => label === row.original.status);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {label}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "code",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.code)
          .find((label: any) => label === row.original.code);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {label}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "_creationTime",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data._creationTime)
          .find((label: any) => label === row.original._creationTime);

        return multiFormatDateString(label);
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: function Cell({ row }: any) {
        const [showDeleteOrderDialog, setShowDeleteOrderDialog] =
          useState(false);

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-white/50"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 p-4 text-white bg-black border border-white/15"
              >
                <DialogDeleteOrder
                  data={row.original}
                  open={showDeleteOrderDialog}
                  onOpenChange={setShowDeleteOrderDialog}
                  onSuccess={() => row.toggleSelected(false)}
                />
                <DropdownMenuSeparator className="bg-white/15" />
                Generate Vocice
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
