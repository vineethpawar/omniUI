import { ThemeProvider, useTheme } from "@omniui/theme";
import { Box } from "@omniui/primitives";

function Demo() {
  const { mode, toggleTheme, colors } = useTheme();
  return (
    <Box surface="primary" padding="lg" style={{ minHeight: "100vh" }}>
      <Box
        surface="raised"
        padding="lg"
        radius="lg"
        style={{ maxWidth: 640, margin: "40px auto", color: colors.text }}
      >
        <h1 style={{ marginTop: 0 }}>omniUI playground</h1>
        <p style={{ color: colors.textMuted }}>
          Current mode: <strong>{mode}</strong>. Polymorphic Box rendering as div, button, and a.
        </p>

        <Box surface="sunken" padding="md" radius="md" style={{ marginBottom: 16 }}>
          <code>{"<Box surface=\"sunken\" padding=\"md\" radius=\"md\" />"}</code>
        </Box>

        <Box
          as="button"
          surface="raised"
          padding="md"
          radius="md"
          onClick={toggleTheme}
          style={{
            border: `1px solid ${colors.stroke}`,
            color: colors.text,
            cursor: "pointer",
          }}
        >
          Toggle theme
        </Box>

        <Box
          as="a"
          href="https://github.com/vineethpawar/omniUI"
          surface="none"
          padding="sm"
          style={{ display: "inline-block", marginLeft: 12, color: colors.primaryOrange }}
        >
          repo
        </Box>
      </Box>
    </Box>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  );
}
