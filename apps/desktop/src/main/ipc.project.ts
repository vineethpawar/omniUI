import type { IpcMain } from "electron";
import { dialog } from "electron";
import { loadProject } from "./project";
import { setActiveProject } from "./settings";

export function registerProjectHandlers(ipc: IpcMain): void {
  ipc.handle("project:pickFolder", async () => {
    const out = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      title: "Pick a project root",
    });
    if (out.canceled || out.filePaths.length === 0) return { canceled: true } as const;
    return { canceled: false, root: out.filePaths[0]! } as const;
  });

  ipc.handle("project:load", (_e, root: string) => {
    const result = loadProject(root);
    if ("error" in result) return { ok: false, error: result.error } as const;
    setActiveProject(result.root);
    return { ok: true, project: result } as const;
  });

  ipc.handle("project:reload", (_e, root: string) => {
    const result = loadProject(root);
    if ("error" in result) return { ok: false, error: result.error } as const;
    return { ok: true, project: result } as const;
  });
}
