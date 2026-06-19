import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    AuthLayout: "src/AuthLayout/index.tsx",
    EmptyState: "src/EmptyState/index.tsx",
    ErrorScreen: "src/ErrorScreen/index.tsx",
  },
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".js" : ".cjs" };
  },
  dts: { compilerOptions: { incremental: false } },
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2020",
  external: ["react", "react-dom", "react-native", "@plyxui/core", "@plyxui/styles", "@plyxui/primitives", "@plyxui/icons"],
});
