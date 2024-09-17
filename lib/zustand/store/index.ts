import { create, StateCreator } from "zustand";

import { persist } from "zustand/middleware";

interface PublishState {
  publishedArticles: Record<string, boolean>;
  setPublishStatus: (articleId: string, isPublished: boolean) => void;
}

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
const useTogglePublishStore: StateCreator<PublishState> = (set) => ({
  publishedArticles: {},
  setPublishStatus: (articleId: string, isPublished: boolean) =>
    set((state) => ({
      publishedArticles: {
        ...state.publishedArticles,
        [articleId]: isPublished,
      },
    })),
});

export const useTogglePublish = create<PublishState>()(
  persist(useTogglePublishStore, {
    name: "publish-storage",
  })
);
