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
      { hostname: "cdn.shopify.com" },
      { hostname: "i.pinimg.com" },
      { hostname: "erp-ncst.s3.us-east-1.amazonaws.com" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
