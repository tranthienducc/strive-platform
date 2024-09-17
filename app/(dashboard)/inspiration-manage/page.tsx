"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { useEffect, useState } from "react";
import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { isFilterCategory } from "@/utils";
import { POPULAR_RECENT_OPTIONS } from "@/constants/data";

import InspirationItem from "@/components/inspiration-shared/inspiration-item";
import SearchFilter from "@/components/inspiration-shared/SearchFilter";
import { BreadcumsCustom } from "@/components/common/index";
import { DropdownFilters } from "@/components/common/index";
import DialogInspirationForm from "@/components/common/DialogInspirationForm";
import DialogInspirationFormCode from "@/components/common/DialogInspirationFormCode";
import { useFilterQueryManager } from "@/state/hooks/useFilterQueryManager";

const InspirationMangePage = () => {
  const { search, category, setFilters } = useFilterQueryManager();
  const inspirations = useQuery(api.inspiration.getAllInspiration, {
    search,
  } as {});

  const [filterType, setFilterType] = useState<FILTERS_CATEGORIES>(
    FILTERS_CATEGORIES.RECENT
  );

  const filterInspiration = inspirations?.filter((data) =>
    data?.title?.toLowerCase().includes((search ?? "").toLowerCase())
  );

  useEffect(() => {
    if (category !== filterType) {
      setFilters({ category: filterType });
    }

    if (inspirations) {
      let filtered = inspirations;

      if (filterType === FILTERS_CATEGORIES.RECENT) {
        filtered = filtered.sort(
          (a, b) =>
            new Date(b._creationTime).getTime() -
            new Date(a._creationTime).getTime()
        );
      }
    }
  }, [category, filterType, inspirations, setFilters]);

  return (
    <div className="h-full">
      <BreadcumsCustom link="Inspiration" page="Inspiration files" />
      <div className="flex flex-row items-center gap-3">
        <DialogInspirationForm />
        <DialogInspirationFormCode />
      </div>

      <div className="flex lg:flex-row justify-between flex-col items-start lg:items-baseline mb-7">
        <h2 className="text-lg font-medium text-white mb-5">
          All inspirations
        </h2>
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 max-w-[400px] w-full">
          <SearchFilter />
          <DropdownFilters
            value={filterType}
            onValueChange={(value) => {
              if (isFilterCategory(value)) {
                setFilterType(value);
              }
            }}
            placeholder={FILTERS_CATEGORIES.RECENT}
            options={POPULAR_RECENT_OPTIONS}
          />
        </div>
      </div>
      {filterInspiration?.length === 0 ? (
        <span className="text-sm text-gray9 font-normal">
          No inspiration data available here. Please create a new one
        </span>
      ) : null}
      <InspirationItem inspiration={filterInspiration} />
    </div>
  );
};

export default InspirationMangePage;
