import React from "react";
import { Skeleton } from "../ui/skeleton";

const CategoriesCardSkeleton = () => {
  return (
    <>
      <Skeleton className="max-w-[355px] w-full h-[260px] rounded-[8px]" />
    </>
  );
};

export default CategoriesCardSkeleton;
