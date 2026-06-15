import type { IpcMain } from "electron";
import {
  getSettingsSummary,
  setActiveProject,
  setTheme,
  updateSecret,
} from "./settings";

export function registerSettingsHandlers(ipc: IpcMain): void {
  ipc.handle("settings:get", () => getSettingsSummary());

  ipc.handle("settings:setAnthropicKey", (_e, value: string | null) => {
    updateSecret("anthropicApiKey", value);
    return getSettingsSummary();
  });

  ipc.handle("settings:setFigmaToken", (_e, value: string | null) => {
    updateSecret("figmaAccessToken", value);
    return getSettingsSummary();
  });

  ipc.handle("settings:setActiveProject", (_e, root: string | null) => {
    setActiveProject(root);
    return getSettingsSummary();
  });

  ipc.handle("settings:setTheme", (_e, theme: "light" | "dark" | "system") => {
    setTheme(theme);
    return getSettingsSummary();
  });
}
