import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllDocs, getDocBySlug } from "../../lib/mdx";

const MDX_OPTIONS = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllDocs().map((d) => ({ slug: d.slug }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return (
    <>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--orange)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {(slug[0] ?? "").replace(/-/g, " ")}
      </div>
      <h1>{doc.frontmatter.title}</h1>
      {doc.frontmatter.description ? (
        <p style={{ fontSize: 17, color: "var(--muted)" }}>{doc.frontmatter.description}</p>
      ) : null}
      <hr style={{ border: "none", borderTop: "1px solid var(--stroke-soft)", margin: "28px 0" }} />
      <MDXRemote source={doc.source} options={MDX_OPTIONS} />
    </>
  );
}
