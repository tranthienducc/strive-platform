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
      <div className="grid grid-cols-1  lg:grid-cols-3 lg:col-span-2 gap-8 pb-5 relative col-span-1">
        {inspiration.length > 0 ? (
          inspiration?.map((item: any, index: Key) => (
            <div
              className="max-w-[500px] border border-white/10 w-full rounded-2xl p-[15px] h-[400px]"
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
                  loading="lazy"
                  className="max-w-[400px] w-full h-[316px] object-cover mb-3 rounded-[12px]"
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
                    className="bg-blue-500 hover:bg-blue-600 rounded-md px-1 py-1"
                  >
                    <Eraser className="text-white w-4 h-4" />
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 rounded-md px-1 py-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash className="text-white w-4 h-4" />
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
