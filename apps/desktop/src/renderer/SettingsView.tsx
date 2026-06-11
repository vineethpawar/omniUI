import { useState } from "react";
import { omniUI } from "./electronAPI";

interface Props {
  settings: {
    anthropicKeySet: boolean;
    figmaTokenSet: boolean;
    theme: "light" | "dark" | "system";
  } | null;
  onRefresh: () => Promise<unknown>;
}

export function SettingsView({ settings, onRefresh }: Props) {
  return (
    <div style={{ padding: "60px 48px", maxWidth: 720 }}>
      <div className="pill" style={{ marginBottom: 14 }}>Settings</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 24 }}>
        Bring your own keys.
      </h1>
      <p className="muted" style={{ marginBottom: 36, fontSize: 15, lineHeight: 1.6 }}>
        Stored locally in <span className="code">~/Library/Application Support/omniUI/settings.json</span>{" "}
        (or the equivalent on your OS). The agent reads them as env vars when it spawns. Nothing leaves your machine.
      </p>

      <KeyField
        label="Anthropic API key"
        placeholder="sk-ant-..."
        helper="The agent runs Claude. Mint a key at console.anthropic.com."
        isSet={!!settings?.anthropicKeySet}
        onSave={async (value) => {
          await omniUI.settings.setAnthropicKey(value);
          await onRefresh();
        }}
      />

      <KeyField
        label="Figma access token (optional)"
        placeholder="figd_..."
        helper="Enables live Figma fetches via the REST API. Without it, the agent reads pre-downloaded YAML/JSON dumps only."
        isSet={!!settings?.figmaTokenSet}
        onSave={async (value) => {
          await omniUI.settings.setFigmaToken(value);
          await onRefresh();
        }}
      />

      <div style={{ marginTop: 48, padding: "20px 0", borderTop: "1px solid var(--stroke-soft)" }}>
        <div className="muted" style={{ fontSize: 13 }}>
          Need an Anthropic key?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); void omniUI.openExternal("https://console.anthropic.com/"); }}>
            console.anthropic.com
          </a>
          {" · "}
          Figma personal access token?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); void omniUI.openExternal("https://www.figma.com/developers/api#access-tokens"); }}>
            figma.com/developers
          </a>
        </div>
      </div>
    </div>
  );
}

function KeyField({
  label,
  placeholder,
  helper,
  isSet,
  onSave,
}: {
  label: string;
  placeholder: string;
  helper: string;
  isSet: boolean;
  onSave: (value: string | null) => Promise<void>;
}) {
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await onSave(draft.trim() || null);
      setDraft("");
    } finally {
      setSaving(false);
    }
  };

  const clear = async () => {
    setSaving(true);
    try {
      await onSave(null);
      setDraft("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <label style={{ fontWeight: 600 }}>{label}</label>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: isSet ? "var(--green)" : "var(--dim)",
            padding: "1px 8px",
            border: `1px solid ${isSet ? "var(--green)" : "var(--stroke)"}`,
            borderRadius: 999,
          }}
        >
          {isSet ? "set" : "not set"}
        </span>
      </div>
      <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
        {helper}
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="password"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={isSet ? "•••••• (set)" : placeholder}
          style={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) void save();
          }}
        />
        <button className="btn" onClick={save} disabled={saving || !draft.trim()}>
          Save
        </button>
        {isSet ? (
          <button className="btn btn-danger" onClick={clear} disabled={saving}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
