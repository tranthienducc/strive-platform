import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { InspirationFilters } from "@/utils/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useFilterQueryManager() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") as InspirationFilters["search"];
  const categoryParam = searchParams.get("category");

  const category =
    categoryParam &&
    Object.values(FILTERS_CATEGORIES).includes(
      categoryParam as FILTERS_CATEGORIES
    )
      ? (categoryParam as FILTERS_CATEGORIES)
      : undefined;

  const setFilters = useCallback(
    (filter: Partial<InspirationFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filter?.search !== undefined) {
        params.set("search", filter.search);
      }
      if (filter?.category) {
        params.set("category", filter.category);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return {
    search,
    category,
    setFilters,
  };
}
