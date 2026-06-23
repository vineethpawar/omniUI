# plyxui — Product Hunt launch kit

Everything I'll lean on the day plyxui ships on Product Hunt.
The technical work is done; this file is the marketing scaffolding.

## Tagline (≤60 chars)

> **One component library. Web, native, agent-aware.**

Backup taglines (rotate if A/B testing the PH listing):
- Typed, branded, cross-platform components — agent-aware via MCP.
- React + React Native, one source tree. First-party MCP server.
- Cross-platform UI with a built-in MCP server for coding agents.

## Three reasons to upvote

1. **Same source tree, web + native.** Every primitive ships a `.ts` and a `.native.tsx`. Metro picks the right one — no fork in your codebase, no parallel design system.
2. **First-party MCP server.** `npx -y @plyxui/mcp` and Claude Desktop / Cursor / Cline / Continue can list, search, get, install, and lint plyxui components by name. The only DS I'm aware of that ships this.
3. **Live, edit-on-the-page docs.** Every component page on plyxui.com opens with a real Sandpack — change a prop, see the result, fork it. The library running on the docs *is* the library you'd install.

## Submission fields

| Field | Value |
|---|---|
| Name | plyxui |
| Tagline | One component library. Web, native, agent-aware. |
| URL | https://plyxui.com |
| Topics | Developer Tools, Design Tools, Open Source |
| Pricing | Free / open source |
| Maker | Vineeth Pawar (@vineethp14) |

### Description (long form, the body of the listing)

> plyxui is a typed, branded, cross-platform React component library with a first-party MCP server. Same source tree powers web (React) and native (React Native) via a `.ts` / `.native.tsx` split — Metro picks the right one. Branded tokens use TypeScript module augmentation so `colors.brandTeal` autocompletes everywhere. And it ships an MCP server so coding agents can install components by name — drop `npx -y @plyxui/mcp` into Claude Desktop, Cursor, Cline, or Continue and the agent gets `plyxui_list_components`, `plyxui_get_component`, `plyxui_install`, `plyxui_lint`, and four more tools out of the box.
>
> Every component doc page on plyxui.com opens with a live Sandpack editor — edit a prop, watch the rendered output update inline. The team-chat dashboard demo runs the actual library inside a StackBlitz WebContainer on the homepage Hero; the React Native sibling runs in Expo Snack. Eleven packages, pre-bundled `dist/*.{js,cjs,d.ts}` via tsup, full TS intellisense.
>
> Free. MIT. Built between full-time things.

## Demo assets

- **Hero animation:** [plyxui.com](https://plyxui.com) — live StackBlitz dashboard above the fold
- **Launch page:** [plyxui.com/launch/](https://plyxui.com/launch/) — Product Hunt-tuned variant
- **OG card:** Auto-generated via Next's ImageResponse at [plyxui.com/opengraph-image](https://plyxui.com/opengraph-image)
- **Web demo:** [stackblitz.com/github/vineethpawar/plyxui-demo](https://stackblitz.com/github/vineethpawar/plyxui-demo)
- **Native demo:** [snack.expo.dev/rxtGc5Lls8OUbbmv2_RhK](https://snack.expo.dev/rxtGc5Lls8OUbbmv2_RhK)
- **MCP CLI:** `npx -y @plyxui/mcp`
- **Source:** [github.com/vineethpawar/plyxui](https://github.com/vineethpawar/plyxui)

## Post drafts

### Tweet A — the unveil (T-0)

> Shipped plyxui today.
>
> One component library, same source tree for React and React Native.
>
> First-party MCP server so coding agents install components by name.
>
> Every doc page is a live editor.
>
> 11 packages on npm. Free. MIT.
>
> 👉 https://plyxui.com

### Tweet B — the MCP angle (T+2h)

> plyxui's differentiator: it's the first design system I know of that ships a real MCP server.
>
> ```
> npx -y @plyxui/mcp
> ```
>
> Wire it into Claude Desktop / Cursor / Cline / Continue and the agent can:
>
> • list every component by category
> • get full prop tables + examples
> • install by name
> • lint your code for plyxui usage
>
> https://plyxui.com

### Tweet C — the live docs (T+5h)

> The plyxui docs are not screenshots.
>
> Every component page opens with a real Sandpack editor. Edit a prop, see the result, fork it. The library on the docs IS the library you install.
>
> Browse → https://plyxui.com/docs/primitives/box/

### LinkedIn (one longer post)

> Today I'm launching plyxui on Product Hunt.
>
> It's a typed, branded, cross-platform component library. Same source tree powers web (React) and native (React Native). Eleven packages on npm — primitives, comps, layouts, forms, hooks, screens, plugins, icons, navigator, styles, plus an MCP server.
>
> Three things I wanted to get right:
>
> 1) **No design-system fork by platform.** Metro picks .native.tsx from the same source. Web and mobile teams write the same JSX.
>
> 2) **Branded tokens that autocomplete.** TypeScript module augmentation means `colors.brandTeal` gets full intellisense once you register it — no string keys.
>
> 3) **Agents are users too.** The MCP server lets Claude Desktop / Cursor / Cline pick components by name. The differentiation vs every other DS.
>
> If you want to play: every component doc page on plyxui.com opens a real Sandpack editor. The dashboard demo on the homepage runs the actual library in a StackBlitz WebContainer.
>
> Free. MIT. Built between full-time things.
>
> Product Hunt: <fill on the day>
> Docs: https://plyxui.com

## Checklist for launch day

- [ ] Schedule PH submission for 00:01 PT
- [ ] Verify `plyxui.com` resolves in incognito, fresh browser, no cache
- [ ] Verify `plyxui.com/llms.txt` returns 200
- [ ] Verify `npx -y @plyxui/mcp tools` lists 8 tools
- [ ] StackBlitz embed boots inside the homepage Hero (lazy load fine)
- [ ] Snack embed renders on /docs/getting-started/playground/
- [ ] Every component doc page has a working LivePreview
- [ ] OG card renders correctly on twitter.com/share and linkedin.com/sharing/share-offsite
- [ ] PR thread + Twitter thread + LinkedIn post ready as drafts
- [ ] Two backup community channels to share in (Indie Hackers / Reactiflux)
- [ ] Discord/Slack notification set so I can field comments fast
