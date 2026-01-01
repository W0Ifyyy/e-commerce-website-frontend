import axios from "axios";
import { getApiBaseUrl } from "./apiBaseUrl";

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    
  },
});

export default api;
