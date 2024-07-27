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
  themeColor: '#1d1929',
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
      { rel: "apple-touch-icon", sizes: "180x180", type: "image.png", url: "/favicon/apple-touch-icon.png" },
      { rel: "icon", sizes: "32x32", type: "image.png", url: "/favicon/favicon-32x32.png" }, 
      { rel: "icon", sizes: "16x16", type: "image.png", url: "/favicon/favicon-16x16.png" },
      { rel: "mask-icon", color: "#1d1929", url: "/favicon/safari-pinned-tab.svg" },
      { rel: "shortcut icon", url: "/favicon/favicon.ico" },
    ],
    // manifest: "/favicon/site.webmanifest",
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

import notificationClasses from "@/app/(Config)/Notifications.module.css"

// nse } from "@hugeicons/react";
// const iconLICENSE = process.env.NEXT_PUBLIC_HUGEICONSLICENSE!
// hugeiconsLicense(iconLICENSE)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // // console.log()
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClerkProvider>
          <MantineProvider theme={MantineTheme}>
            {/* classNames={noteClasses}  */}
          {/* <Notifications autoClose={false} classNames={{notification: notificationClasses.standardNotification}} styles={{notification: {borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsSMPrimary)", padding: "1rem 2rem"}}}/> */}
          <Notifications />
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
