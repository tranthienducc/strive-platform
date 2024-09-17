import { Eraser } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateInspirationForm from "../form/UpdateInspirationForm";
import { InspirationProps } from "@/utils/types/type";
import { useState } from "react";

type DialogUpdateInspirationProps = {
  data: InspirationProps;
};

const DialogUpdateInspiration = ({ data }: DialogUpdateInspirationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="flex flex-row items-center gap-2 hover:bg-gray-600">
          <Eraser className="text-white w-4 h-4" />
          <span className="text-white text-sm font-medium">Update</span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[393px] lg:min-w-[750px] w-full rounded-[.75rem] bg-black border border-white/15 min-h-[660px] h-full overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1 mb-3">
            <span className="text-base font-bold text-white">
              Update Inspiration
            </span>
            <span className="text-sm font-normal text-gray9">
              Title, Slug, Category and Image your inspiration
            </span>
          </DialogTitle>
          <DialogDescription>
            <UpdateInspirationForm data={data} setCloseDialog={setIsOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateInspiration;
