import BreadcumsCustom from "@/components/breadcums-custom";
import InspirationItem from "@/components/inspiration-shared/inspiration-item";
import {
  EllipsisVertical,
  FileText,
  Folder,
  Grid2X2,
  ListFilter,
  Plus,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const InspirationMangePage = () => {
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
        <div className="max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit cursor-pointer">
          <div className="flex flex-col gap-y-3">
            <div className="bg-[#ececee] px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
              <Grid2X2 className="text-black w-5 h-5" strokeWidth={1.75} />
            </div>
            <p className="text-base font-medium text-white">New speedsheet</p>
          </div>
          <div className="flex flex-col justify-between gap-y-5">
            <Plus className="w-4 h-4 text-gray9" />
            <span className="rounded-md p-1 bg-white text-black block text-sm font-medium">
              WIP
            </span>
          </div>
        </div>

        <div className="max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit cursor-pointer">
          <div className="flex flex-col gap-y-3">
            <div className="bg-[#ececee] px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
              <Folder className="text-black w-5 h-5" strokeWidth={1.75} />
            </div>
            <p className="text-base font-medium text-white">New project</p>
          </div>
          <div className="flex flex-col justify-between gap-y-5">
            <Plus className="w-4 h-4 text-gray9" />
            <span className="rounded-md p-1 bg-white text-black block text-sm font-medium">
              WIP
            </span>
          </div>
        </div>

        <div className="max-w-[283px] w-full h-[110px] border border-white/10 rounded-xl px-4 py-4 flex flex-row justify-between items-start hover:bg-[#141414] bg-inherit cursor-pointer">
          <div className="flex flex-col gap-y-3">
            <div className="bg-[#ececee] px-1 py-1 rounded-md w-8 h-8 flex items-center justify-center">
              <User className="text-black w-5 h-5" strokeWidth={1.75} />
            </div>
            <p className="text-base font-medium text-white">New team</p>
          </div>
          <div className="flex flex-col justify-between gap-y-5">
            <Plus className="w-4 h-4 text-gray9" />
            <span className="rounded-md p-1 bg-white text-black block text-sm font-medium">
              WIP
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-lg mb-5 font-medium text-white">Recently modified</h2>
      <div className="grid grid-cols-3 col-span-3 gap-2 mb-12">
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
          <div className="flex flex-row items-center gap-x-2 rounded-md px-3 py-4 border-white/20 border max-w-[280px] w-full h-[40px]">
            <Search className="w-5 h-5 text-gray9" />
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none bg-inherit text-white placeholder:text-gray9 w-full text-sm font-medium"
            />
          </div>
          <div className="flex flex-row gap-x-2 items-center rounded-md px-3 py-4 border-white/20 border bg-white h-[40px]">
            <ListFilter className="w-5 h-5 text-black" />
            <p className="text-sm font-medium text-black">Filters</p>
          </div>
        </div>
      </div>

      <InspirationItem />
    </>
  );
};

export default InspirationMangePage;
