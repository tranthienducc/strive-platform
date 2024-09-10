"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { reducer } from "@/helper/reducer";
import { useLikeStore } from "@/lib/zustand/store";
import { ACTION } from "@/utils/types/enum";
import { useMutation } from "convex/react";
import { ArrowUpRight, Eye, Heart } from "lucide-react";
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

const InspirationCard = ({ item }: InspirationCardType) => {
  const id = item?._id;
  const userId = item?.userId;
  const { liked, likedInspiration, removeLikeFromStore }: any = useLikeStore();
  const isLiked = liked[id];
  const { users } = useUserContext();
  const router = useRouter();
  const likeInspiration = useMutation(api.documents.likeInspiration);
  const unLikeInspiration = useMutation(api.documents.unikeInspiration);
  const watchInspiration = useMutation(api.documents.watchInspiration);

  const isNew = moment().diff(moment(item._creationTime), "hours") <= 24;

  const [state, dispatch] = useReducer(reducer, {
    watch: 0,
  });

  const handleLikeInspiration = (id: Id<"inspirations">) => {
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

  const handleUnLikeInspiration = (id: Id<"inspirations">) => {
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

  const handleWatchInspiration = (id: Id<"inspirations">) => {
    watchInspiration({
      id: id,
      watch: state.watch + 1,
    });

    dispatch({ type: ACTION.WATCH });
  };

  return (
    <Link
      href={`/inspiration/inpiration-detail/inspiration?slug=${item?.slug}`}
      onClick={() => handleWatchInspiration(item?._id)}
      className="max-w-[430px] w-full flex flex-col gap-3 mb-0 lg:mb-8 rounded-3xl bg-white px-4 pb-3 pt-4"
    >
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-black">
            {item.title}

            {isNew && (
              <sup className="text-sm text-blue-400 font-medium pl-3">New</sup>
            )}
          </h3>

          <div className="flex flex-row gap-x-2 items-center mt-3">
            <Image
              src="/assets/images/clients-avatar-1.webp"
              alt="avatar"
              width={300}
              height={300}
              loading="lazy"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-black">
              Tran Thien Duc
            </span>
          </div>
        </div>

        <Link
          href={`/inspiration/inpiration-detail/inspiration?slug=${item?.slug}`}
          className="rounded-full flex items-center justify-center bg-black size-12 flex-shrink-0"
        >
          <ArrowUpRight className="text-white size-6" />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2 mb-3">
        <span className="rounded-full bg-[#f1f1f1] text-black font-normal text-sm px-2 py-1">
          {item.categories}
        </span>
      </div>

      <div className="bg-black mask-overlay rounded-2xl">
        <Image
          src={item?.coverImage}
          alt="emty"
          width={1300}
          height={300}
          className="w-full h-[210px] object-cover rounded-2xl"
          priority={true}
        />

        <div className="absolute right-3 top-3">
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-row gap-x-1">
              {isLiked ? (
                <Heart
                  className="w-4 h-4 fill-red-500 text-white"
                  onClick={() => handleUnLikeInspiration(item?._id)}
                />
              ) : (
                <Heart
                  className="w-4 h-4 fill-transparent text-white"
                  onClick={() => handleLikeInspiration(item?._id)}
                />
              )}

              <span className="text-xs font-medium text-white">
                {item?.likedBy?.length || 0}
              </span>
            </div>
            <div className="flex flex-row gap-x-1">
              <Eye className="w-4 h-4  text-white" />
              <span className="text-xs font-medium text-white">
                {item?.watch || "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(InspirationCard);
