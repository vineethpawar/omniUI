import { getAllReleases, formatDate, formatBytes, parseNpmTag, type Release } from "../lib/github";
import { BrandMark } from "../components/BrandMark";

export const revalidate = 3600; // rebuild hourly when running in production

export default async function ReleasesPage() {
  const data = await getAllReleases();

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "64px 24px 120px" }}>
      <Header />
      {data.map((r) => (
        <RepoBlock key={r.repo} repo={r.repo} description={r.description} releases={r.releases} />
      ))}
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <BrandMark size={32} />
        <span style={{ fontWeight: 700 }}>plyxui</span>
        <span className="pill" style={{ marginLeft: "auto" }}>Releases</span>
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
        Every shipped version.
      </h1>
      <p className="muted" style={{ fontSize: 15 }}>
        Built from each repo&apos;s GitHub releases. npm packages get install snippets;
        desktop builds get direct download links.{" "}
        <a href="https://plyxui-docs.vercel.app/" style={{ color: "var(--orange)" }}>
          back to docs
        </a>
      </p>
    </div>
  );
}

function RepoBlock({
  repo,
  description,
  releases,
}: {
  repo: string;
  description: string;
  releases: Release[];
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div
        style={{
          paddingBottom: 16,
          marginBottom: 20,
          borderBottom: "1px solid var(--stroke-soft)",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
          <a href={`https://github.com/${repo}`} style={{ color: "var(--text)" }}>
            {repo}
          </a>
        </h2>
        <p className="muted" style={{ fontSize: 13 }}>{description}</p>
      </div>
      {releases.length === 0 ? (
        <EmptyState repo={repo} />
      ) : (
        releases.map((rel) => <ReleaseCard key={rel.id} repo={repo} release={rel} />)
      )}
    </section>
  );
}

function EmptyState({ repo }: { repo: string }) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px dashed var(--stroke)",
        borderRadius: 10,
        color: "var(--dim)",
        fontSize: 14,
      }}
    >
      No releases yet. They&apos;ll show up here automatically once{" "}
      <span className="code">changesets/action</span> publishes the first version, or once a
      tagged release is cut on{" "}
      <a href={`https://github.com/${repo}/releases`}>{repo}</a>.
    </div>
  );
}

function ReleaseCard({ repo, release }: { repo: string; release: Release }) {
  const npm = parseNpmTag(release.tag_name);
  return (
    <article
      style={{
        padding: "20px 22px",
        marginBottom: 12,
        border: "1px solid var(--stroke)",
        borderRadius: 12,
        background: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>
          {npm ? (
            <>
              <span style={{ color: "var(--orange)" }}>{npm.pkg}</span>
              <span style={{ color: "var(--muted)" }}> @ </span>
              <span>{npm.version}</span>
            </>
          ) : (
            release.name || release.tag_name
          )}
        </h3>
        {release.prerelease ? (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--orange)",
              padding: "1px 7px",
              borderRadius: 999,
              border: "1px solid var(--orange)",
              textTransform: "uppercase",
            }}
          >
            pre
          </span>
        ) : null}
        <span style={{ marginLeft: "auto", color: "var(--dim)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
          {formatDate(release.published_at)}
        </span>
      </div>

      {npm ? (
        <pre className="code-block" style={{ marginBottom: 10 }}>{`npm install ${npm.pkg}@${npm.version}`}</pre>
      ) : null}

      {release.body ? (
        <details style={{ marginBottom: 12 }}>
          <summary
            style={{
              cursor: "pointer",
              listStyle: "none",
              fontSize: 12,
              color: "var(--muted)",
              padding: "4px 0",
            }}
          >
            release notes &nbsp;<span style={{ color: "var(--orange)" }}>+</span>
          </summary>
          <pre
            style={{
              marginTop: 8,
              fontFamily: "var(--font)",
              fontSize: 13,
              whiteSpace: "pre-wrap",
              color: "var(--text)",
              padding: "10px 12px",
              background: "var(--elev)",
              border: "1px solid var(--stroke-soft)",
              borderRadius: 8,
            }}
          >
            {release.body}
          </pre>
        </details>
      ) : null}

      {release.assets.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          {release.assets.map((a) => (
            <a
              key={a.name}
              href={a.browser_download_url}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                background: "var(--bg)",
                border: "1px solid var(--stroke)",
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", flex: 1, color: "var(--orange)" }}>
                {a.name}
              </span>
              <span className="muted" style={{ fontSize: 11 }}>{formatBytes(a.size)}</span>
              <span className="muted" style={{ fontSize: 11 }}>
                {a.download_count} download{a.download_count === 1 ? "" : "s"}
              </span>
            </a>
          ))}
        </div>
      ) : null}

      <a
        href={release.html_url}
        style={{ fontSize: 12, color: "var(--dim)" }}
      >
        view on github &nbsp;&rsaquo;
      </a>
    </article>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "24px 0",
        borderTop: "1px solid var(--stroke-soft)",
        color: "var(--dim)",
        fontSize: 12,
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <a href="https://plyxui.vercel.app/">landing</a>
      <a href="https://plyxui-docs.vercel.app/">docs</a>
      <a href="https://github.com/vineethpawar/plyxui">repo</a>
      <span style={{ marginLeft: "auto" }}>built from the GitHub Releases API</span>
    </footer>
  );
}
