"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BookA,
  BookCheck,
  Home,
  MoveLeft,
  Pen,
  Settings,
  Table,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SitesDashNav({ site_id }: { site_id: string }) {
  const pathname = usePathname();

  const navItems = [
    { href: `/cms/sites/${site_id}`, label: "My Site", icon: Home },
    {
      href: `/cms/sites/${site_id}/documents`,
      label: "My Documents",
      icon: BookCheck,
    },
    {
      href: `/cms/sites/${site_id}/publish`,
      label: "Publish Article",
      icon: BookA,
    },
    { href: `/cms/sites/${site_id}/author`, label: "Create Author", icon: Pen },
    {
      href: `/cms/sites/${site_id}/category`,
      label: "Create Category",
      icon: Table,
    },
    {
      href: `/cms/sites/${site_id}/settings`,
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="lg:block hidden border-r border-white/15 h-full mt-[60px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <div className="my-2 w-full">
              <Link href="/cms">
                <Button
                  size="sm"
                  className="font-normal text-sm bg-black border border-white/15"
                >
                  <MoveLeft className="mr-2 size-4" />
                  Back
                </Button>
              </Link>
            </div>

            {navItems.map(({ href, label, icon: Icon }, index: number) => (
              <div key={href}>
                <Link
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 transition-all text-gray-400 hover:text-gray-50",
                    {
                      "bg-white/30 text-gray-50":
                        pathname === href ||
                        (href !== `/cms/sites/${site_id}` &&
                          pathname.startsWith(href)),
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
}
