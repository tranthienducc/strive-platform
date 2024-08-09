"use client";
import BreadcumsCustom from "@/components/breadcums-custom";
import InspirationItem from "@/components/inspiration-shared/inspiration-item";
import InspirationFilter from "@/components/InspirationFilter";
import { api } from "@/convex/_generated/api";
import { InspirationFilters } from "@/utils/types/type";
import { useQuery } from "convex/react";
import { EllipsisVertical, FileText, ListFilter, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const InspirationMangePage = () => {
  const [search, setSearch] = useState<InspirationFilters["search"]>("");
  const inspiration = useQuery(api.documents.getById, { search } as {});

  console.log("InspirationMangePage", search);
  console.log("inspiration", inspiration);

  let options: InspirationFilters["search"] = search;

  const filterInspiration = inspiration?.filter(
    (data) => data?.title === options?.search
  );
  console.log("filterInspartion", filterInspiration);

  return (
    <>
      <BreadcumsCustom title1="Inspiration" title2="Inspiration files" />
      <div className="grid grid-cols-4 col-span-1 gap-2 mb-12">
        <Link
          href="/dashboard/create"
          className="max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit"
        >
          <div className="flex flex-col gap-y-3">
            <div className="bg-[#ececee] px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
              <FileText className="text-black w-5 h-5" strokeWidth={1.75} />
            </div>
            <p className="text-base font-medium text-white">New inspiration</p>
          </div>
          <Plus className="w-4 h-4 text-gray9" />
        </Link>
      </div>

      <h2 className="text-lg mb-5 font-medium text-white">Recently modified</h2>
      <div className="grid grid-cols-3 col-span-3 gap-2 mb-12 ">
        <div className="max-w-[388px] w-full h-[70px] px-4 py-4 border border-white/10 rounded-xl flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit cursor-pointer">
          <div className="flex flex-row gap-x-3 items-center">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width={400}
              height={400}
              className="w-8 h-8 rounded-md"
            />
            <div className="flex flex-col gap-y-[2px]">
              <p className="text-sm font-normal text-white">New title</p>
              <span className="text-xs font-normal text-gray9">Discovery</span>
            </div>
          </div>
          <EllipsisVertical className="w-4 h-4 text-gray9" />
        </div>
        <div className="max-w-[388px] w-full h-[70px] px-4 py-4 border border-white/10 rounded-xl flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit">
          <div className="flex flex-row gap-x-3 items-center">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width={400}
              height={400}
              className="w-8 h-8 rounded-md"
            />
            <div className="flex flex-col gap-y-[2px]">
              <p className="text-sm font-normal text-white">New title</p>
              <span className="text-xs font-normal text-gray9">Discovery</span>
            </div>
          </div>
          <EllipsisVertical className="w-4 h-4 text-gray9" />
        </div>
        <div className="max-w-[388px] w-full h-[70px] px-4 py-4 border border-white/10 rounded-xl flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit">
          <div className="flex flex-row gap-x-3 items-center">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width={400}
              height={400}
              className="w-8 h-8 rounded-md"
            />
            <div className="flex flex-col gap-y-[2px]">
              <p className="text-sm font-normal text-white">New title</p>
              <span className="text-xs font-normal text-gray9">Discovery</span>
            </div>
          </div>
          <EllipsisVertical className="w-4 h-4 text-gray9" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-baseline mb-7">
        <h2 className="text-lg font-medium text-white mb-5">
          All inspirations
        </h2>
        <div className="flex flex-row items-center gap-x-2 max-w-[400px] w-full">
          <InspirationFilter
            onChange={(filters) => {
              setSearch(filters.search);
            }}
          />
          <div className="flex flex-row gap-x-2 items-center rounded-md px-3 py-4 border-white/20 border bg-white h-[40px]">
            <ListFilter className="w-5 h-5 text-black" />
            <p className="text-sm font-medium text-black">Filters</p>
          </div>
        </div>
      </div>

      <InspirationItem inspiration={inspiration} />
    </>
  );
};

export default InspirationMangePage;
