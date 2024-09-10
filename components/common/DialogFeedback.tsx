import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MessageCircle } from "lucide-react";
import CommentForm from "../comment/CommentForm";
import { Id } from "@/convex/_generated/dataModel";

const DialogFeedback = ({
  _id,
  title,
  data,
}: {
  _id?: Id<"inspirations">;
  data: any;
  title?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full size-10 flex items-center justify-center border border-white/15 relative">
          <MessageCircle className="size-4 text-white" />
          <span className="text-white block absolute z-[1] -top-[6px] -right-[8px] text-xs font-medium min-w-5 py-0 px-1 rounded-full border border-white/15 shadow bg-black">
            {data?.length}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[393px] lg:max-w-[500px] w-full min-h-[670px] overflow-y-auto rounded-[.75rem] bg-black border border-white/15">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-between mb-3">
            <h5 className="text-base font-medium text-white">Feedback</h5>
          </DialogTitle>
          <DialogDescription className="space-y-0">
            <CommentForm _id={_id} title={title}></CommentForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFeedback;
