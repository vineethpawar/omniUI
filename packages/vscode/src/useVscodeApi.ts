/**
 * useVscodeApi — minimal wrapper around `acquireVsCodeApi()`.
 *
 * VS Code only allows the API to be acquired ONCE per webview. Most
 * apps need to call it from multiple components — this hook caches
 * the result on first call and returns the same object thereafter.
 *
 * The shape mirrors VS Code's runtime API:
 *
 *   const vscode = useVscodeApi();
 *   vscode?.postMessage({ type: "save", payload });
 *   vscode?.setState({ draft: text });
 *   const restored = vscode?.getState();
 *
 * Returns `null` when called outside a VS Code webview (so tests +
 * Storybook + the docs site all render cleanly without exploding).
 */

export interface VsCodeApi<TState = unknown> {
  postMessage<M = unknown>(msg: M): void;
  setState(state: TState): void;
  getState(): TState | undefined;
}

declare global {
  interface Window {
    acquireVsCodeApi?: <TState = unknown>() => VsCodeApi<TState>;
    __plyxui_vscode_api__?: VsCodeApi<unknown>;
  }
}

export function useVscodeApi<TState = unknown>(): VsCodeApi<TState> | null {
  if (typeof window === "undefined") return null;
  if (!window.acquireVsCodeApi) return null;
  if (!window.__plyxui_vscode_api__) {
    try {
      window.__plyxui_vscode_api__ = window.acquireVsCodeApi();
    } catch {
      return null;
    }
  }
  return window.__plyxui_vscode_api__ as VsCodeApi<TState>;
}
