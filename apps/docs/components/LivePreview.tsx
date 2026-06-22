"use client";

/**
 * <LivePreview /> renders an editable in-browser sandbox of a plyxui
 * snippet next to its rendered output. Powered by Sandpack — every page
 * boots a real esbuild + bundler inside an iframe and resolves @plyxui/*
 * from npm.
 *
 * Use from MDX:
 *
 *   <LivePreview code={`
 *     import { Box, Text } from "@plyxui/primitives";
 *     export default function App() {
 *       return <Box surface="raised" padding="md"><Text>Hi</Text></Box>;
 *     }
 *   `} />
 *
 * `code` is the entire App.tsx body. The wrapper provides the
 * ThemeProvider + a root mount; consumers don't repeat the boilerplate.
 */
import { Sandpack } from "@codesandbox/sandpack-react";

interface LivePreviewProps {
  code: string;
  /** Override which packages get installed in the sandbox. Defaults to the foundation set. */
  dependencies?: Record<string, string>;
  /** Default: ~280 px. Bump for bigger demos. */
  height?: number;
  /** Toggle the side-by-side code panel. Default true. */
  showCode?: boolean;
}

const DEFAULT_DEPS: Record<string, string> = {
  "@plyxui/core": "^0.3.0",
  "@plyxui/styles": "^0.3.0",
  "@plyxui/primitives": "^0.4.0",
  "@plyxui/icons": "^0.3.0",
  "@plyxui/hooks": "^0.3.0",
  "@plyxui/comps": "^0.3.0",
  "@plyxui/forms": "^0.3.0",
  "@plyxui/layouts": "^0.3.0",
};

const INDEX_TSX = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@plyxui/styles";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>plyxui preview</title>
  </head>
  <body><div id="root"></div></body>
</html>`;

export function LivePreview({ code, dependencies, height = 320, showCode = true }: LivePreviewProps) {
  return (
    <div style={{ margin: "20px 0" }}>
      <Sandpack
        template="vite-react-ts"
        files={{
          "/App.tsx": { code: code.trim() },
          "/index.tsx": INDEX_TSX,
          "/index.html": INDEX_HTML,
        }}
        customSetup={{
          dependencies: { ...DEFAULT_DEPS, ...dependencies },
          entry: "/index.tsx",
        }}
        options={{
          showLineNumbers: true,
          showInlineErrors: true,
          showTabs: false,
          editorHeight: height,
          editorWidthPercentage: showCode ? 50 : 0,
          classes: { "sp-wrapper": "plyxui-sandpack" },
        }}
        theme="light"
      />
    </div>
  );
}
