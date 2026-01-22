import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const CSRF_STORAGE_KEY = "csrf_token";

type CsrfState = {
  token: string | null;
};

// Helper to get token from sessionStorage (for hydration)
function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(CSRF_STORAGE_KEY);
  } catch {
    return null;
  }
}

// Helper to persist token to sessionStorage
function persistToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      sessionStorage.setItem(CSRF_STORAGE_KEY, token);
    } else {
      sessionStorage.removeItem(CSRF_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

const initialState: CsrfState = {
  token: null, // Will be hydrated by component or login response
};

const csrfSlice = createSlice({
  name: "csrf",
  initialState,
  reducers: {
    setCsrfToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload ?? null;
      persistToken(state.token);
    },
    clearCsrfToken(state) {
      state.token = null;
      persistToken(null);
    },
    // Hydrate from sessionStorage (called on app mount)
    hydrateCsrfToken(state) {
      const storedToken = getStoredToken();
      if (storedToken) {
        state.token = storedToken;
      }
    },
  },
});

export const csrfActions = csrfSlice.actions;
export default csrfSlice.reducer;