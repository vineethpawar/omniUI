import { defineConfig } from "tsup";

// @plyxui/mcp ships:
//   - dist/index.{js,cjs,d.ts}   public API (handlers, types, registry)
//   - dist/bin.cjs               the CLI entry. Node treats it as CJS via
//                                the shebang + .cjs extension.
//
// Single config, all entries in one pass. Bin gets a shebang banner.
// External: every plyxui sibling + the MCP SDK so we don't inline them.
export default defineConfig({
  entry: {
    index: "src/index.ts",
    server: "src/server.ts",
    tools: "src/tools.ts",
    registry: "src/registry.ts",
    bin: "src/bin.ts",
  },
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".js" : ".cjs" };
  },
  dts: { entry: ["src/index.ts", "src/server.ts", "src/tools.ts", "src/registry.ts"], compilerOptions: { incremental: false } },
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2020",
  external: ["@plyxui/core", "@modelcontextprotocol/sdk", "zod"],
  // No banner: src/bin.ts already has its own shebang, tsup preserves it.
});
