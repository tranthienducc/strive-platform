import { categoriesInspiration } from "@/constants/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DropdownCategory = {
  onValuesChange: (value: string) => void;
  values: string | undefined;
};

const DropdownCategories = ({ onValuesChange, values }: DropdownCategory) => {
  return (
    <div>
      <Select onValueChange={onValuesChange} value={values}>
        <SelectTrigger className="max-w-full w-full h-[50px] bg-black border border-white/15 rounded-[8px] text-white">
          <SelectValue placeholder="Dicover" />
        </SelectTrigger>
        <SelectContent className="bg-[#222] text-white border-none w-[180px]">
          {categoriesInspiration.map((data, index) => (
            <SelectItem value={data} key={index}>
              {data}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownCategories;
