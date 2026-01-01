"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { cartActions } from "@/store/cartSlice";
import { csrfActions } from "@/store/csrfSlice";

export default function Providers({ children, csrfToken = null }: { children: React.ReactNode; csrfToken?: string | null }) {
  useEffect(() => {
    store.dispatch(cartActions.hydrateFromCookie());
  }, []);
  useEffect(() => {
    store.dispatch(csrfActions.setCsrfToken(csrfToken))
  }, [csrfToken])

  return <Provider store={store}>{children}</Provider>;
}
