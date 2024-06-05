import { Bell, EllipsisVertical } from "lucide-react";

type BreadcumsCustomType = {
  title1: string;
  title2: string;
};
const BreadcumsCustom = ({ title1, title2 }: BreadcumsCustomType) => {
  return (
    <div className="flex flex-row justify-between items-start mb-4">
      <div className="flex flex-row gap-x-2 mb-7">
        <p className="text-base font-medium text-gray9">{title1}</p>
        <span className="text-gray9">/</span>
        <p className="text-base font-medium text-white">{title2}</p>
      </div>
      <div className="flex flex-row gap-x-3 items-center">
        <Bell className="w-4 h-4 text-gray9" />
        <EllipsisVertical className="w-4 h-4 text-gray9" />
      </div>
    </div>
  );
};

export default BreadcumsCustom;
