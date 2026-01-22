"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { cartActions } from "@/store/cartSlice";
import { csrfActions } from "@/store/csrfSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate cart from cookie
    store.dispatch(cartActions.hydrateFromCookie());
    // Hydrate CSRF token from sessionStorage
    store.dispatch(csrfActions.hydrateCsrfToken());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
