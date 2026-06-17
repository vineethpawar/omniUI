import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Source-published packages mean Vite needs to transpile their .ts/.tsx
// files directly. The default optimizeDeps exclusion below stops Vite
// from trying to pre-bundle them as commonjs.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "@plyxui/core",
      "@plyxui/styles",
      "@plyxui/primitives",
      "@plyxui/icons",
      "@plyxui/hooks",
      "@plyxui/forms",
      "@plyxui/comps",
      "@plyxui/layouts",
    ],
  },
  esbuild: {
    loader: "tsx",
    include: /\.(ts|tsx)$/,
  },
  server: { host: true, port: 5173 },
});
