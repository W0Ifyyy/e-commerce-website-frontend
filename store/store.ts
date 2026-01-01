import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import csrfReducer from "./csrfSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    csrf: csrfReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
