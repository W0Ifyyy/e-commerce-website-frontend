import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const CSRF_STORAGE_KEY = "csrf_token";

type CsrfState = {
  token: string | null;
};

// Try to hydrate from sessionStorage on initialization
function getInitialToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(CSRF_STORAGE_KEY);
  } catch {
    return null;
  }
}

const initialState: CsrfState = {
  token: null, // Will be hydrated in the reducer or by component
};

const csrfSlice = createSlice({
  name: "csrf",
  initialState,
  reducers: {
    setCsrfToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload ?? null;
      // Persist to sessionStorage
      if (typeof window !== "undefined") {
        try {
          if (action.payload) {
            sessionStorage.setItem(CSRF_STORAGE_KEY, action.payload);
          } else {
            sessionStorage.removeItem(CSRF_STORAGE_KEY);
          }
        } catch {
          // Ignore storage errors
        }
      }
    },
    clearCsrfToken(state) {
      state.token = null;
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem(CSRF_STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
      }
    },
    // Hydrate from sessionStorage
    hydrateCsrfToken(state) {
      if (typeof window !== "undefined") {
        try {
          const storedToken = sessionStorage.getItem(CSRF_STORAGE_KEY);
          if (storedToken) {
            state.token = storedToken;
          }
        } catch {
          // Ignore storage errors
        }
      }
    },
  },
});

export const csrfActions = csrfSlice.actions;
export default csrfSlice.reducer;