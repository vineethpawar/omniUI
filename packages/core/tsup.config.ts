import { defineConfig } from "tsup";

// @plyxui/core ships tokens, types, and shared hooks. Pure data, no
// JSX, no react-native imports — single barrel + three subpaths.
//
//   dist/index.{js,cjs,d.ts}     -> the top-level barrel
//   dist/tokens.{js,cjs,d.ts}    -> `@plyxui/core/tokens`
//   dist/types.{js,cjs,d.ts}     -> `@plyxui/core/types`
//   dist/hooks.{js,cjs,d.ts}     -> `@plyxui/core/hooks`
export default defineConfig({
  entry: {
    index: "src/index.ts",
    tokens: "src/tokens/index.ts",
    types: "src/types/index.ts",
    hooks: "src/hooks/index.ts",
  },
  format: ["esm", "cjs"],
  // package.json has `"type": "module"`, so .js is ESM, .cjs is CJS.
  outExtension({ format }) {
    return { js: format === "esm" ? ".js" : ".cjs" };
  },
  // Incremental compilation conflicts with tsup's single-file dts emit.
  // Override the base tsconfig's `incremental: true`.
  dts: { compilerOptions: { incremental: false } },
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2020",
});
