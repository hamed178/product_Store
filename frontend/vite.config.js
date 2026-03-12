import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Recommended for most backends
        // Optional: log proxy activity
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {});
        },
      },
    },
  },
});
