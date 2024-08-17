import { ChildrenType } from "@/utils/types/type";
import IconsCheck from "./icons/IconsCheck";

const Checkbox = ({ children }: ChildrenType) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <IconsCheck />
      <h4 className="text-base font-normal text-white whitespace-nowrap">
        {children}
      </h4>
    </div>
  );
};

export default Checkbox;
