/** Thin typed wrapper for the preload-exposed bridge. */
import type { OmniUIBridge } from "../preload";

declare global {
  interface Window {
    omniUI: OmniUIBridge;
  }
}

export const omniUI: OmniUIBridge = window.omniUI;
