"use client";
import {
  useGetProducts,
  useGetProductsVariant,
} from "@/lib/react-query/queries";
import { cn } from "@/lib/utils";
import { URL_CATEGORY } from "@/utils";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesCard = (props: { [x: string]: any }) => {
  const { ...category } = props;
  const { products } = useGetProducts();
  const { productsVariant } = useGetProductsVariant();

  const quantityProduct = productsVariant?.length;

  const thumbUrl = products?.map((data) => data.attributes.large_thumb_url);
  const categoryName = productsVariant
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d) => d.title)
    .find((title) => title.includes(category.slug));
  console.log("category-nanme", categoryName);

  return (
    <Link
      href={`${URL_CATEGORY}/${categoryName}`}
      className="max-w-[355px] w-full h-[260px] bg-[#0e0e0e] border border-white/5 hover:bg-[#8787871a] rounded-[8px] duration-300"
    >
      <div className="p-5 flex flex-col gap-y-[10px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-[5px]">
            {category.Icon}
            <span className="text-sm text-white font-semibold">
              {category.categories}
            </span>
          </div>
          <span className="text-sm text-gray9 font-semibold">
            {quantityProduct || 0}
          </span>
        </div>
        <p className="line-clamp-2 text-sm font-normal text-gray9">
          {category.description}
        </p>
      </div>
      <div className="flex flex-row h-full relative">
        {thumbUrl?.map((item, index) => (
          <React.Fragment key={index}>
            <Image
              src={item}
              alt="bento-img"
              className={cn(
                "ml-5 max-w-[133px] w-full max-h-[150px] h-full object-cover rounded-[.375rem] border border-[#FFFFFF1A]",
                index === 0 ? "z-10 " : "z-20 absolute right-[100px]"
              )}
              width={600}
              height={600}
              loading="lazy"
            />
          </React.Fragment>
        ))}
      </div>
    </Link>
  );
};

export default CategoriesCard;
