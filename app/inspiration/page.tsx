"use client";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  categoriesInspiration,
  POPULAR_RECENT_OPTIONS,
} from "@/constants/data";
import InspirationCard from "@/components/inspiration-shared/InspirationCard";
import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { useFilterQueryManager } from "@/state/hooks/useFilterQueryManager";
import { isFilterCategory } from "@/utils";
import { DropdownFilters } from "@/components/common/index";
import { CategoriesFilter } from "@/components/common/index";

const InspirationPage = () => {
  const { category, setFilters } = useFilterQueryManager();
  const inspirations = useQuery(api.documents.getById);
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [filterInspiration, setFilterInspiration] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<FILTERS_CATEGORIES>(
    FILTERS_CATEGORIES.POPULAR
  );

  // Filter Categories
  const filterLabel = (categories: string) => {
    setFilterWord([categories]);
  };

  useEffect(() => {
    if (categoriesInspiration.length > 0 && filterInspiration.length === 0) {
      setFilterWord([categoriesInspiration[0]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (category !== filterType) {
      setFilters({ category: filterType });
    }

    if (inspirations) {
      let filtered = inspirations;
      if (filterWord.length > 0) {
        filtered = inspirations?.filter((inspiration: any) => {
          return filterWord.every((fillters) =>
            inspiration.categories?.includes(fillters)
          );
        });
      }

      if (filterType === FILTERS_CATEGORIES.POPULAR) {
        filtered = filtered.sort((a, b) => (b?.watch ?? 0) - (a?.watch ?? 0));
      } else if (filterType === FILTERS_CATEGORIES.RECENT) {
        filtered = filtered.sort(
          (a, b) =>
            new Date(b._creationTime).getTime() -
            new Date(a._creationTime).getTime()
        );
      }

      setFilterInspiration(filtered);
    }
  }, [category, filterType, filterWord, inspirations, setFilters]);

  console.log("render");

  if (!inspirations) {
    return (
      <div className="max-w-[315px] w-full flex flex-col gap-y-3">
        <Skeleton className="w-[315px] h-[236px] rounded-xl" />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-x-2 items-center">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-[51px] h-5" />
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-row gap-x-1">
              <Skeleton className="w-6 h-4" />
            </div>
            <div className="flex flex-row gap-x-1">
              <Skeleton className="w-6 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-full w-full mt-16 px-5 lg:px-[72px]">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-44 items-start  lg:items-center mb-8 mt-24">
          <DropdownFilters
            value={filterType}
            onValueChange={(value) => {
              if (isFilterCategory(value)) {
                setFilterType(value);
              }
            }}
            placeholder={FILTERS_CATEGORIES.POPULAR}
            options={POPULAR_RECENT_OPTIONS}
          />
          <CategoriesFilter filterLabel={filterLabel} filterWord={filterWord} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-9 relative">
          {filterInspiration?.length ? (
            filterInspiration?.map((item, index) => (
              <InspirationCard item={item} key={index} />
            ))
          ) : (
            <p className="text-sm text-gray9 font-normal absolute left-[40%] top-[50%]">
              No inspirations available heare.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspirationPage;
