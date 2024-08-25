"use client";
import { categoriesInspiration } from "@/constants/data";
import { cn } from "@/lib/utils";
import { useHovered } from "@/state/hooks/useHovered";

type CategoriesFilterType = {
  filterWord: string[];
  filterLabel: (categories: string) => void;
};

const CategoriesFilter = ({
  filterLabel,
  filterWord,
}: CategoriesFilterType) => {
  const { ref, isHovered } = useHovered();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-row lg:gap-0 gap-x-1 max-w-[370px] lg:min-w-[793px]",
        isHovered ? "lg:overflow-y-hidden overflow-y-auto" : "overflow-hidden"
      )}
    >
      {categoriesInspiration.map((inspiration, index) => (
        <button
          key={index}
          className={`${
            filterWord.includes(inspiration)
              ? "is-active-categories"
              : "text-sm font-semibold text-white py-1 lg:py-3 px-3 text-center duration-300 rounded-full hover:text-white/50"
          }`}
          onClick={() => filterLabel(inspiration)}
        >
          {inspiration}
        </button>
      ))}
    </div>
  );
};

export default CategoriesFilter;
