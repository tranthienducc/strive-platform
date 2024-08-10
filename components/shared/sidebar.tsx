"use client";
import { ChevronLeft, Zap } from "lucide-react";
import NavigationList from "@/components/navigation/navigation-list";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="lg:fixed relative top-0 z-[999999] max-w-[270px] h-screen bg-[#111214] text-white pt-6 pb-6 border border-r-neutral-800 overflow-y-auto lg:overflow-hidden group/sidebar">
      <div
        role="button"
        className="absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
      >
        <ChevronLeft className="h-6 w-6 text-white rounded-sm hover:bg-neutral-400" />
      </div>

      <div className="flex flex-row gap-x-3 mb-12 px-6 items-center">
        <Image
          src="/assets/icons/logos.svg"
          alt="avatar"
          width={400}
          height={400}
          className="rounded-xl w-10 h-10"
        />
        <div className="flex flex-col gap-y-1">
          <h6 className="text-base font-medium text-white">Strive</h6>
          <p className="text-sm font-normal text-gray9">Template Platform</p>
        </div>
      </div>

      <NavigationList />
      <div className="px-6 pt-48">
        <div className="max-w-[220px] w-full h-[1px] bg-neutral-800 mb-8"></div>
        <Link
          href="/pricing"
          className="rounded-2xl px-3 flex flex-row gap-x-2 bg-[#cff110] items-center h-[55px] break-all mb-3"
        >
          <Zap className="w-6 h-6 text-black" />
          <div className="flex flex-col gap-y-[2px]">
            <span className="font-medium text-black text-sm">Active Super</span>
            <p className="text-xs font-normal text-black max-w-[170px] w-full">
              Unlock all features Strive
            </p>
          </div>
        </Link>

        <span className="font-medium text-xs text-gray9">Strive V1.01</span>
      </div>
    </aside>
  );
};

export default Sidebar;
