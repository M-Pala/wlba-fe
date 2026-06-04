import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiProxy = {
  "/v1": {
    target: "https://dev.api.woliba.io",
    changeOrigin: true,
    secure: true,
  },
  "/staging-v1": {
    target: "https://dev.api.woliba.io",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/staging-v1/, "/v1"),
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
});
