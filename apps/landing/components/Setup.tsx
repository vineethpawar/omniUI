export default function Setup() {
  return (
    <section className="section" id="install">
      <p className="eyebrow">From zero to a styled screen</p>
      <h2 className="h2">Five minutes. No build step, no compiler, no codegen.</h2>
      <p className="lead" style={{ marginBottom: 48 }}>
        plyxui is a regular npm install. No vendored copy-paste. No special bundler config. No nativewind setup.
      </p>
      {[
        {
          n: 1,
          title: "Install",
          body: "Pick the layers you need. Foundation is three packages.",
          code: "npm install @plyxui/core @plyxui/styles @plyxui/primitives",
        },
        {
          n: 2,
          title: "Wrap",
          body: "ThemeProvider once at the root. It picks up OS preference until the user toggles.",
          code: `import { ThemeProvider } from "@plyxui/styles";

<ThemeProvider>
  <App />
</ThemeProvider>`,
        },
        {
          n: 3,
          title: "Use a primitive",
          body: "Polymorphic Box plus typed Text and Button covers the first 80% of any screen.",
          code: `import { Box, Text, Button } from "@plyxui/primitives";

<Box surface="primary" padding="lg">
  <Text size="xl" weight="bold">Hello, plyxui.</Text>
  <Button>Get started</Button>
</Box>`,
        },
        {
          n: 4,
          title: "Add icons + the rest",
          body: "Register the seed pack at boot, augment names if you need autocomplete.",
          code: `import { registerIcons } from "@plyxui/icons";
import { seedPack } from "@plyxui/icons/pack";

registerIcons(seedPack);`,
        },
      ].map((step) => (
        <div
          key={step.n}
          className="setup-step"
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 24,
              fontWeight: 800,
              color: "var(--orange)",
            }}
          >
            0{step.n}
          </div>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
            <p className="muted">{step.body}</p>
          </div>
          <pre className="codeblock" style={{ margin: 0, fontSize: 12.5 }}>
            {step.code}
          </pre>
        </div>
      ))}
    </section>
  );
}
