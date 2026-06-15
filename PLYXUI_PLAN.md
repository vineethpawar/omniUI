# plyxui plan

scratchpad for me. lives in the repo so i can pick up where i left off. don't link from the readme.

last touched: 2026-06-15 (extracted phase 9 to its own repo, renamed theme to styles)

## the pitch

cross-platform component library (react + react-native via .ts / .native.ts), branded tokens, autocomplete-as-spec. ships with a first-party MCP server so coding agents can install components by name. ships with a small electron app that lets anyone point at their figma + repo and start polishing.

the spice on top: every consumer can publish their themed remix and share with a single link. like uiverse, but the unit of sharing is a complete theme + comp override that drops into another app's ThemeProvider.

## product hunt north star

one tagline. one demo gif. three audiences:
- the dev who wants a typed, agent-friendly DS
- the designer who wants their figma reflected in code without filing tickets
- the indie who wants a great starting theme they can remix

three reasons to upvote:
- types as docs (no stringly-typed token names ever)
- bring your own figma + ai key, run it locally
- the only DS with a first-party MCP server

## phases

| # | name | status | notes |
|---|---|---|---|
| 0 | foundation | shipped | tokens, theme web+native, polymorphic Box, mcp stub, playground |
| 1 | hardening + small wins | in progress | changesets pipeline, prefers-color-scheme, docs in source |
| 2 | icons | partial | registry pattern works, seed pack of 20, native parity wired |
| 3 | more primitives | partial | Text, Stack, Flex, Input, Button -- web first, native trailing |
| 4 | layouts + navigator | partial | AppShell, Sidebar, router-agnostic wrapper |
| 5 | composites | partial | Modal, Dropdown landed; Tooltip, Tabs, Toast pending |
| 6 | docs site | partial | next app scaffold, MDX, sidebar nav, three pages done |
| 7 | landing | partial | hero + features + setup + faq done; demo gif pending |
| 8 | theme remix platform | not started | the uiverse-y thing, separate cloud surface, later |
| 9 | ai desktop app | spun out | now its own repo: github.com/vineethpawar/ai-polish-desktop. plyxui stays focused on the library. |

## phase 1 punchlist (foundation hardening)

- [x] changesets config in place (already)
- [x] `publishConfig: public` on every package.json that ships
- [ ] turbo build pipeline emits dist/ correctly for each pkg
- [ ] add a postbuild script that copies the README to dist/
- [x] ThemeProvider listens to `prefers-color-scheme` when no localStorage entry
- [x] document module augmentation in a single visible README block (not buried in core/tokens/colors.ts header)
- [ ] add a node 20 + 22 CI matrix
- [ ] `npm run check-types` should pass clean -- currently flaky on the polymorphic ref forward cast, look at it

## phase 2 punchlist (icons)

- [x] Icon component with a registry pattern (no per-icon imports forced on consumers)
- [x] seed pack of 20 strokeable icons in @plyxui/icons
- [x] native Icon variant -- svg in react-native via react-native-svg path
- [ ] codegen script so users can drop SVGs into `icons/source/*.svg` and get typed icon names
- [ ] add a sprite-sheet build target so heavy users can avoid the per-icon tree-shake cost

## phase 3 punchlist (primitives)

| comp | web | native | docs | notes |
|---|---|---|---|---|
| Box | done | done | done | reference primitive, polymorphic |
| Text | done | done | partial | size scale: xs/sm/md/lg/xl + weight var |
| Stack | done | done | partial | direction + spacing; web uses flex |
| Flex | done | done | - | shorthand wrapper over Stack |
| Input | done | done | - | uncontrolled + controlled; defer Field for layouts phase |
| Button | done | done | - | variants: primary, ghost, link, danger |
| Image | - | - | - | next |
| Divider | - | - | - | next |
| Spinner | - | - | - | next |

## phase 4 punchlist (layouts + navigator)

