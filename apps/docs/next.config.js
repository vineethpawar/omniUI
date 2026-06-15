/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // Nested under /docs on the canonical landing domain. The docs subdomain
  // (omniui-docs.vercel.app) also serves under /docs/ as a result; the
  // landing's Vercel rewrite proxies /docs/* to the docs subdomain.
  basePath: "/docs",
  assetPrefix: "/docs",
  images: { unoptimized: true },
};

export default nextConfig;
