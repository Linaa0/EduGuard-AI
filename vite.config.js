import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/docs": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/redoc": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/health": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react";
            }
            if (id.includes("lucide-react")) {
              return "lucide";
            }
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"],
  },
});
