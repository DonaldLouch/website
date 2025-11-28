import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // cacheComponents: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    serverActions: {
      bodySizeLimit: 2e10,
    },
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  serverExternalPackages: ["@aws-sdk/client-s3", "@aws-sdk/s3-presigned-post"],
  images: {
    qualities: [1, 25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "sjc1.vultrobjects.com",
      },
      {
        protocol: "https",
        hostname: "donald-louch.sjc1.vultrobjects.com",
      },
      {
        protocol: "https",
        hostname: "donaldlouch.s3.us-west-004.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "f004.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-004.backblazeb2.com",
      },
    ],
  },
}

export default nextConfig