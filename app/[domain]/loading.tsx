import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col mt-4 justify-center items-center w-[90%]">
      <Skeleton className="w-full h-12 mb-4" />
      <Skeleton className="w-full h-6 mb-8" />
      <Skeleton className="w-full h-[556px] mb-10" />
      <Skeleton className="w-3/4 h-12 mb-4" />
      <Skeleton className="w-1/2 h-6 mb-8" />
    </div>
  );
}
