"use client";
import { Button } from "@/components/ui/button";
import { pages } from "@/constants/data";
import { api } from "@/convex/_generated/api";
import { multiPrice } from "@/utils";
import { useMutation } from "convex/react";
import { Earth } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";
import { toast } from "sonner";

const SaleProductPayment = ({
  price = 0,
  salePrice = 0,
  title = "",
  slug,
}: {
  price: number | undefined;
  salePrice: number | undefined;
  title: string | undefined;
  slug: string | undefined;
}) => {
  const appyDiscountCode = useMutation(api.discount.applyDiscountCode);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = async () => {
    try {
      const couponDetails = await appyDiscountCode({
        code: couponCode,
      });

      if (
        couponDetails.discountPersent &&
        couponDetails.discoutnInspiration?.toString() === title?.toString() &&
        couponDetails.discountLimit >= couponDetails.discountUsed
      ) {
        setDiscount(couponDetails.discountPersent);
        setCouponCode("");
        toast.success("Apply disounts code successfully");
      } else {
        toast.error("Discount code no valid");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[400px] w-full bg-[#1f2025] rounded-md p-[21px] border border-white/15 flex-col flex">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {price === 0 ? (
            <strong className="text-xl text-white font-semibold">
              Miễn phí
            </strong>
          ) : (
            <>
              <strong className="text-xl text-[#ff695a] font-bold whitespace-nowrap">
                {multiPrice(salePrice)} VND
              </strong>
              <span className="text-sm line-through text-gray9 font-normal  whitespace-nowrap">
                {multiPrice(price - discount)} VND
              </span>
            </>
          )}
        </div>
        <span className="inline-block px-3 py-1 bg-[#ff695a33] text-[#ff695a] rounded-md text-xs font-bold bg-opacity-20 whitespace-nowrap">
          {price === 0
            ? "-100%"
            : `-${Math.floor((1 - salePrice / price) * 100)} %`}
        </span>
      </div>

      <h4 className="text-base font-semibold text-white mb-3">
        Inspiration included:
      </h4>
      <div className="flex flex-col gap-3 mb-[25px]">
        {pages.map((data, index) => (
          <div key={index} className="flex flex-row items-center gap-x-2">
            <Earth className="size-3 text-gray9" />
            <p className="text-xs lg:text-sm whitespace-nowrap font-semibold text-gray9">
              {data.name}
            </p>
          </div>
        ))}
      </div>

      <Link
        href={`/checkout/${slug}`}
        className="rounded-full max-w-full flex items-center justify-center text-base font-medium text-white border border-[#ff695a] h-[50px] mb-6 bg-transparent hover:text-gray9 hover:bg-transparent"
      >
        Buy now at good price
      </Link>

      <div className="max-w-full w-full rounded-lg gap-5 p-2 transition-all relative flex flex-row items-center justify-between border border-white/15 h-10 has-[input:focus]:border-[#ff695a]">
        <input
          placeholder="Enter discount code"
          className="outline-none border-none bg-transparent text-sm uppercase font-bold pr-2 placeholder:font-medium text-white"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <Button
          onClick={handleApplyCoupon}
          className="text-xs font-semibold bg-[#a5a6a8] text-black rounded px-3 h-full flex-shrink-0 hover:bg-white/20"
          disabled={!couponCode}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default SaleProductPayment;
