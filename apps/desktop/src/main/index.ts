/**
 * omniUI desktop -- main process.
 *
 * One BrowserWindow, three logical surfaces in the renderer (Settings,
 * Project, Chat). The main process owns the long-running agent subprocess,
 * persistent settings, and project root resolution.
 */
import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { registerSettingsHandlers } from "./ipc.settings";
import { registerProjectHandlers } from "./ipc.project";
import { registerAgentHandlers } from "./ipc.agent";
import { registerShellHandlers } from "./ipc.shell";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 920,
    minHeight: 560,
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    backgroundColor: "#0A0A0A",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (!app.isPackaged) win.webContents.openDevTools({ mode: "detach" });
  return win;
}

app.whenReady().then(() => {
  registerSettingsHandlers(ipcMain);
  registerProjectHandlers(ipcMain);
  registerAgentHandlers(ipcMain);
  registerShellHandlers(ipcMain);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
