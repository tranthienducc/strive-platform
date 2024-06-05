import { ChildrenType } from "@/utils/types/type";
import { Check } from "lucide-react";

const Checkbox = ({ children }: ChildrenType) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Check className="w-5 h-5 rounded-md border border-gray-800 text-white px-1 py-1" />
      <p className="text-sm font-normal text-[#999]">{children}</p>
    </div>
  );
};

export default Checkbox;
