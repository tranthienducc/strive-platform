"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { links } from "@/config/routes/router";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Spinner } from "../spinner";
import { UserRound } from "lucide-react";
import NavbarItemMobile from "../NavbarItemMobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const isAdmin = user?.organizationMemberships?.some(
    (data) => data.role === "org:admin"
  );

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="py-3 rounded-3xl mt-3 px-2 lg:px-6 lg:border-white/15 fixed top-0 lg:border z-20 lg:backdrop-blur-[10px] lg:bg-black0d flex lg:items-center items-start lg:justify-center lg:left-[30%] lg:max-w-[654.11px] w-full max-w-[350px]">
      <div className="flex flex-row justify-between items-center  lg:max-w-full w-full max-w-[350px]">
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

        <div className="hidden lg:flex">
          <nav className="flex flex-col lg:flex-row items-center gap-3 text-black lg:text-white">
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
          </nav>
        </div>

        {isMenuOpen && (
          <div className="block lg:hidden bg-white rounded-2xl">
            <NavbarItemMobile
              toggleMenu={toggleMenu}
              isAdmin={isAdmin}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              user={user}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
