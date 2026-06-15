/**
 * Post-build: nest the static export under /docs so the file paths match
 * the basePath. Next's static export with basePath writes HTML at the root
 * but links inside the HTML use /docs/_next/... and /docs/<page>. Without
 * this move, /docs/... requests 404 because there's no /docs/ directory.
 *
 * After this script: out/docs/index.html + out/docs/_next/... + everything
 * is reachable at the same /docs/<x> paths used in the HTML.
 */
import { readdirSync, renameSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const TARGET = join(OUT, "docs");

if (!existsSync(OUT)) {
  console.error("[postbuild] no out/ directory; did the next build succeed?");
  process.exit(1);
}

mkdirSync(TARGET, { recursive: true });

for (const entry of readdirSync(OUT)) {
  if (entry === "docs") continue;
  const src = join(OUT, entry);
  const dest = join(TARGET, entry);
  renameSync(src, dest);
}

console.log(`[postbuild] moved everything into ${TARGET}/`);
