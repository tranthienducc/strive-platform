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
import { Button } from "../ui/button";

const DialogPeekTemplate = ({ url }: { url: string | undefined }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-black absolute top-[2%] left-[57%] flex items-center justify-center cursor-pointer group-hover/peek:opacity-100 opacity-0">
          <Eye className="size-4 text-white" />
        </Button>
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
