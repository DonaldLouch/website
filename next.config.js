// const withMDX = require('@next/mdx')({
//   extension: /\.mdx$/
// })

// module.exports = withMDX({
//     pageExtensions: ['js', 'jsx', 'tsx', 'mdx']
//   })

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
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: false,
    //concurrentFeatures: true,
    // serverComponents: true
    // swcMinify: true,
  },
  env: {
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    JWT_SIGNING_PUBLIC_KEY: process.env.JWT_SIGNING_PUBLIC_KEY,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    SECRET: process.env.SECRET,
    WEBSITE_NAME: process.env.WEBSITE_NAME,
    KEYWORDS: process.env.KEYWORDS,
    DESCRIPTION: process.env.DESCRIPTION,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY: process.env.CLOUDINARY,
  },
}

