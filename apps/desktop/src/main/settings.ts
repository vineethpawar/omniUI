/**
 * Settings storage. Keeps everything in `<userData>/settings.json`.
 *
 * The Anthropic and Figma tokens never round-trip through the renderer in
 * full. The renderer asks "is it set?" and receives a boolean. Writing a
 * new token comes IN over IPC, gets persisted, then dropped from memory.
 */
import { app } from "electron";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

export interface SettingsShape {
  anthropicApiKey: string | null;
  figmaAccessToken: string | null;
  /** Last 10 project roots opened, most recent first. */
  recentProjects: string[];
  /** The currently selected project root (absolute path). */
  activeProject: string | null;
  /** Renderer-side preferences. */
  theme: "light" | "dark" | "system";
}

const DEFAULTS: SettingsShape = {
  anthropicApiKey: null,
  figmaAccessToken: null,
  recentProjects: [],
  activeProject: null,
  theme: "system",
};

let cache: SettingsShape | null = null;

function file(): string {
  return join(app.getPath("userData"), "settings.json");
}

function load(): SettingsShape {
  if (cache) return cache;
  try {
    if (!existsSync(file())) {
      cache = { ...DEFAULTS };
      return cache;
    }
    const raw = readFileSync(file(), "utf-8");
    const parsed = JSON.parse(raw) as Partial<SettingsShape>;
    cache = { ...DEFAULTS, ...parsed };
    return cache;
  } catch {
    cache = { ...DEFAULTS };
    return cache;
  }
}

function persist(): void {
  if (!cache) return;
  mkdirSync(dirname(file()), { recursive: true });
  writeFileSync(file(), JSON.stringify(cache, null, 2), "utf-8");
}

export function getSettings(): SettingsShape {
  return { ...load() };
}

/** Renderer-safe summary: no secrets, just booleans + paths. */
export function getSettingsSummary() {
  const s = load();
  return {
    anthropicKeySet: !!s.anthropicApiKey,
    figmaTokenSet: !!s.figmaAccessToken,
    activeProject: s.activeProject,
    recentProjects: s.recentProjects,
    theme: s.theme,
  };
}

export function updateSecret(key: "anthropicApiKey" | "figmaAccessToken", value: string | null): void {
  const s = load();
  s[key] = value && value.trim() ? value.trim() : null;
  persist();
}

export function setActiveProject(root: string | null): void {
  const s = load();
  s.activeProject = root;
  if (root) {
    s.recentProjects = [root, ...s.recentProjects.filter((p) => p !== root)].slice(0, 10);
  }
  persist();
}

export function setTheme(theme: SettingsShape["theme"]): void {
  const s = load();
  s.theme = theme;
  persist();
}

/** For agent.ts: returns the secret values so the spawn can inject them. */
export function getAgentEnv(): { ANTHROPIC_API_KEY?: string; FIGMA_ACCESS_TOKEN?: string } {
  const s = load();
  const env: { ANTHROPIC_API_KEY?: string; FIGMA_ACCESS_TOKEN?: string } = {};
  if (s.anthropicApiKey) env.ANTHROPIC_API_KEY = s.anthropicApiKey;
  if (s.figmaAccessToken) env.FIGMA_ACCESS_TOKEN = s.figmaAccessToken;
  return env;
}
