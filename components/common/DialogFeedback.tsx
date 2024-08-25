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
import Image from "next/image";

const DialogFeedback = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full  size-10 flex items-center justify-center border border-white/15">
          <MessageCircle className="size-4 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[393px] lg:max-w-[500px] w-full h-[616px] rounded-[.75rem] bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-between mb-3">
            <h5 className="text-base font-medium text-black">Feedback</h5>
          </DialogTitle>
          <DialogDescription className="grid grid-cols-1 gap-3">
            <div className="flex flex-row items-start gap-2">
              <Image
                src="/assets/images/clients-avatar-1.png"
                alt="avatar-user"
                width={300}
                height={300}
                className="size-7 rounded-full object-cover"
              />
              <div className="flex-col flex gap-[6px]">
                <span className="text-sm font-bold text-black">Miskel</span>
                <div className="flex flex-col gap-0">
                  <p className="text-sm text-gray-500 font-normal">Awesome</p>
                  <span className="text-gray9 font-normal text-xs">
                    10 minutes
                  </span>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFeedback;
