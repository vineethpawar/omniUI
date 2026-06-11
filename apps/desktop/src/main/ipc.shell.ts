import { type IpcMain, shell } from "electron";

export function registerShellHandlers(ipc: IpcMain): void {
  ipc.handle("shell:openExternal", async (_e, url: string) => {
    if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
      return { ok: false, error: "Only http(s) URLs are allowed" };
    }
    await shell.openExternal(url);
    return { ok: true };
  });
}
