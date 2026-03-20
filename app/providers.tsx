"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { cartActions } from "@/store/cartSlice";
import { csrfActions } from "@/store/csrfSlice";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

interface ProvidersProps {
  children: React.ReactNode;
  csrfToken?: string;
}

export default function Providers({ children, csrfToken }: ProvidersProps) {
  useEffect(() => {
    // Hydrate cart from cookie
    store.dispatch(cartActions.hydrateFromCookie());

    // Use server-provided CSRF token if available, otherwise fetch fresh
    if (csrfToken) {
      store.dispatch(csrfActions.setCsrfToken(csrfToken));
    } else {
      async function refreshCsrfToken() {
        try {
          const response = await fetch(`${getApiBaseUrl()}/auth/csrf-token`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            if (data.csrfToken) {
              store.dispatch(csrfActions.setCsrfToken(data.csrfToken));
            }
          }
        } catch {
          // Silent failure - CSRF will be fetched on next request if needed
        }
      }

      refreshCsrfToken();
    }
  }, [csrfToken]);

  return <Provider store={store}>{children}</Provider>;
}
