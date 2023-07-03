import Context from "./(Config)/Context"

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: process.env.WEBSITE_NAME,
    description: process.env.DESCRIPTION,
    applicationName: process.env.WEBSITE_NAME,
    authors: [{ name: "Donald Louch", url: "https://donaldlouch.ca" }],
    keywords: process.env.KEYWORDS,
    themeColor: "#30243c",
    viewport: "width=device-width, initial-scale=1",
    creator: "Donald Louch",
    icons:  [
        { rel: "icon", sizes: "32x32", type: "image.png", url: "/favicon/favicon-32x32.png" }, 
        { rel: "icon", sizes: "192x192", type: "image.png", url: "/favicon/favicon-192x192.png" }, 
        { rel: "icon", sizes: "16x16", type: "image.png", url: "/favicon/favicon-16x16.png" }, 
        { rel: "apple-touch-icon", sizes: "180x180", type: "image.png", url: "/favicon/apple-touch-icon.png" },
    ],
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: process.env.WEBSITE_NAME,
        description: process.env.DESCRIPTION,
        siteName: process.env.WEBSITE_NAME,
        images: [{
            url: "https://res.cloudinary.com/donaldlouch/image/upload/v1669225248/thumbnail/uv0fxdiue86dqkgwso98.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://res.cloudinary.com/donaldlouch/image/upload/v1669225248/thumbnail/uv0fxdiue86dqkgwso98.jpg" },
    appleWebApp: { capable: true, title: process.env.WEBSITE_NAME, statusBarStyle: "black-translucent" }
}

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Context>{children}</Context>
      </body>
    </html>
  )
}
