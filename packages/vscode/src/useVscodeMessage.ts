/**
 * useVscodeMessage — subscribe to messages from the extension host.
 *
 * VS Code extensions post messages to webviews via `webview.postMessage()`
 * which the webview receives as a `window.message` event. This hook
 * wires that for you and gives you typed handler ergonomics.
 *
 *   useVscodeMessage<{ type: "refresh" }>((msg) => {
 *     if (msg.type === "refresh") refetch();
 *   });
 */
import { useEffect } from "react";

export function useVscodeMessage<M = unknown>(handler: (msg: M) => void): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMessage = (event: MessageEvent) => handler(event.data as M);
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [handler]);
}
