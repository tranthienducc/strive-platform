import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EmtyInspiration = () => {
  return (
    <div className="max-w-full w-full h-[370px] flex  flex-col border border-white/20 items-center  rounded-xl py-12 px-12">
      <div className="flex flex-col gap-y-2 mb-6 items-center text-center">
        <Image
          src="/assets/images/emty-img.png"
          alt="emty"
          width={1300}
          height={1300}
          className="max-w-[300px] w-full h-[150px] object-cover rounded-xl"
        />
        <h5 className="text-base font-medium text-white">
          Create your first inspiration
        </h5>
        <p className="text-sm font-normal text-gray9">
          Add your inspiration and information inspiration.
        </p>
      </div>

      <Link
        href="/dashboard/create"
        className="rounded-md bg-white px-3 py-3 flex flex-row gap-x-2 items-center"
      >
        <Plus className="w-4 h-4 text-black" />
        <span className="text-sm font-medium text-black">
          Create inspiration
        </span>
      </Link>
    </div>
  );
};

export default EmtyInspiration;
