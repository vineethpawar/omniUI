import { useState } from "react";
import { omniUI } from "./electronAPI";

export interface ProjectState {
  root: string;
  config: {
    name: string;
    writePaths: string[];
    readPaths?: string[];
    screens: Array<{
      path: string;
      name: string;
      group?: string;
      sourceFile: string;
      figma?: { light?: string; dark?: string };
      description?: string;
    }>;
    figmaDumpsDir?: string;
  };
}

interface Props {
  project: ProjectState | null;
  settings: { recentProjects: string[] } | null;
  onProjectChange: (p: ProjectState | null) => void;
}

export function ProjectView({ project, settings, onProjectChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async () => {
    setError(null);
    setLoading(true);
    try {
      const picked = await omniUI.project.pickFolder();
      if (picked.canceled) return;
      const res = await omniUI.project.load(picked.root);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      onProjectChange({ root: res.project.root, config: res.project.config });
    } finally {
      setLoading(false);
    }
  };

  const openRecent = async (root: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await omniUI.project.load(root);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      onProjectChange({ root: res.project.root, config: res.project.config });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "60px 48px", maxWidth: 920 }}>
      <div className="pill" style={{ marginBottom: 14 }}>Project</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
        Pick a project root.
      </h1>
      <p className="muted" style={{ marginBottom: 28, fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
        omniUI looks for an{" "}
        <span className="code">omniui.config.json</span> at the root that tells the agent which paths
        it can read, which it can write, and where your screens map to source files. See{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); void omniUI.openExternal("https://omniui-docs.vercel.app/"); }}>
          the docs
        </a>{" "}
        for the schema.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <button className="btn" onClick={pick} disabled={loading}>
          {loading ? "Loading…" : "Open folder…"}
        </button>
        {project ? (
          <button className="btn btn-ghost" onClick={() => onProjectChange(null)}>
            Close project
          </button>
        ) : null}
      </div>

      {error ? (
        <div
          style={{
            padding: "12px 16px",
            background: "rgba(224, 81, 70, 0.08)",
            border: "1px solid var(--red)",
            borderRadius: 10,
            color: "var(--red)",
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      ) : null}

      {project ? <ProjectDetail project={project} /> : null}

      {settings && settings.recentProjects.length > 0 ? (
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Recent
          </h3>
          {settings.recentProjects.map((root) => (
            <button
              key={root}
              onClick={() => openRecent(root)}
              style={{
                display: "block",
                padding: "10px 14px",
                background: "var(--surface)",
                border: "1px solid var(--stroke)",
                borderRadius: 8,
                color: "var(--text)",
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                marginBottom: 6,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              {root}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetail({ project }: { project: ProjectState }) {
  return (
    <div style={{ padding: 22, background: "var(--surface)", border: "1px solid var(--stroke)", borderRadius: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{project.config.name}</div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
          {project.root}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Section title="Write paths">
          {project.config.writePaths.map((p) => (
            <div key={p} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", padding: "2px 0" }}>
              {p}
            </div>
          ))}
        </Section>
        <Section title="Read paths">
          {project.config.readPaths?.length ? (
            project.config.readPaths.map((p) => (
              <div key={p} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", padding: "2px 0" }}>
                {p}
              </div>
            ))
          ) : (
            <div style={{ fontSize: 12, color: "var(--muted)" }}>(all paths inside the project root)</div>
          )}
        </Section>
      </div>
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Screen manifest ({project.config.screens.length})
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {project.config.screens.map((s) => (
            <div key={s.path} style={{ fontSize: 12, padding: "8px 10px", background: "var(--bg)", border: "1px solid var(--stroke-soft)", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>{s.path}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
