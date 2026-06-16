/**
 * GitHub releases fetcher. Server-only (runs at build time during static export).
 *
 * No auth: 60 req/hr unauthenticated, plenty for a static build that hits
 * 2-3 repos. If we ever need higher limits, add a token via env.
 */

export interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  html_url: string;
  assets: ReleaseAsset[];
}

export interface RepoReleases {
  repo: string;
  description: string;
  releases: Release[];
}

const REPOS: Array<{ repo: string; description: string }> = [
  {
    repo: "vineethpawar/omniUI",
    description: "Cross-platform component library. Eight npm packages, per-package install.",
  },
  {
    repo: "vineethpawar/ai-polish-desktop",
    description: "Desktop app for AI-driven design system polish. Mac DMG.",
  },
];

async function fetchReleases(repo: string): Promise<Release[]> {
  const url = `https://api.github.com/repos/${repo}/releases`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    if (process.env["NODE_ENV"] !== "production") {
      console.warn(`[releases] ${repo} ${res.status}: ${await res.text()}`);
    }
    return [];
  }
  return (await res.json()) as Release[];
}

export async function getAllReleases(): Promise<RepoReleases[]> {
  return Promise.all(
    REPOS.map(async (r) => ({
      repo: r.repo,
      description: r.description,
      releases: await fetchReleases(r.repo),
    })),
  );
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * If the tag looks like `@omniui/<pkg>@x.y.z`, parse it. Used to detect
 * npm-style releases created by changesets/action.
 */
export function parseNpmTag(tag: string): { pkg: string; version: string } | null {
  const m = tag.match(/^(@?[^@]+)@(.+)$/);
  if (!m) return null;
  return { pkg: m[1]!, version: m[2]! };
}
