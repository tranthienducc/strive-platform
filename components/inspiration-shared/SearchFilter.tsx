"use client";
import { cn } from "@/lib/utils";
import useDebounce from "@/state/hooks/useDebounce";
import { useFilterQueryManager } from "@/state/hooks/useFilterQueryManager";
import { InspirationFilters } from "@/utils/types/type";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type DebouncedValue<T> = T;

const SearchFilter = ({ className }: { className?: string }) => {
  const { search, setFilters } = useFilterQueryManager();

  const [localSearch, setLocalSearch] = useState<InspirationFilters["search"]>(
    search ?? ""
  );

  const debouncedSearch: DebouncedValue<string | undefined> =
    useDebounce(localSearch);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch, search, setFilters]);

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-x-2 rounded-md px-3 py-4 border-white/20 border max-w-[280px] w-full h-[40px]",
        className
      )}
    >
      <Search className="w-5 h-5 text-gray9" />
      <input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="border-none outline-none bg-inherit text-white placeholder:text-gray9 w-full text-sm font-medium"
      />
    </div>
  );
};

export default SearchFilter;
