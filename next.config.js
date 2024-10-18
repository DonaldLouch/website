/** @type {import('next').NextConfig} */

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [],
//   },
// })

// module.exports = withMDX({
//   pageExtensions: ['js', 'jsx', 'md', 'mdx'],
// })

module.exports = {
  experimental: {
    // serverActions: true,
    serverActions: {
      bodySizeLimit: '20000mb',
    },
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', ],
    // reactCompiler: true,
    // compilationMode: 'annotation',
  },
  // env: {
  //   NEXT_PUBLIC_NPM_TOKEN: process.env.NEXT_PUBLIC_NPM_TOKEN
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  serverExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/s3-presigned-post'],
  images: {
    // domains: ['res.cloudinary.com', 'sjc1.vultrobjects.com', 'donald-louch.sjc1.vultrobjects.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'sjc1.vultrobjects.com'
      },
      {
        protocol: 'https',
        hostname:'donald-louch.sjc1.vultrobjects.com'
      },
      {
        protocol: 'https',
        hostname:'donaldlouch.s3.us-west-004.backblazeb2.com'
      },
      {
        protocol: 'https',
        hostname:'f004.backblazeb2.com'
      },
      {
        protocol: 'https',
        hostname:'s3.us-west-004.backblazeb2.com'
      },
    ],
  },
}