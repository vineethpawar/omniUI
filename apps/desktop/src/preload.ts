/**
 * Renderer ↦ main bridge. Only the surface the renderer needs.
 */
import { contextBridge, ipcRenderer } from "electron";

const api = {
  // Settings
  settings: {
    get: () => ipcRenderer.invoke("settings:get"),
    setAnthropicKey: (value: string | null) => ipcRenderer.invoke("settings:setAnthropicKey", value),
    setFigmaToken: (value: string | null) => ipcRenderer.invoke("settings:setFigmaToken", value),
    setActiveProject: (root: string | null) => ipcRenderer.invoke("settings:setActiveProject", root),
    setTheme: (theme: "light" | "dark" | "system") => ipcRenderer.invoke("settings:setTheme", theme),
  },

  // Project
  project: {
    pickFolder: () => ipcRenderer.invoke("project:pickFolder"),
    load: (root: string) => ipcRenderer.invoke("project:load", root),
    reload: (root: string) => ipcRenderer.invoke("project:reload", root),
  },

  // Agent
  agent: {
    isReady: () => ipcRenderer.invoke("agent:isReady"),
    start: (payload: { conversationId: string; task: string }) =>
      ipcRenderer.invoke("agent:start", payload),
    abort: (payload: { conversationId: string }) => ipcRenderer.invoke("agent:abort", payload),
    decision: (payload: { conversationId: string; id: string; decision: "apply" | "reject" }) =>
      ipcRenderer.invoke("agent:decision", payload),
    onEvent: (
      cb: (payload: { conversationId: string; event: Record<string, unknown> }) => void,
    ) => {
      const handler = (
        _: unknown,
        payload: { conversationId: string; event: Record<string, unknown> },
      ) => cb(payload);
      ipcRenderer.on("agent:event", handler);
      return () => ipcRenderer.removeListener("agent:event", handler);
    },
  },

  // Shell
  openExternal: (url: string) => ipcRenderer.invoke("shell:openExternal", url),
};

contextBridge.exposeInMainWorld("omniUI", api);

export type OmniUIBridge = typeof api;
