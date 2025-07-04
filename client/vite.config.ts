import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  eslint: {
    enabled: false,
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: true,
    compress: false,
    proxy: {
      "/xkx": {
        target: "http://123.57.91.8:1126",
        // target: "http://localhost:1126",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/\/xkx/, "");
        },
      },
    },
  },
});
