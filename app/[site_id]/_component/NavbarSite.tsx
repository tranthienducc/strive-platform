import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavbarSite = ({
  title,
  logoPath,
  description,
}: {
  title?: string;
  logoPath: string;
  description?: string;
}) => {
  return (
    <div className="flex min-h-full justify-between p-2 border-b z-10">
      <Dialog>
        <SheetTrigger className="min-[825px]:hidden p-2 transition">
          <HamburgerMenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-3 mt-[1rem]">
            <DialogClose asChild>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Home
                </Button>
              </Link>
            </DialogClose>
          </div>
        </SheetContent>
      </Dialog>

      <NavigationMenu>
        <NavigationMenuList className="max-[825px]:hidden">
          <Link href="/" className="pl-2">
            {logoPath ? (
              <Image src={logoPath} width={40} height={40} alt="logo" />
            ) : (
              <p className="font-semibold text-white">{title}</p>
            )}
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarSite;
