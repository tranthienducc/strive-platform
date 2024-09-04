"use client";

import { categories } from "@/constants/infoSectionConstants";
import { useGetProductsVariant } from "@/lib/react-query/queries";
import { cn } from "@/lib/utils";
import { useHovered } from "@/state/hooks/useHovered";
import { filterVariantProducts } from "@/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CategoryLists = () => {
  const { slug: categoryParams } = useParams();
  const { productsVariant } = useGetProductsVariant();
  const { ref, isHovered } = useHovered();

  return (
    <nav
      ref={ref}
      className={cn(
        "flex flex-row lg:flex-col gap-1 max-w-[370px] lg:max-w-[250px] w-full bg-inherit lg:max-h-[660px] h-[50px] lg:border-none border border-white/10 lg:rounded-none rounded-full lg:h-screen sticky top-1",
        isHovered ? "overflow-y-auto" : "overflow-y-hidden"
      )}
    >
      {categories.map((category) => {
        const dataProductsVariant = filterVariantProducts(
          productsVariant,
          category.slug
        );

        return (
          <div key={category.slug}>
            <Link
              href={category.slug}
              className={cn(
                "flex flex-row justify-between px-3 py-4 lg:rounded-xl text-sm font-medium items-center whitespace-nowrap",
                category.slug === categoryParams
                  ? "is-active-red text-[#9e4363] lg:bg-[#9e4363] lg:text-white"
                  : "hover:text-white duration-300 hover:bg-white/5"
              )}
            >
              <div className="flex flex-row items-center gap-x-3">
                {category.Icon}
                <span className="text-white capitalize ">
                  {category.categories}
                </span>
              </div>
              <span className="lg:flex hidden text-gray9">
                {dataProductsVariant?.length || 0}
              </span>
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default CategoryLists;
