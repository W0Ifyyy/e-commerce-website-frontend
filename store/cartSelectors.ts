import type { RootState } from "./store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.count, 0);
