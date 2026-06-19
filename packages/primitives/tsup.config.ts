import { defineConfig } from "tsup";

// @plyxui/primitives: top-level barrel (no .native barrel — every
// subpath has its own native variant). Each component gets its own
// dist entry so consumers can `import { Box } from "@plyxui/primitives/box"`.
export default defineConfig({
  entry: {
    "index":            "src/index.ts",
    "box":              "src/box/index.tsx",
    "box.native":       "src/box/index.native.tsx",
    "text":             "src/text/index.tsx",
    "text.native":      "src/text/index.native.tsx",
    "stack":            "src/stack/index.tsx",
    "stack.native":     "src/stack/index.native.tsx",
    "flex":             "src/flex/index.tsx",
    "flex.native":      "src/flex/index.native.tsx",
    "input":            "src/input/index.tsx",
    "input.native":     "src/input/index.native.tsx",
    "button":           "src/button/index.tsx",
    "button.native":    "src/button/index.native.tsx",
    "image":            "src/image/index.tsx",
    "image.native":     "src/image/index.native.tsx",
    "divider":          "src/divider/index.tsx",
    "divider.native":   "src/divider/index.native.tsx",
    "spinner":          "src/spinner/index.tsx",
    "spinner.native":   "src/spinner/index.native.tsx",
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
  external: ["react", "react-dom", "react-native", "@plyxui/core", "@plyxui/styles", "class-variance-authority"],
});
