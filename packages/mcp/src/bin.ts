#!/usr/bin/env node
/**
 * `plyxui-mcp` CLI entry. For now this is a placeholder that prints the
 * tool surface so you can `npx plyxui-mcp` and confirm the shape without
 * needing the full MCP transport hooked up.
 *
 * Week 2: wire to @modelcontextprotocol/sdk stdio transport.
 */
import { TOOL_DESCRIPTIONS } from "./tools";

function main(): void {
  const args = process.argv.slice(2);
  if (args[0] === "tools" || args.length === 0) {
    for (const [name, desc] of Object.entries(TOOL_DESCRIPTIONS)) {
      console.log(`${name}\n  ${desc}\n`);
    }
    return;
  }
  console.error("usage: plyxui-mcp tools");
  process.exit(1);
}

main();
