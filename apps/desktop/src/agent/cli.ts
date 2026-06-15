#!/usr/bin/env tsx
/**
 * Agent CLI entry. Picks up everything it needs from env vars set by the
 * desktop host:
 *
 *   OMNIUI_PROJECT_ROOT     absolute path to the active project
 *   OMNIUI_PROJECT_CONFIG   absolute path to the config file
 *   OMNIUI_TASK             the user's task text
 *   OMNIUI_CONVERSATION_ID  opaque id; just echoed back for debugging
 *   OMNIUI_JSON_EVENTS=1    emit >>OAE event lines (always 1 from the host)
 *
 *   ANTHROPIC_API_KEY       required
 *   FIGMA_ACCESS_TOKEN      optional, enables live Figma fetches
 */
import "dotenv/config";
import { readFileSync, existsSync } from "node:fs";
import type { ProjectConfig } from "../main/project";
import { runAgent } from "./agent";

function fail(msg: string): never {
  process.stdout.write(`>>OAE ${JSON.stringify({ type: "error", message: msg })}\n`);
  process.exit(1);
}

const projectRoot = process.env["OMNIUI_PROJECT_ROOT"];
const projectConfigPath = process.env["OMNIUI_PROJECT_CONFIG"];
const task = process.env["OMNIUI_TASK"];

if (!projectRoot) fail("OMNIUI_PROJECT_ROOT not set");
if (!projectConfigPath) fail("OMNIUI_PROJECT_CONFIG not set");
if (!task) fail("OMNIUI_TASK not set");
if (!process.env["ANTHROPIC_API_KEY"]) fail("ANTHROPIC_API_KEY not set");
if (!existsSync(projectConfigPath!)) fail(`Config not found at ${projectConfigPath}`);

let config: ProjectConfig;
try {
  const raw = readFileSync(projectConfigPath!, "utf-8");
  // Mirror the parser in main/project.ts: try JSON, then object-literal eval.
  try {
    config = JSON.parse(raw) as ProjectConfig;
  } catch {
    const m = raw.match(/(?:export\s+default|module\.exports\s*=)\s*({[\s\S]*})\s*;?\s*$/m);
    if (!m) fail("Could not parse project config");
    // eslint-disable-next-line no-new-func
    config = new Function(`return (${m[1]})`)() as ProjectConfig;
  }
} catch (err) {
  fail(`Could not read config: ${(err as Error).message}`);
}

const controller = new AbortController();
process.on("SIGTERM", () => controller.abort());
process.on("SIGINT", () => controller.abort());

void runAgent({
  projectRoot: projectRoot!,
  config: config!,
  task: task!,
  signal: controller.signal,
}).then(() => process.exit(0));
