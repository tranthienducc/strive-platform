"use client";
import InspirationCard from "@/components/inspiration-shared/InspirationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

const LikesSection = () => {
  const { users } = useUserContext();
  const userId = users?.id;
  const getLikeInspiration = useQuery(api.documents.getLikeInspirationById);
  const likedInspirations = getLikeInspiration?.filter((item) =>
    item?.likedBy?.includes(userId as string)
  );

  if (!likedInspirations) {
    return <Skeleton className="w-full h-[236px] object-cover rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-4 gap-12 relative">
      {likedInspirations?.length ? (
        likedInspirations?.map((item, index) => (
          <InspirationCard item={item} key={index} />
        ))
      ) : (
        <div className="flex items-center justify-center mt-[70px] mb-4 text-center flex-col absolute left-[19%]">
          <Image
            src="/assets/images/emty-img-likes-inspiration.webp"
            alt="emty-img"
            className="max-w-[510px] w-full h-[384px] mb-7"
            priority={true}
            width={1000}
            height={1000}
          />

          <div className="flex flex-col gap-y-5">
            <h3 className="text-2xl font-bold text-white">
              Express your appreciation
            </h3>
            <p className="text-sm font-normal text-gray9">
              Show your appreciation for other&apos;s work by liking the shots
              you love. We&apos;ll collect all of your likes here for you to
              revisit anytime.
            </p>
            <p className="text-sm font-normal text-gray9">
              When browsing, just hover over a shot and click the{" "}
              <span className="font-semibold text-white px-5 py-[10px] inline-flex gap-x-2 border border-white/15 items-center rounded-full">
                <Heart className="size-3 text-white" />
                Like
              </span>
              button.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikesSection;
