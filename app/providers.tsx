"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { cartActions } from "@/store/cartSlice";
import { csrfActions } from "@/store/csrfSlice";
import { setCsrfToken } from "@/lib/apiClientBrowser";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate cart from cookie
    store.dispatch(cartActions.hydrateFromCookie());

    // Always fetch a fresh CSRF token on page load/refresh
    // This ensures the token matches the current session state
    async function refreshCsrfToken() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/auth/csrf-token`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.csrfToken) {
            // Update both Redux store and sessionStorage
            store.dispatch(csrfActions.setCsrfToken(data.csrfToken));
            setCsrfToken(data.csrfToken);
          }
        }
      } catch {
        // If fetch fails, fall back to hydrating from storage
        store.dispatch(csrfActions.hydrateCsrfToken());
      }
    }

    refreshCsrfToken();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
