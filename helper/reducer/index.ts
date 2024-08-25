import { ACTION } from "@/utils/types/enum";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
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
