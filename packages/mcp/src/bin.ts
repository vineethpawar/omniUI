#!/usr/bin/env node
/**
 * `plyxui-mcp` CLI entry. Two modes:
 *
 *   plyxui-mcp                ← default: stdio MCP server (the real thing)
 *   plyxui-mcp tools          ← print the tool surface and exit (smoke test)
 *
 * Claude Desktop / Cursor / Cline / Continue all speak MCP over stdio.
 * Point them at this binary in their config and they pick up the tools.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { handlers } from "./server";
import { TOOL_DESCRIPTIONS, type OmniMcpToolName } from "./tools";

// JSON Schemas for each tool's input. Hand-written rather than generated
// from the TS types so we get clean enums and descriptions that show up
// nicely in the host's UI. Schemas are loose where the tool tolerates
// missing properties — every input field is optional except where noted.
const INPUT_SCHEMAS: Record<OmniMcpToolName, object> = {
  plyxui_list_components: {
    type: "object",
    properties: {
      category: {
        type: "string",
        enum: ["primitives", "comps", "agent", "electron", "vscode"],
        description: "Filter to a single category. Omit for all.",
      },
    },
  },
  plyxui_get_component: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string", description: "Component name (e.g. Box, Modal, Tabs)." },
    },
  },
  plyxui_search: {
    type: "object",
    required: ["query"],
    properties: {
      query: { type: "string", description: "Free-text query." },
      limit: { type: "number", description: "Max results. Default 10." },
    },
  },
  plyxui_suggest: {
    type: "object",
    required: ["description"],
    properties: {
      description: { type: "string", description: "Natural-language description of what to build." },
      platform: { type: "string", enum: ["web", "native", "electron", "vscode"] },
    },
  },
  plyxui_install: {
    type: "object",
    required: ["name", "targetPath"],
    properties: {
      name: { type: "string" },
      targetPath: { type: "string", description: "Repo-relative directory of the consumer's project." },
      overwrite: { type: "boolean" },
    },
  },
  plyxui_get_tokens: {
    type: "object",
    properties: {
      theme: { type: "string", enum: ["light", "dark"] },
    },
  },
  plyxui_lint: {
    type: "object",
    required: ["code"],
    properties: {
      code: { type: "string", description: "TSX/JSX source to lint." },
      filename: { type: "string" },
    },
  },
  plyxui_examples: {
    type: "object",
    required: ["name"],
    properties: { name: { type: "string" } },
  },
};

function printToolList(): void {
  for (const [name, desc] of Object.entries(TOOL_DESCRIPTIONS)) {
    console.log(`${name}\n  ${desc}\n`);
  }
}

async function startServer(): Promise<void> {
  const server = new Server(
    { name: "@plyxui/mcp", version: "0.3.0" },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: (Object.keys(TOOL_DESCRIPTIONS) as OmniMcpToolName[]).map((name) => ({
      name,
      description: TOOL_DESCRIPTIONS[name],
      inputSchema: INPUT_SCHEMAS[name],
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const name = request.params.name as OmniMcpToolName;
    const handler = handlers[name];
    if (!handler) {
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }
    try {
      // The wire format wraps args in `arguments`; the handler validates
      // input shape internally so a wrong shape surfaces as a real error.
      const result = await handler((request.params.arguments ?? {}) as never);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: (err as Error).message }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  // The server runs until the parent closes stdin. Log to stderr because
  // stdout is the MCP transport channel — anything printed there gets
  // parsed as protocol frames.
  console.error("[plyxui-mcp] ready on stdio");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args[0] === "tools") {
    printToolList();
    return;
  }
  if (args[0] === "--help" || args[0] === "-h") {
    console.log(
      "Usage:\n" +
        "  plyxui-mcp           Run the MCP server on stdio (default).\n" +
        "  plyxui-mcp tools     Print the tool surface and exit.\n",
    );
    return;
  }
  await startServer();
}

main().catch((err) => {
  console.error("[plyxui-mcp] fatal:", err);
  process.exit(1);
});
