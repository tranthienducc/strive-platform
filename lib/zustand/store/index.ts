import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useLikeStore = create(
  persist(
    (set) => ({
      liked: {},
      likedInspiration: (idInspiration: string) =>
        set((state: any) => ({
          liked: { ...state.liked, [idInspiration]: true },
        })),
      removeLikeFromStore: (idInspiration: string) =>
        set((state: any) => {
          const newLiked = { ...state.liked };
          delete newLiked[idInspiration];
          return { liked: newLiked };
        }),
    }),
    {
      name: "liked-storage",
    }
  )
);
