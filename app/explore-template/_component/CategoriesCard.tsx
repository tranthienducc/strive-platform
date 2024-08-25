"use client";
import CategoriesCardSkeleton from "@/components/loading/CategoriesCardSkeleton";
import { useGetProductsVariant } from "@/lib/react-query/queries";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesCard = (props: { [x: string]: any }) => {
  const { ...category } = props;
  const { productsVariant } = useGetProductsVariant();

  const quantityProduct = productsVariant?.length;

  const categoryName = productsVariant
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d) => d.title)
    .find((title) => title.includes(category.slug));

  if (!category) {
    return <CategoriesCardSkeleton />;
  }

  return (
    <Link
      href={`/explore-template/category/${categoryName}`}
      className="max-w-[355px] w-full h-[260px] bg-blackOe border border-white/5 hover:bg-[#8787871a] rounded-[8px] duration-300"
    >
      <div className="p-5 flex flex-col gap-y-[10px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-[5px]">
            {category.Icon}
            <span className="text-sm text-white font-semibold capitalize">
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
        <Image
          src="/assets/images/bento-img1.png"
          alt="bento-img"
          className="ml-5 max-w-full w-full max-h-[150px] h-full object-cover rounded-[.375rem] border border-blackFF"
          width={600}
          height={600}
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default CategoriesCard;
