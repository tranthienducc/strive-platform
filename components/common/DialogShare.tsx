import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Download } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const DialogShare = () => {
  const link = `${window.location.href}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    toast.success("Copied");
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full  size-10 flex items-center justify-center border border-white/15">
          <Download className="size-4 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[393px] lg:max-w-[500px] w-full h-[530px] rounded-[.75rem] bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-11 items-center justify-center gap mb-8">
            <Image
              src="/assets/images/bento-img2.png"
              alt="avatar-user"
              width={500}
              height={500}
              loading="lazy"
              className="max-w-[360px] w-full h-[270px] rounded-xl"
            />
            <h5 className="text-2xl font-bold text-black">
              Share this with your friends or partner
            </h5>
          </DialogTitle>
          <DialogDescription>
            <span className="text-sm font-normal text-gray9 mb-4">
              Copy link hear
            </span>

            <div className="max-w-full w-full h-[58px] rounded-xl py-3 px-4 flex flex-row gap-x-3 bg-[#9e9ea7]">
              <input
                type="text"
                readOnly
                dir="ltr"
                className="max-w-[309.46px] w-full border-none outline-none text-[#000000]  bg-inherit text-ellipsis text-sm touch-manipulation"
                value={link}
              />
              <div
                role="button"
                className="h-[34px] max-w-[70px] w-full whitespace-nowrap text-white bg-black rounded-[10px] flex items-center justify-center flex-shrink-0"
                onClick={handleCopyLink}
              >
                <span>Copy</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogShare;
