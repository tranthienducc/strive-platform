"use client";
import { sidebarLinks } from "@/config/routes/router";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationItem = () => {
  const pathname = usePathname();
  return (
    <>
      {sidebarLinks.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          className={cn(
            "flex flex-row gap-x-3 text-gray9 px-3 py-2 rounded-xl text-sm font-medium items-center",
            link.url === pathname
              ? "is-actived text-white outline-none border border-stone-800 duration-300 bg-[#bc4371]"
              : "hover:text-white duration-300 hover:bg-white/5"
          )}
        >
          {link.icon}
          <span className="lg:block hidden">{link.title}</span>
        </Link>
      ))}
    </>
  );
};

export default NavigationItem;
