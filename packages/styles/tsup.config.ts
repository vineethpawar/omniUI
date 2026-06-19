import { defineConfig } from "tsup";

// @plyxui/styles has a web and a native barrel.
// Metro picks the .native build via the `react-native` exports condition.
export default defineConfig({
  entry: {
    index: "src/index.tsx",
    "index.native": "src/index.native.tsx",
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
  external: ["react", "react-dom", "react-native", "@plyxui/core"],
});
