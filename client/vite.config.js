import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    target: "esnext", // smaller output
    minify: "esbuild", // faster minification
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "vendor-three";
          if (id.includes("node_modules/framer-motion")) return "vendor-framer";
          if (id.includes("node_modules/react-dom")) return "vendor-react";
          if (id.includes("node_modules/react-router-dom"))
            return "vendor-router";
        },
      },
    },
  },
});
