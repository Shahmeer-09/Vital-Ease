import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  images: {
    domains: ['cloud.appwrite.io'], // Add the hostname here
  },
};

export default nextConfig;
