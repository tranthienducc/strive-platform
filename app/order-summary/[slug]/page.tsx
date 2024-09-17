"use client";
import OrdersDetail from "@/components/orders/OrdersDetail";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

const OrderSummary = ({ params }: Props) => {
  const inspiration = useQuery(api.inspiration.getAllInspiration);
  const decodedUrl = decodeURIComponent(params.slug);

  const filterInspiration = inspiration?.filter((data) =>
    data.title?.includes(decodedUrl)
  );

  return (
    <article className="max-w-full w-full mt-32 mb-20 flex flex-col items-center justify-center">
      {filterInspiration?.map((data) => (
        <OrdersDetail key={data._id} data={data} decodedUrl={decodedUrl} />
      ))}
    </article>
  );
};

export default OrderSummary;
