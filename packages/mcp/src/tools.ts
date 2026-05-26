/**
 * MCP tool surface for omniUI.
 *
 * Tool signatures only for now. Implementations land in week 2. The shape
 * here is the contract any MCP-aware client (Claude Desktop, Claude Code,
 * Cursor, Cline, Continue) will talk to.
 *
 * Versioning rule: changing any of these signatures is a breaking change
 * for downstream agents. Treat this as a public API from day one.
 */

export interface ComponentSummary {
  name: string;
  category: "primitives" | "comps" | "agent" | "electron" | "vscode";
  description: string;
  platforms: Array<"web" | "native" | "electron" | "vscode">;
}

export interface ComponentDetail extends ComponentSummary {
  props: Array<{ name: string; type: string; required: boolean; description?: string }>;
  examples: Array<{ title: string; code: string }>;
  source: string;
  tokens: string[];
}

export interface LintDiagnostic {
  rule: string;
  severity: "error" | "warn";
  message: string;
  line?: number;
  column?: number;
  suggestion?: string;
}

export interface InstallResult {
  installed: string[];
  skipped: string[];
  modifiedFiles: string[];
}

/**
 * Tool registry. Each entry maps an MCP tool name to its input/output shape
 * so we can keep the wire format and runtime in sync without runtime checks.
 */
export interface OmniMcpTools {
  omniui_list_components: {
    input: { category?: ComponentSummary["category"] };
    output: ComponentSummary[];
  };
  omniui_get_component: {
    input: { name: string };
    output: ComponentDetail;
  };
  omniui_search: {
    input: { query: string; limit?: number };
    output: ComponentSummary[];
  };
  omniui_suggest: {
    input: { description: string; platform?: ComponentSummary["platforms"][number] };
    output: ComponentSummary[];
  };
  omniui_install: {
    input: { name: string; targetPath: string; overwrite?: boolean };
    output: InstallResult;
  };
  omniui_get_tokens: {
    input: { theme?: "light" | "dark" };
    output: Record<string, string>;
  };
  omniui_lint: {
    input: { code: string; filename?: string };
    output: LintDiagnostic[];
  };
  omniui_examples: {
    input: { name: string };
    output: Array<{ title: string; code: string }>;
  };
}

export type OmniMcpToolName = keyof OmniMcpTools;

/**
 * Human-readable descriptions surfaced to agents. The Claude / Cursor UI
 * shows these when the user picks which tool to invoke.
 */
export const TOOL_DESCRIPTIONS: Record<OmniMcpToolName, string> = {
  omniui_list_components:
    "List all available omniUI components, optionally filtered by category (primitives, comps, agent, electron, vscode).",
  omniui_get_component:
    "Get the full prop table, examples, and source for a single component.",
  omniui_search:
    "Search omniUI components by free-text query. Returns ranked summaries.",
  omniui_suggest:
    "Given a description of what the user wants to build, suggest the most relevant omniUI components.",
  omniui_install:
    "Install a component into the user's project at the given path. Copies source, updates imports, runs no other side effects.",
  omniui_get_tokens:
    "Return the active design tokens (colors) for a given theme.",
  omniui_lint:
    "Lint a code snippet for omniUI usage. Catches hardcoded colors, wrong props, missing required props, deprecated imports.",
  omniui_examples:
    "Return runnable code examples for a given component.",
};
