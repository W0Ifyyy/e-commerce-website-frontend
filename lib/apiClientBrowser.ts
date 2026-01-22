import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getApiBaseUrl } from "./apiBaseUrl";

// Storage key for CSRF token
const CSRF_TOKEN_KEY = "csrf_token";

// Helper to get CSRF token from sessionStorage
function getCsrfToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(CSRF_TOKEN_KEY);
  } catch {
    return null;
  }
}

// Helper to set CSRF token in sessionStorage
export function setCsrfToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      sessionStorage.setItem(CSRF_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(CSRF_TOKEN_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

// Helper to clear CSRF token
export function clearCsrfToken(): void {
  setCsrfToken(null);
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add CSRF token to unsafe methods
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const method = (config.method ?? "").toUpperCase();
  const isUnsafeMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (isUnsafeMethod) {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers.set("X-CSRF-Token", csrfToken);
    }
  }

  return config;
});

// Response interceptor to extract CSRF token from login/refresh responses
api.interceptors.response.use(
  (response) => {
    // Extract CSRF token from auth responses
    const csrfToken = response.data?.csrfToken || response.data?.csrf_token;
    if (csrfToken) {
      setCsrfToken(csrfToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If we get a 403 CSRF error and haven't retried yet, try to refresh the token
    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      (error.response?.data as { message?: string })?.message?.toLowerCase().includes("csrf")
    ) {
      originalRequest._retry = true;

      try {
        // Try to get a fresh CSRF token
        const tokenResponse = await axios.get(`${getApiBaseUrl()}/auth/csrf-token`, {
          withCredentials: true,
        });

        const newCsrfToken = tokenResponse.data?.csrfToken;
        if (newCsrfToken) {
          setCsrfToken(newCsrfToken);
          originalRequest.headers.set("X-CSRF-Token", newCsrfToken);
          return api(originalRequest);
        }
      } catch {
        // If CSRF refresh fails, propagate the original error
      }
    }

    return Promise.reject(error);
  }
);

export default api;
