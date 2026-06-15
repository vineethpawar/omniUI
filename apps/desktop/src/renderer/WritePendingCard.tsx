interface WritePendingEvent {
  type: "write_pending";
  id: string;
  toolName: string;
  filePath: string;
  content?: string;
  oldString?: string;
  newString?: string;
  replaceAll?: boolean;
}

interface Props {
  event: WritePendingEvent;
  decision?: "apply" | "reject";
  onDecision: (id: string, decision: "apply" | "reject") => void;
}

export function WritePendingCard({ event, decision, onDecision }: Props) {
  const isEdit = event.toolName === "Edit";
  const pending = decision === undefined;

  const borderColor = pending
    ? "var(--orange)"
    : decision === "apply"
      ? "var(--green)"
      : "var(--red)";

  const statusLabel =
    decision === "apply" ? "Applied" : decision === "reject" ? "Rejected" : "Pending review";
  const statusColor =
    decision === "apply" ? "var(--green)" : decision === "reject" ? "var(--red)" : "var(--orange)";

  return (
    <div
      style={{
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: "var(--orange)",
          }}
        >
          {(isEdit ? "edit" : "write").toUpperCase()}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text)",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {event.filePath}
        </span>
        <span style={{ fontSize: 11, color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
      </div>

      {isEdit ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <DiffPane label="Was" body={event.oldString ?? "(empty)"} negative />
          <DiffPane label="Becomes" body={event.newString ?? "(empty)"} />
        </div>
      ) : (
        <DiffPane
          label={event.content === undefined ? "(no content)" : `${event.content.length} chars`}
          body={event.content ?? ""}
        />
      )}

      {pending ? (
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 }}>
          <button className="btn btn-danger" onClick={() => onDecision(event.id, "reject")}>
            Reject
          </button>
          <button className="btn" onClick={() => onDecision(event.id, "apply")}>
            Apply
          </button>
        </div>
      ) : null}
    </div>
  );
}

function DiffPane({ label, body, negative }: { label: string; body: string; negative?: boolean }) {
  const MAX_PREVIEW = 1200;
  const truncated = body.length > MAX_PREVIEW;
  const preview = truncated
    ? body.slice(0, MAX_PREVIEW) + `\n…(+${body.length - MAX_PREVIEW} more chars)`
    : body;
  return (
    <div
      style={{
        background: negative ? "rgba(224, 81, 70, 0.08)" : "var(--bg)",
        border: "1px solid var(--stroke-soft)",
        borderRadius: 6,
        padding: "8px 10px",
        maxHeight: 260,
        overflow: "auto",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", marginBottom: 4 }}>
        {label}
      </div>
      <pre
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text)",
          whiteSpace: "pre-wrap",
          margin: 0,
        }}
      >
        {preview}
      </pre>
    </div>
  );
}
