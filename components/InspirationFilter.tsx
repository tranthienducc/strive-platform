"use client";
import useDebounce from "@/state/hooks/useDebounce";
import { InspirationFilters } from "@/utils/types/type";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type InspirationFilterProps = {
  onChange: (filters: InspirationFilters) => void;
};
type DebouncedValue<T> = T;

const InspirationFilter = ({ onChange }: InspirationFilterProps) => {
  const [search, setSearch] = useState<InspirationFilters["search"]>("");
  const searchDebounce: DebouncedValue<string | undefined> =
    useDebounce(search);

  useEffect(() => {
    onChange({
      search: searchDebounce,
    });
  }, [onChange, searchDebounce]);

  console.log("InspirationFilter", search);

  return (
    <div className="flex flex-row items-center gap-x-2 rounded-md px-3 py-4 border-white/20 border max-w-[280px] w-full h-[40px]">
      <Search className="w-5 h-5 text-gray9" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="border-none outline-none bg-inherit text-white placeholder:text-gray9 w-full text-sm font-medium"
      />
    </div>
  );
};

export default InspirationFilter;
