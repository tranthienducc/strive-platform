"use client";
import { Brain, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/cms", label: "Site(s)", icon: Home },
  { href: "/ai", label: "AI(comming soon)", icon: Brain },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="lg:block border-r-white/15 border-r hidden h-full mt-5">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map(({ href, label, icon: Icon }, index: number) => (
              <div key={href}>
                <Link
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 transition-all text-gray-400 hover:text-gray-50",
                    {
                      "bg-white/30 text-gray-50":
                        pathname === href ||
                        (href !== "/cms" && pathname.startsWith(href)),
                    }
                  )}
                  href={href}
                >
                  <div className="border rounded-lg bg-black hover:border-gray-800 p-1">
                    <Icon className="size-3" />
                  </div>
                  {label}
                </Link>
                {index === 1 && (
                  <Separator className="my-[0.75rem] bg-white/15" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
