# @omniui/desktop

omniUI's desktop tool. Pick a project folder, paste your Anthropic key, point the agent at a Figma frame. Apply or Reject every write.

This is the productized version of the design polish workflow we shipped inside a specific Electron app first. Same agent loop, same Apply/Reject diff preview, same safety guardrails -- but here the project root, the write allowlist, and the screen manifest all come from a config file at the chosen folder's root, so it works against any repo.

## Quick start

```bash
cd apps/desktop
npm install
npm run start
```

The first launch lands on the Project tab. Pick a folder containing an `omniui.config.json` at its root. Drop your Anthropic key on the Settings tab. Click Chat. Send a task.

## omniui.config.json

The bare minimum:

```json
{
  "name": "My App",
  "writePaths": ["src/components", "src/screens"],
  "screens": [
    {
      "path": "/",
      "name": "Home",
      "sourceFile": "src/screens/Home.tsx"
    }
  ]
}
```

Fuller example:

```json
{
  "name": "My App",
  "readPaths": ["src", "design"],
  "writePaths": ["src/components", "src/screens", "design/tokens"],
  "screens": [
    {
      "path": "/",
      "name": "Home",
      "group": "App",
      "sourceFile": "src/screens/Home.tsx",
      "figma": {
        "light": "https://www.figma.com/design/.../?node-id=...",
        "dark":  "https://www.figma.com/design/.../?node-id=..."
      },
      "description": "Hero, three feature cards, recent activity table."
    }
  ],
  "figmaDumpsDir": "design/figma-dumps",
  "systemPromptAppend": "All text must use the Manrope font family. The brand accent is #6D5BFF."
}
```

| Field | Required | What |
|---|---|---|
| `name` | yes | Display name. |
| `writePaths` | yes | Repo-relative paths the agent may write to. Everything else is hard-denied. |
| `screens` | yes | Per-route manifest. Each entry maps a route or page to a source file. |
| `readPaths` | no | Repo-relative paths the agent may read. If omitted, reads anywhere inside the project root. |
| `figmaDumpsDir` | no | Repo-relative folder of pre-downloaded Figma YAML/JSON. Default `design-system/figma-dumps`. |
| `systemPromptAppend` | no | Text appended to the agent's system prompt. Use it to encode project conventions. |

## Architecture

- **Main process** (`src/main/`) owns settings persistence, project loading, and the agent subprocess. Spawns the agent CLI per chat turn.
- **Preload** (`src/preload.ts`) exposes a typed bridge to the renderer. Secrets never round-trip through the renderer in full.
- **Renderer** (`src/renderer/`) is three views (Chat, Project, Settings) with a sidebar.
- **Agent CLI** (`src/agent/`) is the spawned subprocess. Uses the Claude Agent SDK with a PreToolUse hook that emits `>>OAE write_pending` and awaits a `<<DEC` decision on stdin.

## Why a subprocess

Two reasons. The agent SDK is happiest with Node, and Electron's main process is sharing that runtime with a bunch of GUI concerns -- isolating the agent lets us SIGTERM it cleanly without taking down the window. And once the desktop work matures, swapping the agent runtime (e.g. for a local model server) is just changing one entry path.

## What lives in the BXI Studio version vs here

The BXI Studio repo has a tighter, in-app version of this same workflow (`app/apps/ai-polish/` + the in-app drawer at `app/packages/ui/comps/src/common/AIPolishChat.tsx`). That one is wired to BXI's specific screen manifest, design system, and Electron host. This app is the productized cousin: generic project loader, BYO manifest, packaged for any team.

If you're contributing to BXI Studio itself, use that flow. Everywhere else, use this.

## Open questions

- Conversation persistence across runs (the BXI version doesn't have this either; same TODO).
- Project-scoped MCP server registration so apps can plug in their own tools.
- Per-screen quick actions (right-click a screen in the manifest to "polish this against Figma").
