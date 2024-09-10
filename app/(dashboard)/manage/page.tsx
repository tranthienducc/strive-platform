"use client";
import { Bell, CircleHelp } from "lucide-react";
import Image from "next/image";

import { useUserContext } from "@/context/UserContext";

const ManagePage = () => {
  const { users } = useUserContext();

  return (
    <div className="h-full pb-10">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-[1px]">
          <span className="text-xs lg:text-sm font-normal text-gray9">
            Welcome,
          </span>
          <p className="text-sm lg:text-base font-medium text-white">
            {users?.fullName}
          </p>
        </div>

        <div className="flex flex-row gap-x-6 items-center">
          <CircleHelp className="text-white w-5 h-5" />
          <Bell className="text-white w-5 h-5" />
        </div>
      </div>
      <div className="max-w-full w-full h-[1px] bg-neutral-800 mb-4 mt-4"></div>

      <div className="flex items-center justify-center pt-5">
        <Image
          src="/assets/images/dashboard-img.webp"
          alt="bg-dashboard"
          width={1300}
          priority={true}
          height={1300}
          className="max-w-[390px] lg:max-w-[864px] w-full h-[282px] object-cover rounded-xl mb-10"
        />
      </div>

      <h3 className="text-lg lg:text-2xl font-semibold text-white mb-3">
        All created templates
      </h3>
      <p className="text-sm font-normal text-gray9  max-w-[350px] lg:max-w-[700px] w-full mb-[46px]">
        Simplify user authentication and memberships without coding
        complexities. Discover tools that make managing user access and
        memberships a breeze.
      </p>
    </div>
  );
};

export default ManagePage;
