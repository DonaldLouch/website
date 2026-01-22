/// <reference types="vite/client" />

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { MantineTheme } from "@/config/MantineTheme";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@/config/styles/global.css";

import MaintenanceModePage from "@/components/(Layout)/MaintenanceModePage";
import MainLayout from "@/components/(Layout)/MainLayout";
import Loading from "@/components/Loading";
import { Suspense } from "react";

import { AdminAccessCheck } from "@/actions/auth.server";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/FontAwesome"
config.autoAddCss = false;

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useLocation,
  ErrorComponent,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { seo } from "@/utils/seo";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from '@/components/NotFound'
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { RouteNavigationPanel } from "@/components/(DevTools)";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
    
// interface MyRouterContext {
//   queryClient: QueryClient
// }

{/* <MyRouterContext></MyRouterContext> */}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      // metadataBase: new URL(process.env.VITE_SITE_URL!),
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
      { rel: 'icon', href: '/logo/logo.svg', type: 'image/svg+xml' },
    //   // { rel: 'stylesheet', href: appCss },
    //   {
    //     rel: 'apple-touch-icon',
    //     sizes: '180x180',
    //     href: '/apple-touch-icon.png',
    //   },
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     sizes: '32x32',
    //     href: '/favicon-32x32.png',
    //   },
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     sizes: '16x16',
    //     href: '/favicon-16x16.png',
    //   },
    //   { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
    //   { rel: 'icon', href: '/favicon.ico' },
    // ],
    // scripts: [
    //   {
    //     src: '/customScript.js',
    //     type: 'text/javascript',
    //   },
    ],
  }),
  loader: () => AdminAccessCheck(),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

const queryClient = new QueryClient()

function RootDocument({ children }: { children: React.ReactNode }) {
  const isAdmin = Route.useLoaderData();
  // console.log("isAdmin", isAdmin);

  const MaintenanceModeEnv = import.meta.env.VITE_MAINTENANCE_MODE;
  const isMaintenanceMode =
    MaintenanceModeEnv === "true"
      ? true
    : MaintenanceModeEnv === "false" && false;

  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={MantineTheme}>
            <Notifications />
            <Suspense fallback={<Loading />}>
              {!isMaintenanceMode || (isMaintenanceMode && isAdmin) || (isMaintenanceMode && pathname.includes('/auth'))
                ? <MainLayout>{children}</MainLayout>
                : <MaintenanceModePage />
              }
            </Suspense> 
          </MantineProvider>
        </QueryClientProvider>
        {/* <TanStackDevtools
              config={{
                  position: 'bottom-right',
              }}
              plugins={[
                  {
                      name: 'Tanstack Router',
                      render: <TanStackRouterDevtoolsPanel />,
                  },
                  {
                      id: 'route-navigation',
                      name: 'Route Navigation',
                      render: <RouteNavigationPanel />,
                  },
              ]}
          /> */}
        <Scripts />
      </body>
    </html>
  )
}