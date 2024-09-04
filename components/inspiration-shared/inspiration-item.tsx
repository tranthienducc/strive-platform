"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Key } from "react";
import { InspirationProps } from "@/utils/types/type";
import PopoverOptions from "../common/PopoverOptions";
import { multiPrice } from "@/utils";

const InspirationItem = (props: any) => {
  const { inspiration } = props;

  const deleted = useMutation(api.documents.deleted);
  const idDoc = inspiration?.map((item: { _id: any }) => item._id);

  if (!inspiration) {
    return (
      <div className="max-w-[400px] w-full">
        <Skeleton className="w-[400px] h-[180px] rounded-md mb-3" />

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-y-[2px]">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-5" />
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (id: Id<"documents">) => {
    if (idDoc && idDoc.length > 0) {
      const promise = deleted({
        id: id,
      });
      toast.promise(promise, {
        loading: "Is Deleting Template...",
        success: "Deleting successfully",
        error: "Failed to delete a template",
      });
    } else {
      console.error("idDoc is undefined or empty");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 pb-5 relative">
        {inspiration.lenght === 0 ? (
          <p className="text-base font-normal text-gray9 absolute top-[50%] left-[30%]">
            No inspiration available. Please create a new one.
          </p>
        ) : null}
        {inspiration?.map((item: InspirationProps, index: Key) => (
          <div
            className="min-w-[402px] border border-white/10 w-full rounded-2xl p-[15px] min-h-[400px]"
            key={index}
          >
            <Link
              href={`/inspiration/inpiration-detail/inspiration?slug=${item.slug}`}
            >
              <Image
                src={item.coverImage || "/assets/images/404-page.webp"}
                alt="avatar"
                width={1500}
                height={1500}
                priority={true}
                className="max-w-[400px] w-full h-[316px] object-cover mb-3 rounded-[12px]"
              />
            </Link>
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col gap-y-[2px]">
                <h3 className="text-white font-medium text-base whitespace-nowrap">
                  {item.title}
                </h3>
                <div className="flex flex-row items-end justify-between">
                  <span className="text-sm font-normal text-gray9">
                    {item.categories}
                  </span>

                  <span className="text-sm font-normal text-gray9">
                    {multiPrice(item.price as number)} VND
                  </span>
                  <span className="text-sm font-normal text-gray9">
                    {multiPrice(item.salePrice as number)} VND
                  </span>
                </div>
              </div>
              <PopoverOptions handleDelete={handleDelete} item={item} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InspirationItem;
