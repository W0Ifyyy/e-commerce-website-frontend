import type { RootState } from "./store";
export const selectCsrfToken = (state: RootState) => state.csrf.token