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
<<<<<<< HEAD
      "/api/v1": {
        target: "https://recruitify-bggp.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
=======
      "/api/v1": "https://recruitify-bggp.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""), // Corrected regex patter
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117
    },
  },
});
