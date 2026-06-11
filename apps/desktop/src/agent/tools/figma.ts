/**
 * Figma tools. Two surfaces: offline (read pre-downloaded YAML/JSON dumps)
 * and live (fetch via the Figma REST API; requires FIGMA_ACCESS_TOKEN).
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { getRoot } from "../safety";

function dumpsDir(): string {
  // Configurable per project via config.figmaDumpsDir; the agent CLI calls
  // setFigmaDumpsDir() at boot from the loaded config.
  return cachedDumpsDir;
}

let cachedDumpsDir = "design-system/figma-dumps";

export function setFigmaDumpsDir(dir: string): void {
  cachedDumpsDir = dir;
}

const figmaTools = [
  tool(
    "list_figma_dumps",
    "List pre-downloaded Figma dump files available offline. Returns filenames; combine with read_figma_dump.",
    {
      filter: z.string().optional().describe("optional substring filter"),
    },
    async ({ filter }) => {
      const full = join(getRoot(), dumpsDir());
      if (!existsSync(full)) {
        return {
          content: [{ type: "text" as const, text: `No dumps directory at ${dumpsDir()}.` }],
        };
      }
      const all = readdirSync(full).filter(
        (n) => n.endsWith(".yaml") || n.endsWith(".yml") || n.endsWith(".json"),
      );
      const filtered = filter ? all.filter((n) => n.toLowerCase().includes(filter.toLowerCase())) : all;
      return {
        content: [
          {
            type: "text" as const,
            text:
              filtered.length === 0
                ? "No matching dumps."
                : filtered.map((n) => `- ${n}`).join("\n"),
          },
        ],
      };
    },
  ),

  tool(
    "read_figma_dump",
    "Read a pre-downloaded Figma node dump. Pass the filename returned by list_figma_dumps. YAML is parsed; JSON returned as-is.",
    {
      filename: z.string().describe("filename inside the dumps directory"),
    },
    async ({ filename }) => {
      const full = join(getRoot(), dumpsDir(), filename);
      if (!existsSync(full)) {
        return {
          content: [
            { type: "text" as const, text: `No such dump: ${filename}. Run list_figma_dumps.` },
          ],
        };
      }
      const raw = readFileSync(full, "utf-8");
      let body: string;
      if (filename.endsWith(".yaml") || filename.endsWith(".yml")) {
        const parsed = yaml.load(raw);
        body = JSON.stringify(parsed, null, 2);
      } else {
        body = raw;
      }
      return { content: [{ type: "text" as const, text: body }] };
    },
  ),

  tool(
    "figma_get_node_by_url",
    "Live-fetch a Figma node via the REST API. Requires FIGMA_ACCESS_TOKEN. Pass the full Figma URL (the kind that has a node-id query param).",
    {
      url: z.string().describe("Figma file URL with node-id"),
      cacheAs: z
        .string()
        .optional()
        .describe(
          "Optional filename. If set, write the JSON response into the dumps directory so future calls can use read_figma_dump.",
        ),
    },
    async ({ url, cacheAs }) => {
      const token = process.env["FIGMA_ACCESS_TOKEN"];
      if (!token) {
        return {
          content: [
            {
              type: "text" as const,
              text:
                "FIGMA_ACCESS_TOKEN not set. Add it in Settings to enable live Figma fetches, or use read_figma_dump for offline references.",
            },
          ],
        };
      }
      const fileMatch = url.match(/figma\.com\/(?:design|file)\/([^/?#]+)/);
      const nodeMatch = url.match(/node-id=([^&]+)/);
      if (!fileMatch || !nodeMatch) {
        return {
          content: [
            {
              type: "text" as const,
              text: "URL did not contain a file id and a node-id query param. Check the Dev Mode link.",
            },
          ],
        };
      }
      const fileKey = fileMatch[1]!;
      const nodeId = decodeURIComponent(nodeMatch[1]!).replace("-", ":");
      const apiUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;
      const res = await fetch(apiUrl, { headers: { "X-Figma-Token": token } });
      if (!res.ok) {
        return {
          content: [
            { type: "text" as const, text: `Figma API ${res.status}: ${await res.text().catch(() => "")}` },
          ],
        };
      }
      const json = (await res.json()) as unknown;
      if (cacheAs) {
        try {
          writeFileSync(join(getRoot(), dumpsDir(), cacheAs), JSON.stringify(json, null, 2));
        } catch {
          /* swallow cache errors */
        }
      }
      return { content: [{ type: "text" as const, text: JSON.stringify(json, null, 2) }] };
    },
  ),
];

export const figmaServer = createSdkMcpServer({
  name: "omniui_figma",
  version: "0.1.0",
  tools: figmaTools,
});
