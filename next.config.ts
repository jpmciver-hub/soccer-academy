import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/soccer-academy",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
