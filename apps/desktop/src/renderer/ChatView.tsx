import { useCallback, useEffect, useRef, useState } from "react";
import { omniUI } from "./electronAPI";
import type { ProjectState } from "./ProjectView";
import { WritePendingCard } from "./WritePendingCard";

type ChatEvent =
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
  | { type: "error"; message: string }
  | { type: "_closed"; code: number };

interface ChatTurn {
  conversationId: string;
  userTask: string;
  events: ChatEvent[];
  writeDecisions: Record<string, "apply" | "reject">;
  running: boolean;
}

interface Props {
  ready: boolean;
  project: ProjectState | null;
  settings: { anthropicKeySet: boolean } | null;
  onGoToProject: () => void;
  onGoToSettings: () => void;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 12);
}

export function ChatView({ ready, project, settings, onGoToProject, onGoToSettings }: Props) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = omniUI.agent.onEvent(({ conversationId, event }) => {
      const e = event as ChatEvent;
      setTurns((prev) => {
        const idx = prev.findIndex((t) => t.conversationId === conversationId);
        if (idx === -1) return prev;
        const turn = prev[idx]!;
        const newEvents = [...turn.events, e];
        const running = e.type !== "done" && e.type !== "error" && e.type !== "_closed";
        const writeDecisions =
          e.type === "write_resolved"
            ? { ...turn.writeDecisions, [e.id]: e.decision }
            : turn.writeDecisions;
        const next: ChatTurn = {
          conversationId: turn.conversationId,
          userTask: turn.userTask,
          events: newEvents,
          writeDecisions,
          running: turn.running && running,
        };
        return [...prev.slice(0, idx), next, ...prev.slice(idx + 1)];
      });
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [turns]);

  const submit = useCallback(async () => {
    const task = input.trim();
    if (!task || !ready) return;
    const conversationId = uid();
    setTurns((prev) => [
      ...prev,
      { conversationId, userTask: task, events: [], writeDecisions: {}, running: true },
    ]);
    setInput("");
    const result = await omniUI.agent.start({ conversationId, task });
    if (!result.ok) {
      setTurns((prev) =>
        prev.map((t) =>
          t.conversationId === conversationId
            ? {
                ...t,
                running: false,
                events: [...t.events, { type: "error", message: result.reason ?? "failed" } as ChatEvent],
              }
            : t,
        ),
      );
    }
  }, [input, ready]);

  const abort = (conversationId: string) => {
    void omniUI.agent.abort({ conversationId });
  };

  const decide = (conversationId: string, id: string, decision: "apply" | "reject") => {
    void omniUI.agent.decision({ conversationId, id, decision });
    setTurns((prev) =>
      prev.map((t) =>
        t.conversationId === conversationId
          ? { ...t, writeDecisions: { ...t.writeDecisions, [id]: decision } }
          : t,
      ),
    );
  };

  if (!settings?.anthropicKeySet) {
    return <EmptyState title="Add your Anthropic API key" body="The agent uses Claude. Drop your key in Settings." action="Open Settings" onAction={onGoToSettings} />;
  }
  if (!project) {
    return <EmptyState title="Pick a project root" body="omniUI runs the agent against a specific project. Choose one to get started." action="Open Project" onAction={onGoToProject} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", paddingTop: 32 }}>
      <div
        style={{
          padding: "0 36px 20px",
          borderBottom: "1px solid var(--stroke-soft)",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{project.config.name}</div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
            {project.root}
          </span>
        </div>
        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
          {project.config.screens.length} screens in the manifest. Write paths: {project.config.writePaths.join(", ")}.
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 36px" }}>
        {turns.length === 0 ? (
          <EmptyTip />
        ) : (
          turns.map((turn) => (
            <div key={turn.conversationId} style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "var(--surface)",
                  border: "1px solid var(--stroke)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  marginBottom: 12,
                  maxWidth: "85%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {turn.userTask}
              </div>
              {turn.events.map((event, i) => (
                <EventBlock
                  key={i}
                  event={event}
                  decision={event.type === "write_pending" ? turn.writeDecisions[event.id] : undefined}
                  onDecision={(id, decision) => decide(turn.conversationId, id, decision)}
                />
              ))}
              {turn.running ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                  <span className="muted" style={{ fontSize: 12 }}>agent running…</span>
                  <button
                    onClick={() => abort(turn.conversationId)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--red)",
                      fontSize: 12,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    cancel
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>

      <div
        style={{
          padding: "16px 36px 24px",
          borderTop: "1px solid var(--stroke-soft)",
          background: "var(--bg)",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Polish a screen, audit tokens, replace a hardcoded color..."
            rows={2}
            style={{ flex: 1, resize: "none", fontSize: 14, lineHeight: 1.5 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                void submit();
              }
            }}
          />
          <button className="btn" onClick={submit} disabled={!input.trim()}>
            Send
            <span className="kbd" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
              ⌘⏎
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) {
  return (
    <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 60 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>{title}</h2>
      <p className="muted" style={{ maxWidth: 420, textAlign: "center" }}>{body}</p>
      <button className="btn" onClick={onAction}>{action}</button>
    </div>
  );
}

function EmptyTip() {
  return (
    <div className="muted" style={{ padding: 40, textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <p style={{ fontSize: 14, marginBottom: 12 }}>Try one of these to start.</p>
      <ul style={{ listStyle: "none", padding: 0, fontSize: 13, textAlign: "left" }}>
        <li style={{ padding: "4px 0" }}>• Make the dashboard banner padding match Figma frame X.</li>
        <li style={{ padding: "4px 0" }}>• Audit which color tokens aren't referenced anywhere.</li>
        <li style={{ padding: "4px 0" }}>• Replace every hardcoded #FF5C00 with colors.primaryOrange.</li>
      </ul>
    </div>
  );
}

function EventBlock({
  event,
  decision,
  onDecision,
}: {
  event: ChatEvent;
  decision?: "apply" | "reject";
  onDecision: (id: string, decision: "apply" | "reject") => void;
}) {
  if (event.type === "write_pending") {
    return <WritePendingCard event={event} decision={decision} onDecision={onDecision} />;
  }
  if (event.type === "write_resolved") return null;
  if (event.type === "text") {
    return (
      <div style={{ fontSize: 14, marginBottom: 10, whiteSpace: "pre-wrap" }}>{event.text}</div>
    );
  }
  if (event.type === "thinking") {
    return (
      <div
        style={{
          fontSize: 12,
          color: "var(--muted)",
          fontStyle: "italic",
          background: "var(--surface)",
          padding: "6px 10px",
          borderRadius: 6,
          marginBottom: 10,
          whiteSpace: "pre-wrap",
        }}
      >
        [thinking] {event.text}
      </div>
    );
  }
  if (event.type === "tool_use") {
    return (
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--purple)",
          marginBottom: 10,
        }}
      >
        ▸ {event.name}({JSON.stringify(event.input).slice(0, 160)})
      </div>
    );
  }
  if (event.type === "error") {
    return <div style={{ color: "var(--red)", fontSize: 13, marginBottom: 10 }}>ERROR: {event.message}</div>;
  }
  if (event.type === "done") {
    return (
      <div style={{ fontSize: 12, color: "var(--muted)" }}>
        ✓ done · in {event.total.input} / out {event.total.output} / cache_read {event.total.cacheRead}
      </div>
    );
  }
  return null;
}
