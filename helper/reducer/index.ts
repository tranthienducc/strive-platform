import { ACTION, TYPE } from "@/utils/types/enum";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case TYPE.TOGGLE_HEART:
      const newHeart = state.heart - 1 || state.heart + 1;
      return {
        ...state,
        heart: newHeart,
      };
    case ACTION.WATCH:
      const newWatch = state.watch + 1;
      return {
        ...state,
        watch: newWatch,
      };

    default:
      return state;
  }
};
