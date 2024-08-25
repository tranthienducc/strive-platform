import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";

import { Url } from "next/dist/shared/lib/router/router";

const DialogPeekTemplate = ({ url }: { url: string | undefined }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full bg-black size-8 absolute top-[.875rem] right-[.625rem] flex items-center justify-center cursor-pointer duration-300 group-hover/sidebar:opacity-100 opacity-0">
          <Eye className="size-5 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[393px] lg:max-w-[1360px] w-full h-[700px] lg:h-[616px] rounded-[.75rem] bg-black11">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray9">Preview</p>
            <Link
              href={url as Url}
              className="text-sm font-medium text-white"
              target="_blank"
            >
              {url}
            </Link>
          </DialogTitle>
          <DialogDescription className="h-full w-full bg-white">
            <iframe
              src={url}
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
