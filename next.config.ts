import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "bqc19l1fhj.ufs.sh",
      },
      { hostname: "s3-alpha-sig.figma.com" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
