import axios from "axios";

// Same-origin /v1 is proxied by Vite (dev/preview) and Vercel rewrites (production).
const apiBaseUrl = "/v1";

export const coreApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const interestApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
  },
});
