import { DataTableColumnHeader } from "@/app/dashboard/order-template-management/component/data-table/index";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { multiFormatDateString } from "@/utils";

export function getColumns({ data }: any) {
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
      accessorKey: "username",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="User name" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.attributes.user_name)
          .find((label: any) => label === row.original.attributes.user_name);

        return (
          <div className="flex space-x-2">
            {label}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("username")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.attributes.user_email)
          .find((label: any) => label === row.original.attributes.user_email);

        return (
          <div className="flex space-x-2">
            {label}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productname",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Product name" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.attributes.first_order_item.product_name)
          .find(
            (label: any) =>
              label === row.original.attributes.first_order_item.product_name
          );

        console.log("label-productName: ", label);

        return (
          <div className="flex space-x-2">
            {label}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("email")}
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
          .map((data: any) => data.attributes.status)
          .find((label: any) => label === row.original.attributes.status);

        return (
          <div className="flex space-x-2">
            {label}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("status")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdat",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }: any) => {
        const label = data
          .map((data: any) => data.attributes.created_at)
          .find((label: any) => label === row.original.attributes.created_at);

        return multiFormatDateString(label);
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: function Cell({}) {
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
                className="w-40 p-0 text-white bg-black border border-white/15"
              >
                Bill
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
