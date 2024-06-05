"use client";
import { sidebarLinks } from "@/constants/data";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import NavigationItem from "./navigation-item";

const NavigationList = () => {
  const pathname = usePathname();
  return (
    <nav className="px-6 flex flex-col gap-y-[29px]">
      {sidebarLinks.map((link) => {
        return (
          <NavigationItem key={link.url}>
            <Link
              href={link.url}
              className={twMerge(
                "flex flex-row gap-x-3  text-gray9 px-3 py-2 rounded-lg text-sm font-medium items-center",
                link.url === pathname
                  ? "is-actived text-[#cff110] outline-none border border-stone-800 duration-300 bg-[#2c2c2c]"
                  : "hover:text-white duration-300 hover:bg-white/5"
              )}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          </NavigationItem>
        );
      })}
    </nav>
  );
};

export default NavigationList;
