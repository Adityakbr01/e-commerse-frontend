import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "swiper/react": "swiper/react/swiper-react.js",
    },
  },
  build: {
    outDir: "dist", // Default output directory
    rollupOptions: {
      // external: ["react-toastify"],
    },
  },
});
