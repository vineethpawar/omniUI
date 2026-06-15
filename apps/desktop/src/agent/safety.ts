/**
 * Path safety. Allowlist comes from the loaded project config, not the file
 * tree. We compute every check relative to the project root passed in by the
 * desktop host (OMNIUI_PROJECT_ROOT).
 */
import { resolve, relative, isAbsolute, normalize as nodeNormalize } from "node:path";

let readPrefixes: string[] = [];
let writePrefixes: string[] = [];
let root = process.cwd();

export function configureSafety(args: {
  root: string;
  readPaths: string[];
  writePaths: string[];
}): void {
  root = args.root;
  readPrefixes = args.readPaths.map((p) => nodeNormalize(p).replace(/\\/g, "/"));
  writePrefixes = args.writePaths.map((p) => nodeNormalize(p).replace(/\\/g, "/"));
}

function toRepoRel(path: string): string {
  if (isAbsolute(path)) return relative(root, path).replace(/\\/g, "/");
  return path.replace(/^\.\//, "").replace(/\\/g, "/");
}

function isUnder(relPath: string, prefixes: string[]): boolean {
  if (relPath.startsWith("..") || relPath.includes("..")) return false;
  // Empty allowlist means "no restriction" for reads; for writes we never
  // allow an empty list -- callers should always supply explicit paths.
  if (prefixes.length === 0) return false;
  return prefixes.some((p) => relPath === p || relPath.startsWith(`${p}/`));
}

export function isReadAllowed(path: string): boolean {
  // If readPrefixes is empty, allow everything inside the project root.
  // This is the sane default: most folks want the agent to read broadly but
  // write narrowly, and writing nothing in `readPaths` shouldn't lock the
  // agent out of the codebase.
  const relPath = toRepoRel(path);
  if (relPath.startsWith("..")) return false;
  if (readPrefixes.length === 0) return true;
  return isUnder(relPath, readPrefixes);
}

export function isWriteAllowed(path: string): boolean {
  return isUnder(toRepoRel(path), writePrefixes);
}

export function repoPath(path: string): string {
  return isAbsolute(path) ? path : resolve(root, path);
}

export function getRoot(): string {
  return root;
}
