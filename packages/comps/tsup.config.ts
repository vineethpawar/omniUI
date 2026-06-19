import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "index":            "src/index.ts",
    "index.native":     "src/index.native.ts",
    "Modal":            "src/Modal/index.tsx",
    "Modal.native":     "src/Modal/index.native.tsx",
    "Dropdown":         "src/Dropdown/index.tsx",
    "Dropdown.native":  "src/Dropdown/index.native.tsx",
    "Tooltip":          "src/Tooltip/index.tsx",
    "Tooltip.native":   "src/Tooltip/index.native.tsx",
    "Tabs":             "src/Tabs/index.tsx",
    "Tabs.native":      "src/Tabs/index.native.tsx",
    "Toast":            "src/Toast/index.tsx",
    "Toast.native":     "src/Toast/index.native.tsx",
    "Drawer":           "src/Drawer/index.tsx",
    "Drawer.native":    "src/Drawer/index.native.tsx",
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
  external: ["react", "react-dom", "react-native", "@plyxui/core", "@plyxui/styles", "@plyxui/primitives", "@plyxui/icons", "@plyxui/hooks"],
});
