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

export default api;
