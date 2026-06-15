import { useCallback, useEffect, useState } from "react";
import { omniUI } from "./electronAPI";
import { SettingsView } from "./SettingsView";
import { ProjectView, type ProjectState } from "./ProjectView";
import { ChatView } from "./ChatView";

type Tab = "chat" | "project" | "settings";

interface SettingsSummary {
  anthropicKeySet: boolean;
  figmaTokenSet: boolean;
  activeProject: string | null;
  recentProjects: string[];
  theme: "light" | "dark" | "system";
}

export function App() {
  const [tab, setTab] = useState<Tab>("chat");
  const [settings, setSettings] = useState<SettingsSummary | null>(null);
  const [project, setProject] = useState<ProjectState | null>(null);

  const refreshSettings = useCallback(async () => {
    const s = (await omniUI.settings.get()) as SettingsSummary;
    setSettings(s);
    return s;
  }, []);

  useEffect(() => {
    void refreshSettings().then(async (s) => {
      // On boot: if a previous project was active, try to re-hydrate it.
      if (s.activeProject) {
        const res = await omniUI.project.reload(s.activeProject);
        if (res.ok) {
          setProject({ root: res.project.root, config: res.project.config });
        } else {
          setTab("project");
        }
      } else {
        setTab("project");
      }
    });
  }, [refreshSettings]);

  const ready = !!settings?.anthropicKeySet && !!project;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        tab={tab}
        onTab={setTab}
        settings={settings}
        project={project}
      />
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto", background: "var(--bg)" }}>
        {tab === "chat" && (
          <ChatView ready={ready} project={project} settings={settings} onGoToProject={() => setTab("project")} onGoToSettings={() => setTab("settings")} />
        )}
        {tab === "project" && (
          <ProjectView
            project={project}
            settings={settings}
            onProjectChange={(p) => {
              setProject(p);
              void refreshSettings();
              if (p) setTab("chat");
            }}
          />
        )}
        {tab === "settings" && (
          <SettingsView settings={settings} onRefresh={refreshSettings} />
        )}
      </main>
    </div>
  );
}

function Sidebar({
  tab,
  onTab,
  settings,
  project,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  settings: SettingsSummary | null;
  project: ProjectState | null;
}) {
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: "var(--bg)",
        borderRight: "1px solid var(--stroke-soft)",
        padding: "60px 14px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px" }}>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: "linear-gradient(135deg, var(--orange), #FF8A3D)",
            boxShadow: "0 0 14px rgba(255,92,0,0.4)",
          }}
        />
        <span style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>omniUI</span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            fontWeight: 700,
            padding: "1px 6px",
            borderRadius: 4,
            border: "1px solid var(--stroke)",
            color: "var(--muted)",
            letterSpacing: "0.08em",
          }}
        >
          BETA
        </span>
      </div>

      <NavItem label="Chat" active={tab === "chat"} onClick={() => onTab("chat")} hint={!project ? "pick a project first" : undefined} />
      <NavItem label="Project" active={tab === "project"} onClick={() => onTab("project")} hint={project ? project.config.name : undefined} />
      <NavItem label="Settings" active={tab === "settings"} onClick={() => onTab("settings")} hint={settings?.anthropicKeySet ? "ready" : "add key"} />

      <div style={{ flex: 1 }} />

      <Status settings={settings} project={project} />
    </aside>
  );
}

function NavItem({ label, active, onClick, hint }: { label: string; active: boolean; onClick: () => void; hint?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        background: active ? "var(--surface)" : "transparent",
        border: "1px solid",
        borderColor: active ? "var(--stroke)" : "transparent",
        borderRadius: 8,
        color: active ? "var(--text)" : "var(--muted)",
        fontWeight: active ? 600 : 500,
        fontSize: 13.5,
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      {hint ? <span style={{ fontSize: 11, color: "var(--dim)" }}>{hint}</span> : null}
    </button>
  );
}

function Status({ settings, project }: { settings: SettingsSummary | null; project: ProjectState | null }) {
  if (!settings) return null;
  const items: Array<{ ok: boolean; label: string }> = [
    { ok: settings.anthropicKeySet, label: "Anthropic key" },
    { ok: settings.figmaTokenSet, label: "Figma token" },
    { ok: !!project, label: "Project loaded" },
  ];
  return (
    <div
      style={{
        padding: "10px 12px",
        background: "var(--surface)",
        border: "1px solid var(--stroke)",
        borderRadius: 10,
        fontSize: 12,
      }}
    >
      {items.map((it) => (
        <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: it.ok ? "var(--green)" : "var(--dim)",
            }}
          />
          <span style={{ color: it.ok ? "var(--text)" : "var(--muted)" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}
