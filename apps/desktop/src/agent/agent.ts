/**
 * Agent runtime. Spawned by the desktop host per chat turn. Emits
 * `>>OAE {json}` lines on stdout; reads `<<DEC {json}` lines from stdin
 * to resolve write-pending hooks.
 */
import { query } from "@anthropic-ai/claude-agent-sdk";
import type { ProjectConfig } from "../main/project";
import { buildSystemPrompt } from "./prompt";
import { configureSafety, isWriteAllowed } from "./safety";
import { figmaServer, setFigmaDumpsDir } from "./tools/figma";

export type AgentEvent =
  | { type: "iteration_start"; iteration: number }
  | { type: "text"; text: string }
  | { type: "thinking"; text: string }
  | { type: "tool_use"; id: string; name: string; input: unknown }
  | {
      type: "write_pending";
      id: string;
      toolName: string;
      filePath: string;
      content?: string;
      oldString?: string;
      newString?: string;
      replaceAll?: boolean;
    }
  | { type: "write_resolved"; id: string; decision: "apply" | "reject" }
  | { type: "iteration_end"; usage: Record<string, number> }
  | { type: "done"; total: Record<string, number> }
  | { type: "error"; message: string };

const pendingDecisions = new Map<string, (d: "apply" | "reject") => void>();
let stdinListenerArmed = false;

function ensureStdinListener(): void {
  if (stdinListenerArmed) return;
  stdinListenerArmed = true;
  let buf = "";
  process.stdin.on("data", (chunk: Buffer) => {
    buf += chunk.toString("utf-8");
    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      const line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (!line.startsWith("<<DEC ")) continue;
      try {
        const parsed = JSON.parse(line.slice(6)) as { id: string; decision: "apply" | "reject" };
        const resolver = pendingDecisions.get(parsed.id);
        if (resolver) {
          pendingDecisions.delete(parsed.id);
          resolver(parsed.decision);
        }
      } catch {
        /* malformed line, ignore */
      }
    }
  });
}

function emit(event: AgentEvent): void {
  process.stdout.write(`>>OAE ${JSON.stringify(event)}\n`);
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function makeWriteHook() {
  return {
    PreToolUse: [
      {
        matcher: "Write|Edit",
        hooks: [
          async (input: { tool_name?: string; tool_input?: Record<string, unknown> }) => {
            const toolName = input?.tool_name ?? "Write";
            const ti = (input?.tool_input ?? {}) as Record<string, unknown>;
            const filePath = (ti["file_path"] ?? "") as string;
            if (!isWriteAllowed(filePath)) {
              return {
                hookSpecificOutput: {
                  hookEventName: "PreToolUse" as const,
                  permissionDecision: "deny" as const,
                  permissionDecisionReason: `${filePath || "(empty path)"} is outside the project's writePaths allowlist.`,
                },
              };
            }
            // Hold the write for user approval over stdin.
            ensureStdinListener();
            const id = uid();
            emit({
              type: "write_pending",
              id,
              toolName,
              filePath,
              content: ti["content"] as string | undefined,
              oldString: ti["old_string"] as string | undefined,
              newString: ti["new_string"] as string | undefined,
              replaceAll: ti["replace_all"] as boolean | undefined,
            });
            const decision = await new Promise<"apply" | "reject">((resolve) => {
              pendingDecisions.set(id, resolve);
            });
            emit({ type: "write_resolved", id, decision });
            if (decision === "apply") {
              return {
                hookSpecificOutput: {
                  hookEventName: "PreToolUse" as const,
                  permissionDecision: "allow" as const,
                },
              };
            }
            return {
              hookSpecificOutput: {
                hookEventName: "PreToolUse" as const,
                permissionDecision: "deny" as const,
                permissionDecisionReason: "User rejected the write.",
              },
            };
          },
        ],
      },
    ],
  };
}

export async function runAgent(args: {
  projectRoot: string;
  config: ProjectConfig;
  task: string;
  signal?: AbortSignal;
}): Promise<void> {
  const { projectRoot, config, task, signal } = args;

  configureSafety({
    root: projectRoot,
    readPaths: config.readPaths ?? [],
    writePaths: config.writePaths,
  });
  if (config.figmaDumpsDir) setFigmaDumpsDir(config.figmaDumpsDir);

  const prompt = buildSystemPrompt(config);

  const totals: Record<string, number> = {
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheCreate: 0,
  };
  let iteration = 0;

  try {
    const stream = query({
      prompt: task,
      options: {
        systemPrompt: prompt,
        cwd: projectRoot,
        effort: "high",
        thinking: { type: "adaptive", display: "summarized" },
        mcpServers: { omniui_figma: figmaServer },
        hooks: makeWriteHook(),
        abortSignal: signal,
      },
    });

    for await (const message of stream) {
      if (signal?.aborted) break;
      if (message.type === "assistant") {
        iteration += 1;
        emit({ type: "iteration_start", iteration });
        for (const block of message.message.content) {
          if (block.type === "text") emit({ type: "text", text: block.text });
          else if (block.type === "thinking") emit({ type: "thinking", text: block.thinking });
          else if (block.type === "tool_use")
            emit({ type: "tool_use", id: block.id, name: block.name, input: block.input });
        }
      } else if (message.type === "result") {
        if (message.usage) {
          totals.input += message.usage.input_tokens ?? 0;
          totals.output += message.usage.output_tokens ?? 0;
          totals.cacheRead += message.usage.cache_read_input_tokens ?? 0;
          totals.cacheCreate += message.usage.cache_creation_input_tokens ?? 0;
        }
        emit({ type: "iteration_end", usage: { ...totals } });
      }
    }
    emit({ type: "done", total: totals });
  } catch (err) {
    emit({ type: "error", message: (err as Error)?.message ?? String(err) });
  }
}
