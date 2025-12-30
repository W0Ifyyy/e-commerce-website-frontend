"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { cartActions } from "@/store/cartSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(cartActions.hydrateFromCookie());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
