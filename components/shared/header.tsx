"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import NavbarItemMobile from "../NavbarItemMobile";
import useCheckIsMobile from "@/state/hooks/useCheckIsMobile";
import NavbarItem from "./NavbarItem";

const Header = () => {
  const isMobile = useCheckIsMobile();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const isAdmin = user?.organizationMemberships?.some(
    (data) => data.role === "org:admin"
  );

  return (
    <header className="py-3 rounded-3xl mt-3 px-2 lg:px-6 lg:border-white/15 fixed top-0 lg:border z-20 lg:backdrop-blur-[10px] lg:bg-black0d flex lg:items-center items-start lg:justify-center lg:left-[30%] lg:max-w-[654.11px] w-full max-w-full justify-between">
      {isMobile ? (
        <NavbarItemMobile
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          user={user}
        />
      ) : (
        <NavbarItem
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          user={user}
        />
      )}
    </header>
  );
};

export default Header;
