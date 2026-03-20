import axios from "axios";
import { getApiBaseUrl } from "./apiBaseUrl";

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const found = cookies.find((c) => c.startsWith(`${name}=`));
  if (!found) return null;
  return decodeURIComponent(found.substring(name.length + 1));
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const method = (config.method ?? "get").toUpperCase();
  const isUnsafe = method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
  if (!isUnsafe) return config;

  const token = getCookieValue("csrf_token_value");
  if (!token) return config;

  config.headers = config.headers ?? {};
  if (config.headers["X-CSRF-Token"] || config.headers["x-csrf-token"]) return config;

  config.headers["X-CSRF-Token"] = token;
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise<void>((resolve) => {
          refreshQueue.push(resolve);
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh", {});
        isRefreshing = false;
        refreshQueue.forEach((cb) => cb());
        refreshQueue = [];

        // Pick up the new CSRF token issued alongside the new access token
        const newCsrfToken = getCookieValue("csrf_token_value");
        if (newCsrfToken) {
          originalRequest.headers["X-CSRF-Token"] = newCsrfToken;
        }

        return api(originalRequest);
      } catch {
        isRefreshing = false;
        refreshQueue = [];
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
