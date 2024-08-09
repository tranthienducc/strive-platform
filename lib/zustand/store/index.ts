import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useLikeStore = create(
  persist(
    (set) => ({
      liked: {},
      heartUpdated: (idInspiration: string) =>
        set((state: any) => ({
          liked: { ...state.liked, [idInspiration]: true },
        })),
    }),
    {
      name: "liked-storage",
    }
  )
);
