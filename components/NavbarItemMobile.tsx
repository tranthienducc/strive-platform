"use client";
import { links } from "@/config/routes/router";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import Link from "next/link";
import React from "react";
import { Spinner } from "./spinner";
import { UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { UserResource } from "@clerk/types";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type NavbarItemMobileType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserResource | null | undefined;
  isAdmin: boolean | undefined;
};
const NavbarItemMobile = ({
  isAdmin,
  isLoading,
  user,
  isAuthenticated,
}: NavbarItemMobileType) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between flex-row max-w-full w-full">
        <Link className="flex flex-row items-center gap-x-2 pr-[33px]" href="/">
          <Image
            src="/assets/icons/logo.webp"
            alt="logo"
            width={300}
            height={300}
            loading="lazy"
            className="lg:size-8 size-5"
          />
          <h1 className="text-sm lg:text-lg font-semibold text-white">
            Strive
          </h1>
        </Link>

        <HamburgerMenuIcon className="lg:hidden block cursor-pointer text-white size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start gap-3 text-black max-w-[320px] w-full bg-white">
        <DropdownMenuItem className="flex flex-col gap-5">
          {links.map((link, i) => (
            <div key={i}>
              <Link
                href={link.href}
                className="text-sm font-medium hover:bg-white/5 duration-300 py-2 rounded-lg"
              >
                {link.title}
              </Link>
            </div>
          ))}

          {isAdmin && (
            <Link
              href="/dashboard/manage"
              className="text-sm font-medium hover:bg-white/5 duration-300 pl-3 py-2 rounded-lg"
            >
              Dashboard
            </Link>
          )}
          {isLoading && <Spinner />}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-row gap-x-4">
            {isAuthenticated && !isLoading && (
              <>
                <Link
                  href={`/profile/${user?.id}`}
                  className="text-sm font-medium hover:bg-white/5 duration-300 pl-3 py-2 rounded-lg"
                >
                  Profile
                </Link>
                <UserButton userProfileMode="modal" afterSignOutUrl="/" />
              </>
            )}
            {!isAuthenticated && !isLoading && (
              <SignInButton mode="modal">
                <button className="px-6 py-3 rounded-xl flex flex-row gap-x-2 items-center border border-gray-800 bg-gradient-conic">
                  <span className="text-sm font-medium text-white">
                    Sign In
                  </span>
                  <UserRound className="w-4 h-4 text-white" />
                </button>
              </SignInButton>
            )}
            {isAuthenticated}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarItemMobile;
