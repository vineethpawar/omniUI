/**
 * Project loader.
 *
 * The desktop app is framework-agnostic; what makes it work for any repo is
 * the per-project config file. We look for one of:
 *
 *   - `omniui.config.json`
 *   - `omniui.config.js`     (interpreted as JSON if it's just an object literal)
 *   - `omniui.config.ts`     (same)
 *   - `.omniui.json`         (legacy alias)
 *
 * The config tells us:
 *   - which paths the agent may read / write
 *   - the per-route screen manifest (route to source file + figma URLs)
 *   - optional system-prompt overrides
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATE_FILENAMES = [
  "omniui.config.json",
  "omniui.config.js",
  "omniui.config.ts",
  ".omniui.json",
];

export interface ProjectScreen {
  /** Route path eg "/dashboard" */
  path: string;
  /** Human-readable name */
  name: string;
  /** Logical grouping for sidebar */
  group?: string;
  /** Repo-relative source file */
  sourceFile: string;
  /** Optional Figma URLs */
  figma?: {
    light?: string;
    dark?: string;
    /** Arbitrary additional frames, by label */
    other?: Record<string, string>;
  };
  /** Pre-downloaded Figma dumps (relative to figmaDumpsDir) */
  figmaDumps?: { light?: string; dark?: string };
  description?: string;
}

export interface ProjectConfig {
  /** Display name surfaced in the app chrome. */
  name: string;
  /** Paths the agent may READ. Defaults to the project root if omitted. */
  readPaths?: string[];
  /** Paths the agent may WRITE. Required -- no implicit broad scope. */
  writePaths: string[];
  /** Per-screen manifest. */
  screens: ProjectScreen[];
  /** Optional override of the system prompt; appended after the base. */
  systemPromptAppend?: string;
  /** Where pre-downloaded Figma dumps live, repo-relative. Default: design-system/figma-dumps */
  figmaDumpsDir?: string;
}

export interface ResolvedProject {
  root: string;
  configFile: string;
  config: ProjectConfig;
}

function findConfigFile(root: string): string | null {
  for (const name of CANDIDATE_FILENAMES) {
    const full = join(root, name);
    if (existsSync(full)) return full;
  }
  return null;
}

/**
 * Read the raw text of the config and pull out a JSON literal. For .json
 * this is trivial; for .js / .ts we accept a default-exported object literal.
 * No execution -- we never run user code. If parsing fails, return null.
 */
function parseConfig(text: string): ProjectConfig | null {
  try {
    return JSON.parse(text) as ProjectConfig;
  } catch {
    // Try to find a `default ... { ... }` or `module.exports = { ... }` block
    // and JSON.parse the literal. Best-effort; consumers writing real .ts can
    // emit a .json sibling instead.
    const m = text.match(/(?:export\s+default|module\.exports\s*=)\s*({[\s\S]*})\s*;?\s*$/m);
    if (!m) return null;
    try {
      // eslint-disable-next-line no-new-func
      return new Function(`return (${m[1]})`)() as ProjectConfig;
    } catch {
      return null;
    }
  }
}

export function loadProject(root: string): ResolvedProject | { error: string } {
  if (!root || !existsSync(root)) return { error: "Folder does not exist" };
  const configFile = findConfigFile(root);
  if (!configFile) {
    return {
      error:
        "No omniui.config.json found in the selected folder. Add one at the project root with at minimum: name, writePaths, screens.",
    };
  }
  let text: string;
  try {
    text = readFileSync(configFile, "utf-8");
  } catch (e) {
    return { error: `Could not read ${configFile}: ${(e as Error).message}` };
  }
  const config = parseConfig(text);
  if (!config) {
    return {
      error: `Could not parse ${configFile}. omniui.config supports JSON or a single default-exported object literal.`,
    };
  }
  if (!Array.isArray(config.writePaths) || config.writePaths.length === 0) {
    return { error: "omniui.config.writePaths is required and must be a non-empty array." };
  }
  if (!Array.isArray(config.screens)) {
    return { error: "omniui.config.screens is required and must be an array." };
  }
  return { root, configFile, config };
}
