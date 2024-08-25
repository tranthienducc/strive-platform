import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const UserInfoSection = () => {
  return (
    <div className="px-[268px] flex flex-row items-start gap-12">
      <div className="max-w-[612px] w-full text-white flex flex-col gap-10 items-start">
        <div className="flex flex-col gap-3">
          <h5 className="text-base font-medium text-white">Biography</h5>
          <p className="font-normal text-sm text-gray9">This is bio</p>
        </div>
        <Separator className="bg-white/15" />
      </div>
      <div className="max-w-[348px] w-full text-white flex flex-col gap-10">
        <div className="flex flex-row gap-[30px]">
          <Link
            href="https://wwww.facebook.com/"
            target="_blank"
            rel="nonoreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400 duration-300"
          >
            Facebook
          </Link>
          <Link
            href="https://wwww.threads.com/"
            target="_blank"
            rel="nonoreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white"
          >
            Threads
          </Link>
          <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">
            Copy
          </button>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default UserInfoSection;
