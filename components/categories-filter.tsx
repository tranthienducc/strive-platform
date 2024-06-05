"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

type CategoriesFilterType = {
  filterWord: string[];
  filterLabel: (categories: string) => void;
};

const CategoriesFilter = ({
  filterLabel,
  filterWord,
}: CategoriesFilterType) => {
  const inspirations = useQuery(api.documents.getById);

  return (
    <div className="flex flex-row gap-x-1">
      {inspirations &&
        inspirations.map((inspiration, index) => (
          <>
            <button
              key={index}
              className={`${
                filterWord.includes(inspiration.categories as string)
                  ? "text-sm font-semibold bg-white text-black  py-3 px-3 text-center duration-300 rounded-full"
                  : "text-sm font-semibold text-white py-3 px-3 text-center duration-300 rounded-full"
              }`}
              onClick={() => filterLabel(inspiration.categories as string)}
            >
              {inspiration.categories}
            </button>
          </>
        ))}
    </div>
  );
};

export default CategoriesFilter;
