import { defineConfig } from "tsup";

// @plyxui/layouts: top-level barrel + per-component subpaths,
// each with a .native variant.
export default defineConfig({
  entry: {
    "index":                 "src/index.ts",
    "index.native":          "src/index.native.ts",
    "AppShell":              "src/AppShell/index.tsx",
    "AppShell.native":       "src/AppShell/index.native.tsx",
    "Sidebar":               "src/Sidebar/index.tsx",
    "Sidebar.native":        "src/Sidebar/index.native.tsx",
    "ScreenContainer":        "src/ScreenContainer/index.tsx",
    "ScreenContainer.native": "src/ScreenContainer/index.native.tsx",
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
