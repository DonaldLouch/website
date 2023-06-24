import Context from "./(Config)/Context"

// import createClient from "@/lib/supabase-server"

// import { Playfair_Display, Lato } from "next/font/google"
// const playfairDisplay = Playfair_Display({ 
//   subsets: ["latin"], 
//   style: ['normal', 'italic'], 
//   display: 'swap', 
//   preload: true,
//   fallback: ['']
// })
// const lato = Lato({
//     weight: ["100", "300", "400", "700", "900"], 
//     style: ['normal', 'italic'],
//     subsets: ["latin"],
//     display: 'swap', 
//     preload: true,
//     fallback: ['']
// })

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
        { rel: "icon", sizes: "32x32", type: "image.png", url: "/faviconPride/favicon-32x32.png" }, 
        { rel: "icon", sizes: "192x192", type: "image.png", url: "/faviconPride/favicon-192x192.png" }, 
        { rel: "icon", sizes: "16x16", type: "image.png", url: "/faviconPride/favicon-16x16.png" }, 
        { rel: "apple-touch-icon", sizes: "180x180", type: "image.png", url: "/faviconPride/apple-touch-icon.png" },
    ],
    // manifest: "/faviconPride/site.webmanifest",
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
  // const supabase = createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // const isLoggedIn = user ? true : false
  const isLoggedIn = false
  return (
    <html>
      <body>
        <Context isLoggedIn={isLoggedIn}>{children}</Context>
      </body>
    </html>
  )
}
