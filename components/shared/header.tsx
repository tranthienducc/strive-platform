"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import NavbarItemMobile from "../NavbarItemMobile";
import NavbarItem from "./NavbarItem";
import useCheckIsMobile from "@/state/hooks/useCheckIsMobile";

const Header = () => {
  const isMobile = useCheckIsMobile();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const isAdmin = user?.organizationMemberships?.some(
    (data) => data.role === "org:admin"
  );

  return (
    <header className="py-3 px-[100px] fixed top-0 z-20 lg:backdrop-blur-[10px] w-full max-w-full flex items-center justify-between h-[80px]">
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
