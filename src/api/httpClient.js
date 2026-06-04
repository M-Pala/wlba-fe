import axios from "axios";

const API_ORIGIN = "https://dev.api.woliba.io/v1";

function shouldUseLocalProxy() {
  if (import.meta.env.DEV) return true;
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

// Dev and `vite preview` on localhost use the Vite proxy (same origin) to avoid CORS.
const apiBaseUrl = shouldUseLocalProxy() ? "/v1" : API_ORIGIN;
const coreBaseUrl = apiBaseUrl;
// Staging host is unreachable from many networks; dev API serves the same endpoint.
const interestBaseUrl = apiBaseUrl;

export const coreApi = axios.create({
  baseURL: coreBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const interestApi = axios.create({
  baseURL: interestBaseUrl,
  headers: {
    Accept: "application/json",
  },
});
