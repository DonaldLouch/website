/// <reference types="vite/client" />

import { MantineProvider } from "@mantine/core";
import { MantineTheme } from "@/config/MantineTheme";
import "@mantine/core/styles.css";
import "@/config/styles/global.css";

import {
  createRootRoute,
  HeadContent,
  Scripts
} from "@tanstack/react-router"
import { seo } from "@/utils/seo";
import { NotFound } from '@/components/NotFound'
import Message from "@/components/Message";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: "theme-color",
        content: "#1d1929",
      },
      {
        name: "application-name",
        content: process.env.VITE_WEBSITE_NAME,
      },
      {
        name: "author",
        content: "Donald Louch",
        url: "https://donaldlouch.ca"
      },
      {
        name: "creator",
        content: "Donald Louch"
      },
      {
        name: "apple-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-web-app-status-bar-style",
        content: "black-translucent"
      },
      ...seo({
        title: process.env.VITE_WEBSITE_NAME,
        description: process.env.VITE_DESCRIPTION,
        keywords: process.env.VITE_KEYWORDS,
        image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/thumbnail/uv0fxdiue86dqkgwso98.jpg",
      }),
    ],
    links: [
      { rel: 'icon', href: '/logo/logo.svg', type: 'image/svg+xml' }
    ],
    scripts: [
      { src: "https://api.dashboard.instatus.com/widget?host=donaldlouch.instatus.com&code=6390a14d&locale=en" }
    ]
  }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument() {
  return <html>
    <head><HeadContent /></head>
    <body>
      <MantineProvider theme={MantineTheme}>
        <Message />
      </MantineProvider>
      <Scripts />
    </body>
  </html>
}