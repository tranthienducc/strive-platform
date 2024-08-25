"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { isFilterCategory } from "@/utils";
import { useFilterQueryManager } from "@/state/hooks/useFilterQueryManager";
import { POPULAR_RECENT_OPTIONS } from "@/constants/data";
import Link from "next/link";
import InspirationItem from "@/components/inspiration-shared/inspiration-item";
import InspirationFilterSearch from "@/components/inspiration-shared/InspirationFilterSearch";
import { BreadcumsCustom } from "@/components/common/index";
import { DropdownFilters } from "@/components/common/index";

const InspirationMangePage = () => {
  const { search, category, setFilters } = useFilterQueryManager();
  const inspirations = useQuery(api.documents.getById, { search } as {});

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

      <Link
        href="/dashboard/create"
        className="lg:max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-black14 bg-inherit mb-12"
      >
        <div className="flex flex-col gap-y-3">
          <div className="bg-white-ec px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
            <FileText className="text-black w-5 h-5" strokeWidth={1.75} />
          </div>
          <p className="text-base font-medium text-white">New inspiration</p>
        </div>
        <Plus className="size-4 text-gray9" />
      </Link>

      <div className="flex lg:flex-row justify-between flex-col items-start lg:items-baseline mb-7">
        <h2 className="text-lg font-medium text-white mb-5">
          All inspirations
        </h2>
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 max-w-[400px] w-full">
          <InspirationFilterSearch />
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

      <InspirationItem inspiration={filterInspiration} />
    </div>
  );
};

export default InspirationMangePage;
