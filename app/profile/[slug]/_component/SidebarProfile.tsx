"use client";
import { profileLinks } from "@/config/routes/router";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarProfile = () => {
  const pathname = usePathname();
  const { users } = useUserContext();

  return (
    <>
      <div className="mt-20 flex flex-col">
        <div className="flex flex-col gap-3 items-center justify-center mb-7">
          <Image
            src={users?.imageUrl || ""}
            alt="avatar"
            width={400}
            height={400}
            className="size-24 rounded-full object-cover"
          />
          <h2 className="text-base font-medium text-white">
            {users?.fullName}
          </h2>
          <Link
            href={`/profile/edit-profile/${users?.id}`}
            className="rounded-full bg-white px-4 py-2 text-base font-medium text-black"
          >
            Edit profile
          </Link>
        </div>
        <div className="flex flex-row gap-8 px-[72px] mb-7">
          {profileLinks.map((link) => {
            const fullPath = `/profile/${users?.id}/${link.url}`;
            return (
              <div key={link.url}>
                <Link
                  href={fullPath}
                  className={cn(
                    "text-gray9 px-3 py-2 rounded-xl text-sm font-medium",
                    pathname.includes(fullPath)
                      ? "is-actived text-white outline-none border border-stone-800 duration-300 bg-white/60"
                      : "hover:text-white duration-300 hover:bg-white/5"
                  )}
                >
                  <span>{link.title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SidebarProfile;
