/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})

module.exports = {
  experimental: {
    // serverActions: true,
    serverComponentsExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/s3-presigned-post'],
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
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
      }
    ],
  },
}