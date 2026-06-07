/**
 * Filesystem-backed MDX loader.
 *
 * Content lives in `apps/docs/content/<section>/<slug>.mdx`. Each file
 * has frontmatter (title, description, order) parsed by gray-matter.
 *
 * The sidebar nav is built from the filesystem layout at build time;
 * adding a new page is just dropping a new MDX file.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = join(process.cwd(), "content");

export interface DocFrontmatter {
  title: string;
  description?: string;
  /** Lower comes first in the sidebar. Default 100. */
  order?: number;
}

export interface DocEntry {
  slug: string[];
  frontmatter: DocFrontmatter;
  source: string;
}

export interface SidebarSection {
  name: string;
  entries: Array<{ slug: string[]; title: string; description?: string; order: number }>;
}

function readDir(dir: string, prefix: string[] = []): DocEntry[] {
  const out: DocEntry[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...readDir(full, [...prefix, name]));
      continue;
    }
    if (!name.endsWith(".mdx")) continue;
    const slug = [...prefix, name.replace(/\.mdx$/, "")];
    const raw = readFileSync(full, "utf-8");
    const parsed = matter(raw);
    out.push({
      slug,
      frontmatter: parsed.data as DocFrontmatter,
      source: parsed.content,
    });
  }
  return out;
}

export function getAllDocs(): DocEntry[] {
  return readDir(CONTENT_ROOT);
}

export function getDocBySlug(slug: string[]): DocEntry | null {
  const docs = getAllDocs();
  return docs.find((d) => d.slug.join("/") === slug.join("/")) ?? null;
}

export function getSidebar(): SidebarSection[] {
  const docs = getAllDocs();
  const sections = new Map<string, SidebarSection>();
  for (const d of docs) {
    const sectionName = d.slug.length > 1 ? d.slug[0]! : "introduction";
    if (!sections.has(sectionName)) {
      sections.set(sectionName, { name: sectionName, entries: [] });
    }
    sections.get(sectionName)!.entries.push({
      slug: d.slug,
      title: d.frontmatter.title,
      description: d.frontmatter.description,
      order: d.frontmatter.order ?? 100,
    });
  }
  for (const s of sections.values()) {
    s.entries.sort((a, b) => a.order - b.order);
  }
  return Array.from(sections.values());
}
