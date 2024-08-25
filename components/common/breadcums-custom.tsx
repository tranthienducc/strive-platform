import { EllipsisVertical } from "lucide-react";
import Notification from "../noti/Notification";
import { cn } from "@/lib/utils";

type BreadcumsCustomType = {
  link: string;
  page: string;
  className?: string;
};
const BreadcumsCustom = ({ link, page, className }: BreadcumsCustomType) => {
  return (
    <div
      className={cn(
        "flex flex-row justify-between items-start mb-4",
        className
      )}
    >
      <div className="flex flex-row gap-x-2 mb-7">
        <p className="text-base font-medium text-gray9">{link}</p>
        <span className="text-gray9">/</span>
        <p className="text-base font-medium text-white">{page}</p>
      </div>
      <div className="flex flex-row gap-x-3 items-center">
        <Notification />
        <EllipsisVertical className="w-5 h-5 text-gray9" />
      </div>
    </div>
  );
};

export default BreadcumsCustom;
