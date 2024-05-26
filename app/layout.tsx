import { ClerkProvider } from "@clerk/nextjs";
import Context from "./(Config)/Context"

import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

import { ColorSchemeScript, MantineProvider } from '@mantine/core'

// import { hugeiconsLicense } from "@hugeicons/react";
// const iconLICENSE = process.env.NEXT_PUBLIC_HUGEICONSLICENSE as string
// hugeiconsLicense(iconLICENSE)

export const viewport: Viewport = {
  themeColor: '#30243c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    applicationName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    authors: [{ name: "Donald Louch", url: "https://donaldlouch.ca" }],
    keywords: process.env.NEXT_PUBLIC_KEYWORDS,
    creator: "Donald Louch",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    icons:  [
        { rel: "icon", sizes: "32x32", type: "image.png", url: "/faviconPride/favicon-32x32.png" }, 
        { rel: "icon", sizes: "192x192", type: "image.png", url: "/faviconPride/favicon-192x192.png" }, 
        { rel: "icon", sizes: "16x16", type: "image.png", url: "/faviconPride/favicon-16x16.png" }, 
        { rel: "apple-touch-icon", sizes: "180x180", type: "image.png", url: "/faviconPride/apple-touch-icon.png" },
    ],
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

export const revalidate = 0

// import '@mantine/core/styles.css';
// import '@mantine/dropzone/styles.css'
// crossOrigin="anonymous"
import Script from "next/script";
// import AppLayout from "./(Config)/(Layout)/AppLayout";
import GeneralLayout from "./(Config)/(Layout)/GeneralLayout";
import { MantineTheme } from "./(Config)/MantineTheme"

import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import "@/app/(Config)/global.css"

import noteClasses from "@/app/(Config)/Notifications.module.css"

// nse } from "@hugeicons/react";
// const iconLICENSE = process.env.NEXT_PUBLIC_HUGEICONSLICENSE!
// hugeiconsLicense(iconLICENSE)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // console.log()
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClerkProvider>
          <MantineProvider theme={MantineTheme}>
          <Notifications styles={{notification: {background: "var(--darkPurpleRGBA)"}}} classNames={noteClasses}/>
          <Context>{children}</Context>
          {/* <MantineProvider> */}
            {/* {children} */}
          </MantineProvider> 
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      {/* <Script src="https://kit.fontawesome.com/66b6e8c296.js" strategy="afterInteractive"/> */}
    </html>
  )
}
