import { ChildrenType } from "@/utils/types/type";
import { Check } from "lucide-react";

const Checkbox = ({ children }: ChildrenType) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Check className="w-5 h-5 rounded-md border border-black/10 text-[#28334d] px-1 py-1" />
      <p className="text-sm font-medium text-[#28334d]">{children}</p>
    </div>
  );
};

export default Checkbox;
