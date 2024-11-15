"use client";
import AlertDialogDelete from "@/components/common/AlertDialogDelete";
import { BreadcumsCustom } from "@/components/common/index";
import SearchFilter from "@/components/inspiration-shared/SearchFilter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pagiBtn } from "@/constants/data";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useFilterQueryManager } from "@/state/hooks/useFilterQueryManager";
import { formUrlQuery, multiFormatDateString, multiPrice } from "@/utils";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useState } from "react";
import { toast } from "sonner";

const DiscountManagePage = () => {
  const { search } = useFilterQueryManager();
  const [page, setPage] = useState(1);
  const discounts = useQuery(api.discount.getDiscounts, { search } as {});
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterDiscount = discounts?.filter((data) =>
    data?.name_code?.toLowerCase().includes((search ?? "").toLowerCase())
  );

  const deleteDiscountCode = useMutation(api.discount.deleteDiscountCode);

  const handleChangePage = (action: "prev" | "next") => {
    if (page === 1 && action === "prev") return;
    if (action === "prev") {
      setPage((prev) => prev - 1);
    } else if (action === "next" && filterDiscount?.length === 10) {
      setPage((prev) => prev + 1);
    }
    const newUrl = formUrlQuery({
      params: searchParams?.toString() || "",
      key: "page",
      value: action === "prev" ? `${page - 1}` : `${page + 1}`,
    });

    router.push(newUrl);
  };

  const handleDeleteDiscounts = async (id: Id<"discounts">) => {
    try {
      await deleteDiscountCode({
        id: id,
      });

      toast.success("Delete discount code successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong. Please try again!");
    }
  };
  return (
    <div className="pb-32">
      <BreadcumsCustom link="Discounts Manage" page="Discounts" />

      <h1 className="text-3xl font-semibold text-white mb-3">
        Discount Manage
      </h1>
      <span className="text-sm font-medium text-gray9 mb-14">
        Manage many discount code and amount , start date and end date.
      </span>

      <SearchFilter className="mt-4" />

      <div className="flex justify-end items-end gap-3">
        <Button
          className={pagiBtn}
          onClick={() => handleChangePage("prev")}
          disabled={page === 1}
        >
          <ArrowLeft className="size-5 text-black" />
        </Button>
        <Button
          className={cn(
            pagiBtn,
            (filterDiscount?.length || 0) < 10
              ? "cursor-not-allowed"
              : "cursor-pointer"
          )}
          onClick={() => handleChangePage("next")}
          disabled={(filterDiscount?.length || 0) < 10}
        >
          <ArrowRight className="size-5 text-black" />
        </Button>
        <span className="text-sm text-white font-medium">
          Page: {page || 0}
        </span>
      </div>

      <Table className="bg-black border border-white/15 rounded-lg overflow-x-auto text-white mt-6">
        <TableHeader>
          <TableRow className="text-gray9">
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>#</TableHead>
            <TableHead>Name code</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Inspirations</TableHead>
            <TableHead>Limit</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterDiscount?.length === 0 ? (
            <p className="text-sm text-gray9 font-medium">No results...</p>
          ) : null}
          {filterDiscount?.map((order: any, index) => (
            <TableRow key={order._id} className="font-medium">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <span className="font-medium">{index + 1}</span>
              </TableCell>
              <TableCell className="font-bold text-nowrap">
                {order.name_code}
              </TableCell>
              <TableCell>
                <div className="w-16">
                  <div className="font-bold">{order?.code}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <p className="font-medium">{multiPrice(order.amount)}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs text-slate-400 w-[150px]">
                  {order.inspirations}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <p className="font-medium">{order.limit}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">{order.start_date}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium">{order.end_date}</span>
              </TableCell>
              <TableCell>
                {multiFormatDateString(order._creationTime)}
              </TableCell>
              <TableCell>
                <AlertDialogDelete
                  onClick={() => handleDeleteDiscounts(order._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(DiscountManagePage);
