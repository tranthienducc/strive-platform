"use client";
import { Header } from "@/components/shared";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { reducer } from "@/helper/reducer";
import { useEffect, useReducer, useState } from "react";
import { ACTION, TYPE } from "@/utils/types/enum";
import { useMutation, useQuery } from "convex/react";
import { ChevronDown, Eye, Heart, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import CategoriesFilter from "@/components/categories-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";

const InspirationPage = () => {
  const inspirations = useQuery(api.documents.getById);
  const heartUpdate = useMutation(api.documents.updateHeart);
  const watchInspiration = useMutation(api.documents.watchInspiration);
  const { user } = useUserContext();
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [filterInspiration, setFilterInspiration] = useState<any[]>([]);

  const filterLabel = (categories: string) => {
    if (filterWord.includes(categories)) {
      setFilterWord(filterWord?.filter((filter) => filter !== categories));
    } else {
      setFilterWord([...filterWord, categories]);
    }
  };

  useEffect(() => {
    if (filterWord.length > 0) {
      const filtered = inspirations?.filter((inspiration) => {
        return filterWord.every((fillters) =>
          inspiration.categories?.includes(fillters)
        );
      });
      setFilterInspiration(filtered || []);
    } else {
      setFilterInspiration(inspirations || []);
    }
  }, [filterWord, inspirations]);

  const idInspiration = inspirations?.map((item) => item._id);

  const [state, dispatch] = useReducer(reducer, {
    heart: 0,
    watch: 0,
  });

  const userIdInspiration = inspirations?.map((item) => item.userId);

  const handleHeartInspiration = (id: Id<"documents">) => {
    if (idInspiration && idInspiration.length > 0 && userIdInspiration) {
      const promise = heartUpdate({
        id: id,
        heart: state.isHeartActive ? state.heart - 1 : state.heart + 1,
      });

      toast.promise(promise, {
        loading: "Updating favorites...",
        success: state.isHeartActive
          ? "Unfavorited!"
          : "Love the successful article",
        error: "Favorites update failed",
      });

      dispatch({ type: TYPE.TOGGLE_HEART });
    }
  };

  const handleWatchInspiration = (id: Id<"documents">) => {
    watchInspiration({
      id: id,
      watch: state.watch + 1,
    });

    dispatch({ type: ACTION.WATCH });
  };

  return (
    <>
      <Header />
      <div className="max-w-full w-full mt-16 px-[72px]">
        <div className="flex flex-row justify-between items-center mb-8 mt-24">
          <button className="rounded-md border border-white/15 max-w-[115px] w-full h-[40px] px-4 py-3 flex flex-row items-center gap-x-4 bg-white">
            <span className="text-sm font-medium text-black">Popular</span>
            <ChevronDown className="text-black w-4 h-4" />
          </button>
          <CategoriesFilter filterLabel={filterLabel} filterWord={filterWord} />
          <button className="rounded-md border border-white/15 max-w-[115px] w-full h-[40px] px-4 py-3 flex flex-row items-center gap-x-2 bg-white">
            <ListFilter className="text-black w-4 h-4" />
            <span className="text-sm font-medium text-black">Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-9">
          {filterInspiration?.length ? (
            filterInspiration?.map((item, index) => (
              <>
                <div
                  className="max-w-[315px] w-full flex flex-col gap-y-3"
                  key={index}
                >
                  <Link
                    href={`/inspiration/inpiration-detail/inspiration?slug=${item.slug}`}
                    onClick={() => handleWatchInspiration(item._id)}
                  >
                    <Image
                      src={item.coverImage || "/assets/images/404-page.png"}
                      alt="emty"
                      width={1300}
                      height={300}
                      loading="lazy"
                      className="w-full h-[236px] object-cover rounded-xl"
                    />
                  </Link>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <Image
                        src={user?.imageUrl || "/assets/images/avatar.png"}
                        alt="avatar"
                        width={300}
                        height={300}
                        loading="lazy"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium text-white">
                        {user?.fullName}
                      </span>
                    </div>
                    <div className="flex flex-row gap-x-2">
                      <div className="flex flex-row gap-x-1">
                        <Heart
                          className={`w-4 h-4 ${state.isHeartActive ? "fill-red-400" : "fill-black"} text-white`}
                          onClick={() => handleHeartInspiration(item._id)}
                        />
                        <span className="text-xs font-medium text-gray9">
                          {item?.heart || 0}
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
              </>
            ))
          ) : (
            <div className="max-w-[315px] w-full flex flex-col gap-y-3">
              <Skeleton className="w-[315px] h-[236px] rounded-xl" />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-x-2 items-center">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="w-[51px] h-5" />
                </div>
                <div className="flex flex-row gap-x-2">
                  <div className="flex flex-row gap-x-1">
                    <Skeleton className="w-6 h-4" />
                  </div>
                  <div className="flex flex-row gap-x-1">
                    <Skeleton className="w-6 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InspirationPage;
