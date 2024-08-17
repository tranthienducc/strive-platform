"use client";
import NavigationItem from "@/components/navigation/navigation-item";
import { categories } from "@/constants/data";
import { cn } from "@/lib/utils";
import { useHovered } from "@/state/hooks/useHovered";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CategoryLists = () => {
  const { slug: categoryParams } = useParams();
  const { ref, isHovered } = useHovered();

  return (
    <nav
      ref={ref}
      className={cn(
        "flex flex-col gap-y-1 max-w-[250px] w-full bg-inherit max-h-[660px] h-screen sticky top-1",
        isHovered ? "overflow-y-auto" : "overflow-y-hidden"
      )}
    >
      {categories.map((category) => {
        return (
          <NavigationItem key={category.slug}>
            <Link
              href={category.slug}
              className={cn(
                "flex flex-row justify-between px-3 py-4 rounded-xl text-sm font-medium items-center",
                category.slug === categoryParams
                  ? "is-actived text-white outline-none border border-stone-800 duration-300 bg-[#9e4363]"
                  : "hover:text-white duration-300 hover:bg-white/5"
              )}
            >
              <div className="flex flex-row items-center gap-x-3">
                {category.Icon}
                <span className="text-white">{category.categories}</span>
              </div>
              <span className="text-gray9">{category.quantity}</span>
            </Link>
          </NavigationItem>
        );
      })}
    </nav>
  );
};

export default CategoryLists;
