import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/apiv1": {
        target: "https://recruitify-bggp.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/v1, ""),
      },
    },
  },
});
