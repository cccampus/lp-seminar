import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ワークスペース root を明示してロックファイル誤検出を回避
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
