/**
 * MCP tool surface for plyxui.
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
  plyxui_list_components: {
    input: { category?: ComponentSummary["category"] };
    output: ComponentSummary[];
  };
  plyxui_get_component: {
    input: { name: string };
    output: ComponentDetail;
  };
  plyxui_search: {
    input: { query: string; limit?: number };
    output: ComponentSummary[];
  };
  plyxui_suggest: {
    input: { description: string; platform?: ComponentSummary["platforms"][number] };
    output: ComponentSummary[];
  };
  plyxui_install: {
    input: { name: string; targetPath: string; overwrite?: boolean };
    output: InstallResult;
  };
  plyxui_get_tokens: {
    input: { theme?: "light" | "dark" };
    output: Record<string, string>;
  };
  plyxui_lint: {
    input: { code: string; filename?: string };
    output: LintDiagnostic[];
  };
  plyxui_examples: {
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
  plyxui_list_components:
    "List all available plyxui components, optionally filtered by category (primitives, comps, agent, electron, vscode).",
  plyxui_get_component:
    "Get the full prop table, examples, and source for a single component.",
  plyxui_search:
    "Search plyxui components by free-text query. Returns ranked summaries.",
  plyxui_suggest:
    "Given a description of what the user wants to build, suggest the most relevant plyxui components.",
  plyxui_install:
    "Install a component into the user's project at the given path. Copies source, updates imports, runs no other side effects.",
  plyxui_get_tokens:
    "Return the active design tokens (colors) for a given theme.",
  plyxui_lint:
    "Lint a code snippet for plyxui usage. Catches hardcoded colors, wrong props, missing required props, deprecated imports.",
  plyxui_examples:
    "Return runnable code examples for a given component.",
};
