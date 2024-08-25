import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FilterOptions } from "@/utils/types/type";

type DropdownFiltersType = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOptions[];
};

const DropdownFilters = ({
  value,
  onValueChange,
  placeholder,
  options,
}: DropdownFiltersType) => (
  <Select onValueChange={onValueChange} value={value}>
    <SelectTrigger className="w-[100px] h-[34px] bg-black22 rounded-[8px] border-none text-white">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-black22 text-white border-none w-[180px]">
      {options.map((option) => (
        <SelectItem value={option.value} key={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default DropdownFilters;
