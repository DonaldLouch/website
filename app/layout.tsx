export const revalidate = 0
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

import { isUserSignedIn, userRole } from "./actions/clerk";
import { ClerkProvider } from "@clerk/nextjs";

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { MantineTheme } from "./(Config)/MantineTheme"
import '@mantine/core/styles.css';
import '@mantine/core/styles/baseline.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import "@/app/(Config)/global.css"

import MaintenanceModePage from "./(Config)/(Layout)/MaintenanceModePage";
import Context from "./(Config)/Context"

// import { FontAwesomeConfig } from '@/lib/FontAwesome/FontAwesomeConfig';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const viewport: Viewport = {
  themeColor: '#1d1929',
  // width: 'device-width',
  // initialScale: 1,
  // maximumScale: 1,
}

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    applicationName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    authors: [{ name: "Donald Louch", url: "https://donaldlouch.ca" }],
    keywords: process.env.NEXT_PUBLIC_KEYWORDS,
    creator: "Donald Louch",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    // icons:  [
    //   { rel: "icon", sizes: "96x96", type: "image.png", url: "/faviconHoliday/favicon-96x96.png" },
    //   { rel: "icon", type: "image/svg+xml", url: "/faviconHoliday/favicon.svg" },
    //   { rel: "shortcut icon", url: "/faviconHoliday/favicon.ico" },
    //   { rel: "apple-touch-icon", sizes: "180x180", type: "image.png", url: "/faviconHoliday/apple-touch-icon.png" },
    // ],
    // manifest: "/faviconHoliday/site.webmanifest",
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/thumbnail/uv0fxdiue86dqkgwso98.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/thumbnail/uv0fxdiue86dqkgwso98.jpg" },
    appleWebApp: { capable: true, title: process.env.NEXT_PUBLIC_WEBSITE_NAME, statusBarStyle: "black-translucent" }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isUser = await isUserSignedIn()
  const role = await userRole()
  const isAdmin = isUser && role === "admin" ? true : false

  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE

  return (
    <html lang="en-CA">
      <head></head>
      <body>
        <ClerkProvider>
          <MantineProvider theme={MantineTheme}>
          <Notifications />
          {isMaintenanceMode === "false" || (isMaintenanceMode === "true" && isAdmin) ? 
            <Context>
              {children}
            </Context> 
            : <MaintenanceModePage isUser={isUser} />
          }
          </MantineProvider> 
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
