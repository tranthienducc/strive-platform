"use client";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useHovered } from "@/state/hooks/useHovered";

const DialogPeekTemplate = () => {
  const { ref, isHovered } = useHovered();

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div
          ref={ref}
          className={cn(
            "rounded-full bg-black size-8 absolute top-[.875rem] right-[.625rem] flex items-center justify-center cursor-pointer duration-300",
            isHovered ? "opacity-100" : "bg-black/0 opacity-0"
          )}
        >
          <Eye className="size-5 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[1360px] w-full h-[616px] rounded-[.75rem] bg-[#111111]">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray9">Preview</p>
            <Link
              href="https://thienducdev.vercel.app"
              className="text-sm font-medium text-white"
              target="_blank"
            >
              {"https://thienducdev.vercel.app"}
            </Link>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            <iframe
              src="https://thienducdev.vercel.app"
              title="map"
              className="rounded-xl w-full h-full"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPeekTemplate;
