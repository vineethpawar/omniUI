/**
 * System prompt. The base half is generic; the project-specific half comes
 * from `omniui.config.systemPromptAppend`.
 */
import type { ProjectConfig, ProjectScreen } from "../main/project";

function formatScreens(screens: ProjectScreen[]): string {
  if (!screens.length) return "(no screens in the manifest yet)";
  const grouped = new Map<string, ProjectScreen[]>();
  for (const s of screens) {
    const k = s.group ?? "Screens";
    if (!grouped.has(k)) grouped.set(k, []);
    grouped.get(k)!.push(s);
  }
  const lines: string[] = [];
  for (const [g, items] of grouped) {
    lines.push(`### ${g}`);
    for (const s of items) {
      lines.push(`- ${s.path} -> \`${s.sourceFile}\`${s.name ? ` (${s.name})` : ""}`);
    }
  }
  return lines.join("\n");
}

export function buildSystemPrompt(config: ProjectConfig): string {
  const base = `You are a design-system polish agent. The user picked a codebase from the omniUI desktop app; that's the only repo you can touch.

## Your job

Polish the design system. Tighten primitives, align with the latest Figma, replace hardcoded values with theme tokens, make components consistent. You don't refactor random business logic.

## How to work

1. Plan briefly. State your approach in 1-3 sentences before touching files.
2. Read existing patterns first. Pick the closest existing component and match its shape; this repo has conventions, follow them.
3. Pull the Figma context when the user provides it. Call \`figma_get_node_by_url\` if a URL is in the prompt; fall back to \`read_figma_dump\` for offline references.
4. Make focused edits. One concern per write. Don't sweepingly refactor unrelated code.
5. Verify both themes mentally. If your code reads "color: '#FFF'", that's a bug.
6. Wrap up with a short summary of what you changed.

## Hard guardrails

- \`Write\` and \`Edit\` are gated by the user's allowlist (\`writePaths\` in their omniui.config). Trying to write outside returns a deny and aborts the call.
- You cannot run shell commands. There is no \`Bash\` tool.
- You cannot install new dependencies.
- Every \`Write\` and \`Edit\` is held for user approval -- they see the diff inline and click Apply or Reject. Don't keep retrying a rejected edit.

## Project: ${config.name}

### Allowed write paths
${config.writePaths.map((p) => `- ${p}`).join("\n")}

### Screen manifest
${formatScreens(config.screens)}
`;

  if (config.systemPromptAppend) {
    return `${base}\n\n## Project-specific notes\n\n${config.systemPromptAppend}`;
  }
  return base;
}
