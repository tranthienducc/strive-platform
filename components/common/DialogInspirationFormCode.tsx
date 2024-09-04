import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, TicketPercent } from "lucide-react";
import InspirationFormCode from "../form/InspirationFormCode";
import useDialogActions from "@/state/hooks/useDialogActions";

const DialogInspirationFormCode = () => {
  const { closeDialog, openDialog } = useDialogActions();

  return (
    <Dialog onOpenChange={openDialog}>
      <DialogTrigger className="lg:max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-black14 bg-inherit mb-12">
        <div className="flex flex-col gap-y-3">
          <div className="bg-white-ec px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
            <TicketPercent className="text-black w-5 h-5" strokeWidth={1.75} />
          </div>
          <span className="text-base font-medium text-white">
            New discounts code
          </span>
        </div>
        <Plus className="size-4 text-gray9" />
      </DialogTrigger>
      <DialogContent className="max-w-[393px] lg:max-w-[610px] w-full rounded-[.75rem] bg-black border border-white/15 max-h-fit">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1 mb-3">
            <span className="text-base font-bold text-white">
              Create discounts code inspirations
            </span>
            <span className="text-sm font-normal text-gray9">
              Name, Code, Amount , Expire-code
            </span>
          </DialogTitle>
          <DialogDescription>
            <InspirationFormCode setCloseDialog={closeDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInspirationFormCode;
