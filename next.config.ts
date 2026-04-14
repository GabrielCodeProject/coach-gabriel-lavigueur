import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// trailingSlash and output:"export" are GitHub Pages deployment concerns.
// Turbopack dev server 404s on all trailing-slash routes, so both are
// disabled in development.
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProduction ? "export" : undefined,
  trailingSlash: isProduction,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
