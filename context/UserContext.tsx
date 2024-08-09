"use client";
import { ChildrenType } from "@/utils/types/type";
import { useUser } from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import { createContext, useContext } from "react";

type UserContextType = {
  user: UserResource | null;
};

const UserContext = createContext<UserContextType | null>(null);
export function UserProvider({ children }: ChildrenType) {
  const { user } = useUser();

  const value = {
    user: user || null,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
