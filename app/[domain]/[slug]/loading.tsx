import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <article className="container relative max-w-full w-full py-6 lg:py-10">
      <div className="mb-10 px-[253px]">
        <div className="text-center items-center">
          <Skeleton className="w-32 h-4 mx-auto mb-4" />
          <Skeleton className="w-3/4 h-12 mx-auto mb-6" />
          <Skeleton className="w-1/2 h-6 mx-auto mb-8" />
          <Skeleton className="w-full h-[600px] rounded-2xl mb-10" />
        </div>
        <div className="mt-20">
          <Skeleton className="w-full h-40" />
        </div>
      </div>
    </article>
  );
}
