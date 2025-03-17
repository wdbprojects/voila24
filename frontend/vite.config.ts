import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
//import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "http://localhost:5000/",
    },
  },
  plugins: [/* checker({ typescript: false }),  */ react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
