/**
 * MCP server skeleton.
 *
 * Implementations are placeholders. Week 2 wires this to the real
 * `@modelcontextprotocol/sdk` server and ships the registry + lint engine.
 */
import { TOOL_DESCRIPTIONS, type OmniMcpToolName, type OmniMcpTools } from "./tools";

export type ToolHandlers = {
  [K in OmniMcpToolName]: (input: OmniMcpTools[K]["input"]) => Promise<OmniMcpTools[K]["output"]>;
};

export const handlers: ToolHandlers = {
  async omniui_list_components() {
    return [
      {
        name: "Box",
        category: "primitives",
        description: "Polymorphic layout primitive.",
        platforms: ["web", "native"],
      },
    ];
  },

  async omniui_get_component({ name }) {
    if (name !== "Box") {
      throw new Error(`Unknown component: ${name}`);
    }
    return {
      name: "Box",
      category: "primitives",
      description: "Polymorphic layout primitive. Web uses HTML element via `as`, native uses View.",
      platforms: ["web", "native"],
      props: [
        { name: "as", type: "ElementType", required: false, description: "HTML element to render (web only)." },
        { name: "surface", type: '"none" | "primary" | "raised" | "sunken"', required: false },
        { name: "padding", type: '"none" | "sm" | "md" | "lg"', required: false },
        { name: "radius", type: '"none" | "sm" | "md" | "lg" | "pill"', required: false },
      ],
      examples: [
        {
          title: "Basic",
          code: '<Box surface="raised" padding="md">Hello</Box>',
        },
      ],
      source: "packages/primitives/src/box/index.tsx",
      tokens: ["primaryFill", "surfaceFill", "containerFill"],
    };
  },

  async omniui_search({ query }) {
    const q = query.toLowerCase();
    if ("box layout container surface".includes(q)) {
      return [
        {
          name: "Box",
          category: "primitives",
          description: "Polymorphic layout primitive.",
          platforms: ["web", "native"],
        },
      ];
    }
    return [];
  },

  async omniui_suggest() {
    // TODO: replace with embeddings + simple BM25 fallback once we have more comps.
    return [];
  },

  async omniui_install() {
    // TODO: real install runs a registry fetch + writes files. Hooked up in week 2.
    return { installed: [], skipped: [], modifiedFiles: [] };
  },

  async omniui_get_tokens({ theme = "dark" }) {
    const { resolveColors } = await import("@omniui/core");
    return resolveColors(theme);
  },

  async omniui_lint() {
    // TODO: AST-based rules. Stub returns clean.
    return [];
  },

  async omniui_examples({ name }) {
    const detail = await handlers.omniui_get_component({ name });
    return detail.examples;
  },
};

export { TOOL_DESCRIPTIONS };
