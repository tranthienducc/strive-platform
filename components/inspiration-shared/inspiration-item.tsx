"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Eraser, Trash } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Key } from "react";

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
      <div className="grid grid-cols-3 col-span-2 gap-8 pb-5 relative">
        {inspiration.length > 0 ? (
          inspiration?.map((item: any, index: Key) => (
            <div className="max-w-[400px] w-full" key={index}>
              <Link
                href={`/inspiration/inpiration-detail/inspiration?slug=${item.slug}`}
              >
                <Image
                  src={item.coverImage || "/assets/images/404-page.png"}
                  alt="avatar"
                  width={1500}
                  height={1500}
                  className="max-w-[400px] w-full h-[180px] object-cover mb-3 rounded-md"
                />
              </Link>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-y-[2px]">
                  <h3 className="text-white font-medium text-base">
                    {item.title}
                  </h3>
                  <span className="text-sm font-normal text-gray9">
                    {item.categories}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <Link
                    href={`/dashboard/update/${item._id}`}
                    className="bg-blue-200 rounded-md px-1 py-1"
                  >
                    <Eraser className="text-black w-4 h-4" />
                  </Link>
                  <button
                    className="bg-red-300 rounded-md px-1 py-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash className="text-black w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-base font-normal text-gray9 absolute top-[50%] left-[30%]">
            No inspiration available. Please create a new one.
          </p>
        )}
      </div>
    </>
  );
};

export default InspirationItem;
