import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="mt-20 px-5 lg:px-[180px] pb-10">
      <Skeleton className="w-full max-w-full mb-6" />
      <Skeleton className="w-full max-w-full mb-6" />
      <div className="flex flex-row items-start gap-10">
        <Skeleton className="w-full h-[500px] rounded-lg object-cover mb-14" />
        <Skeleton className="max-w-[400px] w-full rounded-md" />
      </div>
    </div>
  );
}
