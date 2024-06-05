"use client";
import { links } from "@/constants/data";
import { ArrowRight, UserRound, UserRoundX } from "lucide-react";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Spinner } from "../spinner";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const isAdmin = user?.organizationMemberships?.some(
    (data) => data.role === "org:admin"
  );

  return (
    <header className="px-[70px] py-[18px] border-b-gray-800 border z-[99999]">
      <div className="flex flex-row justify-between items-center">
        <Link className="flex flex-row items-center gap-x-2" href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={300}
            height={300}
            className="w-8 h-8"
          />
          <h1 className="text-lg font-semibold text-white">strive</h1>
        </Link>
        <nav className="flex flex-row items-center gap-x-2 text-white">
          {links.map((link, i) => (
            <div key={i}>
              <Link
                href={link.href}
                className="text-sm font-medium hover:bg-white/5  duration-300 px-4 py-2 rounded-lg"
              >
                {link.title}
              </Link>
            </div>
          ))}
          {isAdmin && (
            <Link
              href="/dashboard/manage"
              className="text-sm font-medium hover:bg-white/5 duration-300 px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link>
          )}
          {isLoading && <Spinner />}
          <div className="flex flex-row gap-x-4">
            {isAuthenticated && !isLoading && (
              <UserButton userProfileMode="modal" afterSignOutUrl="/" />
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

            <Link
              href="/access-pack"
              className="px-6 py-3  rounded-xl flex flex-row gap-x-2 items-center bg-white text-black"
            >
              <span className="text-sm font-medium">All-Access Pass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            {isAuthenticated}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