- [x] AppShell + Sidebar primitives
- [x] router-agnostic wrapper: takes a routes array, returns a `<Routes>` for react-router or a stack for react-navigation depending on platform
- [ ] react-router-dom v7 path tested end to end
- [ ] react-navigation native stack tested end to end
- [ ] decide: do layouts ship with their own navigator opinions or stay pure?

## phase 5 punchlist (composites)

| comp | status | notes |
|---|---|---|
| Modal | done (web) | uses dialog + focus trap, native pending |
| Dropdown | done (web) | radix-select under the hood, native pending |
| Tooltip | pending | radix-tooltip web, gesture-based native |
| Tabs | pending | |
| Toast | pending | |
| Drawer | pending | for the docs nav on small screens |

## phase 6 punchlist (docs)

- [x] next 16 + MDX scaffold at `apps/docs`
- [x] sidebar nav from a content tree
- [x] getting-started page
- [x] /primitives/Box reference page
- [x] /theme/ThemeProvider reference page
- [x] /icons/Icon reference page
- [x] /layouts/AppShell reference page
- [ ] live preview per comp (sandpack or codesandbox iframe)
- [ ] llms.txt at /llms.txt -- one big concatenated doc for agents
- [ ] /mcp page with one-liner install + agent transcripts

## phase 7 punchlist (landing)

- [x] hero + why + how-it-works
- [x] features grid
- [x] architecture diagram + decisions cards
- [x] agent mode section (MCP server + AI desktop app pitch)
- [x] remix layer section
- [x] vs alternatives table (shadcn / Radix / Tamagui / RN Reusables)
- [x] setup steps
- [x] roadmap table
- [x] faq
- [x] CTA + footer
- [ ] real demo gif (record after Text + Button + Modal land in playground)
- [ ] testimonials from at least 3 friends running the alpha

## phase 8 punchlist (theme remix platform)

deferring. requires hosting + auth + a share schema. write the spec on a saturday after launch.

shape i'm imagining:
- a remix is a json bundle: token overrides + per-comp variant overrides
- share link = `https://plyxui.dev/r/<short-id>` (or self-host the short-link service)
- consuming a remix = a single `<ThemeProvider remixUrl="...">` prop
- creator can lock the remix (force-pull) or open it (let consumers tweak)

## phase 9 ai desktop app -- moved out

extracted to its own repo: https://github.com/vineethpawar/ai-polish-desktop

the desktop app was the AI Polish product; plyxui is the component library. mixing them in one repo was confusing the pitch (and the install surface). they're sibling products now. the desktop app can be used on any codebase, plyxui or not, and the library doesn't ship any agent code in the foundation packages.

if i want a cross-link, the landing's "agent layer" section now points at ai-polish-desktop as a "see also".

## release plan

- 0.1.0: tokens + theme + Box. tagged on init/phase-0 branch. (current)
- 0.2.0: phase 2 + 3 wrapped. icons + 6 primitives, web + native.
- 0.3.0: phase 4 + 5. layouts + composites. docs site soft-launch.
- 0.4.0: landing live, llms.txt, mcp install flow. quiet beta on twitter.
- 1.0.0: theme remix + ai desktop. product hunt launch day.

## decisions log

i'll keep adding to this so future-me doesn't re-litigate things i already chose.

- **cva for variants** -- looked at vanilla-extract, tamagui's `styled`, and rolling our own. cva is small, no compiler step, lets the consumer add CSS later. picked it.
- **tokens are module-augmentable** -- the OmniColorTokens interface can be extended via `declare module`. means consumers don't have to fork the lib to add brand tokens.
- **.native.tsx for splits, not a flag** -- metro auto-resolves, no runtime check. clean.
- **MCP is first-party, not third-party** -- the lib ships @plyxui/mcp. it's the cheapest way to be agent-friendly that isn't gimmicky.
- **no styled-components, no emotion** -- runtime CSS-in-JS is a hot loop in big DS. style prop + cva is enough.
- **changesets for releases** -- the only release tool i've found that doesn't make me hate it.
