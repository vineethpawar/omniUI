/**
 * Spawn + supervise the agent subprocess. One child per conversation.
 *
 * stdout protocol:   each line starting with `>>OAE ` is a JSON AgentEvent.
 * stdin protocol:    each line starting with `<<DEC ` is a write decision.
 *
 * (OAE = omniUI Agent Event; preserves the `>>AIE` pattern from BXI's
 * ai-polish reference for line-prefix-based event framing.)
 */
import { type IpcMain, type WebContents, BrowserWindow } from "electron";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { app } from "electron";
import { getAgentEnv, getSettings } from "./settings";
import { loadProject } from "./project";

interface AgentChild {
  conversationId: string;
  proc: ChildProcessWithoutNullStreams;
  stdoutBuffer: string;
  stderrBuffer: string;
}

const active = new Map<string, AgentChild>();

function emit(target: WebContents | null, conversationId: string, event: unknown): void {
  if (!target || target.isDestroyed()) return;
  target.send("agent:event", { conversationId, event });
}

function broadcast(conversationId: string, event: unknown): void {
  for (const win of BrowserWindow.getAllWindows()) {
    emit(win.webContents, conversationId, event);
  }
}

function resolveAgentEntry(): string {
  // In dev, source files are in `src/agent/cli.ts` and tsx is available.
  // In packaged builds, the agent ships as part of the asar.
  const devEntry = join(__dirname, "..", "agent", "cli.ts");
  const packagedEntry = join(__dirname, "agent", "cli.js");
  if (existsSync(devEntry)) return devEntry;
  if (existsSync(packagedEntry)) return packagedEntry;
  return devEntry;
}

function isTsEntry(path: string): boolean {
  return path.endsWith(".ts") || path.endsWith(".tsx");
}

export function registerAgentHandlers(ipc: IpcMain): void {
  ipc.handle("agent:start", (event, payload: { conversationId: string; task: string }) => {
    const sender = event.sender;
    const settings = getSettings();
    if (!settings.anthropicApiKey) {
      return { ok: false, reason: "Anthropic API key not set" } as const;
    }
    if (!settings.activeProject) {
      return { ok: false, reason: "No active project; pick one first" } as const;
    }
    const projectResult = loadProject(settings.activeProject);
    if ("error" in projectResult) {
      return { ok: false, reason: projectResult.error } as const;
    }

    const entry = resolveAgentEntry();
    const runtime = isTsEntry(entry) ? "tsx" : process.execPath;
    const args = isTsEntry(entry) ? [entry] : [entry];

    const env: NodeJS.ProcessEnv = {
      ...process.env,
      ...getAgentEnv(),
      OMNIUI_PROJECT_ROOT: projectResult.root,
      OMNIUI_PROJECT_CONFIG: projectResult.configFile,
      OMNIUI_JSON_EVENTS: "1",
      OMNIUI_TASK: payload.task,
      OMNIUI_CONVERSATION_ID: payload.conversationId,
    };

    const proc = spawn(runtime, args, {
      cwd: projectResult.root,
      env,
      stdio: ["pipe", "pipe", "pipe"],
    });

    const child: AgentChild = {
      conversationId: payload.conversationId,
      proc,
      stdoutBuffer: "",
      stderrBuffer: "",
    };
    active.set(payload.conversationId, child);

    proc.stdout.on("data", (chunk: Buffer) => {
      child.stdoutBuffer += chunk.toString("utf-8");
      let nl: number;
      while ((nl = child.stdoutBuffer.indexOf("\n")) !== -1) {
        const line = child.stdoutBuffer.slice(0, nl);
        child.stdoutBuffer = child.stdoutBuffer.slice(nl + 1);
        if (line.startsWith(">>OAE ")) {
          try {
            const ev = JSON.parse(line.slice(6));
            emit(sender, payload.conversationId, ev);
          } catch (err) {
            emit(sender, payload.conversationId, {
              type: "error",
              message: `Bad event line: ${(err as Error).message}`,
            });
          }
        }
      }
    });

    proc.stderr.on("data", (chunk: Buffer) => {
      child.stderrBuffer += chunk.toString("utf-8");
    });

    proc.on("close", (code) => {
      emit(sender, payload.conversationId, { type: "_closed", code: code ?? -1 });
      active.delete(payload.conversationId);
      if (code !== 0 && child.stderrBuffer.trim()) {
        emit(sender, payload.conversationId, {
          type: "error",
          message: child.stderrBuffer.trim().split("\n").slice(-5).join("\n"),
        });
      }
    });

    return { ok: true } as const;
  });

  ipc.handle("agent:abort", (_e, payload: { conversationId: string }) => {
    const child = active.get(payload.conversationId);
    if (!child) return { ok: false, reason: "no such conversation" } as const;
    child.proc.kill("SIGTERM");
    setTimeout(() => {
      if (active.has(payload.conversationId)) child.proc.kill("SIGKILL");
    }, 2000);
    return { ok: true } as const;
  });

  ipc.handle(
    "agent:decision",
    (_e, payload: { conversationId: string; id: string; decision: "apply" | "reject" }) => {
      const child = active.get(payload.conversationId);
      if (!child) return { ok: false, reason: "no such conversation" } as const;
      const line = `<<DEC ${JSON.stringify({ id: payload.id, decision: payload.decision })}\n`;
      child.proc.stdin.write(line);
      return { ok: true } as const;
    },
  );

  ipc.handle("agent:isReady", () => {
    const s = getSettings();
    const entry = resolveAgentEntry();
    return {
      anthropicKeySet: !!s.anthropicApiKey,
      figmaTokenSet: !!s.figmaAccessToken,
      projectSet: !!s.activeProject,
      agentEntryExists: existsSync(entry),
      appVersion: app.getVersion(),
    };
  });
}

export function killAll(): void {
  for (const child of active.values()) {
    try {
      child.proc.kill("SIGKILL");
    } catch {
      /* noop */
    }
  }
  active.clear();
}
