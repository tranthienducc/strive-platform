import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FileText, Plus } from "lucide-react";
import InspirationForm from "../form/InspirationForm";
import { useState } from "react";

const DialogInspirationForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="lg:max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-black14 bg-inherit mb-12">
        <div className="flex flex-col gap-y-3">
          <div className="bg-white-ec px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
            <FileText className="text-black w-5 h-5" strokeWidth={1.75} />
          </div>
          <span className="text-base font-medium text-white">
            New inspiration product
          </span>
        </div>
        <Plus className="size-4 text-gray9" />
      </DialogTrigger>
      <DialogContent className="min-w-[393px] lg:min-w-[750px] w-full rounded-[.75rem] bg-black border border-white/15 min-h-[660px] h-full overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1 mb-3">
            <span className="text-base font-bold text-white">
              Create Inspiration
            </span>
            <span className="text-sm font-normal text-gray9">
              Title, Slug, Category and Image your inspiration
            </span>
          </DialogTitle>
          <DialogDescription>
            <InspirationForm setCloseDialog={setIsOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInspirationForm;
