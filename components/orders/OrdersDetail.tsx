"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Verified } from "lucide-react";
import GrandTotal from "../GrandTotal";
import { Button } from "../ui/button";
import { multiFormatDateString, multiPrice } from "@/utils";
import React from "react";

const OrdersDetail = ({
  data,
  decodedUrl,
}: {
  data: any;
  decodedUrl: string;
}) => {
  const ordersInspiration = useQuery(api.order.getOrdersInspiration);
  const discounts = useQuery(api.discount.getDiscounts);
  console.log("ordersInspiration", ordersInspiration);

  const filteredOrders =
    ordersInspiration?.filter((data) =>
      data.product_name?.includes(decodedUrl)
    ) ?? [];

  const filterDiscounts = discounts?.find((item) =>
    item.inspirations?.includes(decodedUrl)
  );

  const handleDownloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;

    const fileName = url.split("/").pop() || "downloaded-file";
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();
  };

  return (
    <div className="p-16 bg-white rounded-lg max-w-[656px] w-full flex-col flex">
      <div
        className="flex flex-col items-center justify-center mb-6"
        key={data._id}
      >
        {filteredOrders?.map((data) => (
          <React.Fragment key={data._id}>
            <h1 className="text-lg font-bold text-black">Order Sumary</h1>
            <Image
              alt="logo"
              src="/assets/icons/logo-dark.webp"
              loading="lazy"
              width={300}
              height={300}
              className="size-16"
            />
            <h2>Order #{data.order_code}</h2>
            <div className="flex flex-row items-center gap-8">
              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-semibold text-black">
                  Status:
                </span>
                <Badge className="bg-[#eefbf4] rounded-full size-7 flex items-center justify-center">
                  <Verified className="size-5 flex-shrink-0 text-green-400" />
                </Badge>
                <span className="text-sm text-black font-normal">
                  {data.status}
                </span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-semibold text-black">Date:</span>
                <span className="text-sm text-black font-normal">
                  {multiFormatDateString(
                    data._creationTime as unknown as string
                  )}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <h3 className="text-base font-medium text-black mb-5 bg-gray-300 rounded-md  pl-4 py-2">
        Order summary
      </h3>

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Image
            src={data.coverImage}
            alt="orders-product"
            className="max-w-[64px] w-full h-[48px] rounded-lg object-cover"
            priority={true}
            width={1000}
            height={1000}
          />
          <h5 className="text-sm font-semibold text-black">{data.title}</h5>
        </div>
        <span className="text-sm text-black font-normal">
          {multiPrice(data.price)} VND
        </span>
        <GrandTotal
          className="text-black mb-4"
          price={data.price}
          salePrice={data.salePrice}
          amount={filterDiscounts?.amount}
        />

        <h3 className="text-base font-medium text-black mb-5 bg-gray-300 rounded-md max-w-full w-full  pl-4 py-2">
          Files or Links
        </h3>

        <div className="flex flex-row items-center justify-between max-w-full w-full">
          <div className="flex flex-row items-center gap-3">
            <div className="block p-4 rounded-md bg-gray-300 text-black">
              .fig
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-black">{data.url}</p>
              <span className="text-gray9 font-normal text-xs">650 B</span>
            </div>
          </div>

          <Button
            onClick={() => handleDownloadFile(data.url)}
            className="px-4 py-2 rounded-md bg-blue-400 text-white text-base font-medium"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;
