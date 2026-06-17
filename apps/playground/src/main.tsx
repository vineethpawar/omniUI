import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@plyxui/styles";
import { ToastProvider } from "@plyxui/hooks";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
