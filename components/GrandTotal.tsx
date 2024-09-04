import { cn } from "@/lib/utils";
import { multiPrice } from "@/utils";
import React from "react";

const GrandTotal = ({
  amount = 0,
  price = 0,
  salePrice = 0,
  code,
  className,
}: {
  price?: number;
  salePrice?: number;
  amount?: number;
  code?: string;
  className?: string;
}) => {
  return (
    <div className={cn("text-white max-w-full w-full", className)}>
      <div className="flex flex-row items-center justify-between mt-6  max-w-full w-full">
        <span className="text-sm font-normal ">Subtotal: </span>
        <span className="text-sm font-bold ">{multiPrice(price)} VND</span>
      </div>

      <div className="flex flex-row items-center justify-between mt-6">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm font-normal ">Disount: </span>
          <span className="block bg-[#f6f8f7] text-black font-normal text-xs rounded-lg px-2 py-1">
            {code}
          </span>
        </div>
        <span className="text-sm font-bold ">-{multiPrice(amount)} VND</span>
      </div>

      <div className="flex flex-row items-center justify-between mt-6">
        <span className="text-base font-normal ">Total: </span>
        <span className="text-base font-bold ">
          {multiPrice(salePrice)} VND
        </span>
      </div>
    </div>
  );
};

export default GrandTotal;
