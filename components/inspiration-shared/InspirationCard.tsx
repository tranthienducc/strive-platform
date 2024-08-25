"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { reducer } from "@/helper/reducer";
import { cn } from "@/lib/utils";
import { useLikeStore } from "@/lib/zustand/store";
import { useHovered } from "@/state/hooks/useHovered";
import { ACTION } from "@/utils/types/enum";
import { useMutation } from "convex/react";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo, useReducer } from "react";
import { toast } from "sonner";
import { useUserContext } from "@/context/UserContext";
import moment from "moment";

type InspirationCardType = {
  item: any;
};

const InspirationCard = memo(({ item }: InspirationCardType) => {
  const id = item?._id;
  const userId = item?.userId;
  const { liked, likedInspiration, removeLikeFromStore }: any = useLikeStore();
  const isLiked = liked[id];
  const { ref, isHovered } = useHovered();
  const router = useRouter();
  const { users } = useUserContext();
  const likeInspiration = useMutation(api.documents.likeInspiration);
  const unLikeInspiration = useMutation(api.documents.unikeInspiration);
  const watchInspiration = useMutation(api.documents.watchInspiration);

  const isNew = moment().diff(moment(item._creationTime), "hours") <= 24;

  const [state, dispatch] = useReducer(reducer, {
    watch: 0,
  });

  const handleLikeInspiration = (id: Id<"documents">) => {
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      const promise = likeInspiration({
        id: id,
        userId: userId,
      });

      toast.promise(promise, {
        loading: "Updating favorites...",
        success: "Love the successful article",
        error: "Favorites update failed",
      });
      likedInspiration(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLikeInspiration = (id: Id<"documents">) => {
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      const promise = unLikeInspiration({
        id: id,
        userId: userId,
      });

      toast.promise(promise, {
        loading: "Updating favorites...",
        success: "Unfavorited!",
        error: "Favorites update failed",
      });
      removeLikeFromStore(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchInspiration = (id: Id<"documents">) => {
    watchInspiration({
      id: id,
      watch: state.watch + 1,
    });

    dispatch({ type: ACTION.WATCH });
  };
  console.log("re-render");

  return (
    <div className="max-w-[385px] lg:max-w-[315px] w-full flex flex-col gap-y-3 mb-0 lg:mb-8">
      <Link
        href={`/inspiration/inpiration-detail/inspiration?slug=${item?.slug}`}
        onClick={() => handleWatchInspiration(item?._id)}
        className="relative group"
      >
        <Image
          src={item?.coverImage || "/assets/images/404-page.webp"}
          alt="emty"
          width={1300}
          height={300}
          className="w-full h-[236px] object-cover rounded-xl"
          priority={true}
        />
        <div
          ref={ref}
          className={cn(
            "absolute  h-[50px]  bg-gray-600  rounded-b-lg bottom-0 p-3 -left-0 w-full duration-300",
            isHovered ? "bg-opacity-20" : "bg-black/0 opacity-0"
          )}
        >
          <span className="text-white font-normal text-base line-clamp-1">
            {item.title}
          </span>
        </div>
      </Link>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-x-2 items-center">
          <Image
            src="/assets/images/clients-avatar-1.webp"
            alt="avatar"
            width={300}
            height={300}
            loading="lazy"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium text-white">Tran Thien Duc</span>
        </div>

        {isNew && (
          <span className="bg-blue-300 text-current px-2 py-1 rounded-xl">
            New
          </span>
        )}
        <div className="flex flex-row gap-x-2">
          <div className="flex flex-row gap-x-1">
            {isLiked ? (
              <Heart
                className="w-4 h-4 fill-red-500 text-white"
                onClick={() => handleUnLikeInspiration(item?._id)}
              />
            ) : (
              <Heart
                className="w-4 h-4 fill-black text-white"
                onClick={() => handleLikeInspiration(item?._id)}
              />
            )}

            <span className="text-xs font-medium text-gray9">
              {item?.likedBy?.length || 0}
            </span>
          </div>
          <div className="flex flex-row gap-x-1">
            <Eye className="w-4 h-4  text-white" />
            <span className="text-xs font-medium text-gray9">
              {item?.watch || "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

InspirationCard.displayName = "InspirationCard";

export default InspirationCard;
