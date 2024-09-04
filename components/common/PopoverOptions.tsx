import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Ellipsis, Trash } from "lucide-react";
import DialogUpdateInspiration from "./DialogUpdateInspiration";
import { InspirationProps } from "@/utils/types/type";
import { Id } from "@/convex/_generated/dataModel";

const PopoverOptions = ({
  item,
  handleDelete,
}: {
  item: InspirationProps;
  handleDelete: (_id: Id<"documents">) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis className="text-white size-4" />
      </PopoverTrigger>

      <PopoverContent className="bg-black border border-white/15 rounded-xl w-full">
        <div className="flex flex-col items-center gap-2">
          <DialogUpdateInspiration data={item} />
          <button
            className="flex flex-row items-center gap-2  w-full hover:bg-gray-600 px-2 py-0 rounded-md"
            onClick={() => handleDelete(item?._id)}
          >
            <Trash className="text-red-400 w-4 h-4" />
            <span className="text-red-400 text-sm font-medium">Delete</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverOptions;
