/**
 * MCP server implementation. Each handler reads from the registry; no
 * stubs, no "TODO" branches. The transport is wired in `bin.ts` so
 * this module stays test-friendly — call handlers directly with input
 * objects without spinning up stdio.
 */
import { COMPONENTS, findComponent, searchComponents, summarize } from "./registry";
import { TOOL_DESCRIPTIONS, type OmniMcpToolName, type OmniMcpTools } from "./tools";

export type ToolHandlers = {
  [K in OmniMcpToolName]: (input: OmniMcpTools[K]["input"]) => Promise<OmniMcpTools[K]["output"]>;
};

export const handlers: ToolHandlers = {
  async plyxui_list_components({ category }) {
    return COMPONENTS
      .filter((entry) => !category || entry.category === category)
      .map(summarize);
  },

  async plyxui_get_component({ name }) {
    const entry = findComponent(name);
    if (!entry) {
      throw new Error(
        `Unknown component: ${name}. Use plyxui_list_components to see what's available.`,
      );
    }
    // Drop pkg/importPath from the wire response — they belong to the
    // install tool, not the documentation shape.
    const { pkg: _pkg, importPath: _ip, ...detail } = entry;
    void _pkg; void _ip;
    return detail;
  },

  async plyxui_search({ query, limit }) {
    return searchComponents(query, limit ?? 10).map(summarize);
  },

  async plyxui_suggest({ description, platform }) {
    // Same scoring as search, with an extra filter for platform mismatch.
    const matches = searchComponents(description, 20);
    const filtered = platform
      ? matches.filter((m) => m.platforms.includes(platform))
      : matches;
    return filtered.slice(0, 5).map(summarize);
  },

  async plyxui_install({ name }) {
    // plyxui packages ship pre-bundled dist — consumers npm-install the
    // package and import. This tool returns the install command + import
    // line for the agent to execute in the user's project.
    const entry = findComponent(name);
    if (!entry) {
      throw new Error(`Unknown component: ${name}.`);
    }
    return {
      installed: [entry.pkg],
      skipped: [],
      modifiedFiles: [
        // The agent runs these as commands / inserts these snippets;
        // we don't touch the user's filesystem from here.
        `RUN: npm install ${entry.pkg}`,
        `IMPORT: import { ${entry.name} } from "${entry.importPath}";`,
      ],
    };
  },

  async plyxui_get_tokens({ theme }) {
    // Resolve via @plyxui/core so brand augmentations registered at runtime
    // come through too. Defaults to dark to match ThemeProvider's default.
    const { resolveColors } = await import("@plyxui/core");
    return resolveColors(theme ?? "dark");
  },

  async plyxui_lint({ code }) {
    // Static checks — fast, no AST, just regexes that catch the
    // mistakes I've seen most in shipped apps. Real AST rules can
    // replace these without changing the wire shape.
    const diagnostics: OmniMcpTools["plyxui_lint"]["output"] = [];

    // Hardcoded hex inside JSX style props
    const hex = /style\s*=\s*\{[^}]*#[0-9a-fA-F]{3,8}/g;
    if (hex.test(code)) {
      diagnostics.push({
        rule: "no-hardcoded-colors",
        severity: "warn",
        message:
          "Hardcoded hex color in a style prop. Use useTheme().colors.<token> so light/dark switches work.",
        suggestion: "const { colors } = useTheme(); style={{ color: colors.text }}",
      });
    }

    // useTheme called but @plyxui/styles not imported
    if (/useTheme\(\)/.test(code) && !/from\s+["']@plyxui\/styles["']/.test(code)) {
      diagnostics.push({
        rule: "missing-theme-import",
        severity: "error",
        message: "useTheme() called without importing it from @plyxui/styles.",
        suggestion: 'import { useTheme } from "@plyxui/styles";',
      });
    }

    // Old import path from pre-rebrand
    const oldImport = /from\s+["']@omniui\//.exec(code);
    if (oldImport) {
      diagnostics.push({
        rule: "deprecated-scope",
        severity: "error",
        message:
          "@omniui/* is the old scope. Use @plyxui/* — same packages, rebranded.",
        suggestion: oldImport[0].replace("@omniui/", "@plyxui/"),
      });
    }

    return diagnostics;
  },

  async plyxui_examples({ name }) {
    const entry = findComponent(name);
    if (!entry) throw new Error(`Unknown component: ${name}.`);
    return entry.examples;
  },
};

export { TOOL_DESCRIPTIONS };
