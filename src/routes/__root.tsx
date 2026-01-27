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
  Scripts,
  useLocation,
} from "@tanstack/react-router"
import { seo } from "@/utils/seo";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from '@/components/NotFound'
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { RouteNavigationPanel } from "@/components/(DevTools)";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AdminLayout from "@/components/(Layout)/AdminLayout";

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
  }),
  loader: () => AdminAccessCheck(),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

const queryClient = new QueryClient()

function RootDocument({ children }: { children: React.ReactNode }) {
  const isAdmin = Route.useLoaderData();

  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const layout = {
    MaintenanceMode: () => <MaintenanceModePage />,
    AdminPage: () => <AdminLayout isAdmin={isAdmin}>{children}</AdminLayout>,
    Default: () => <MainLayout>{children}</MainLayout>
  }

  const layoutType = (isMaintenanceMode && !isAdmin && !pathname.includes('/auth'))
    ? "MaintenanceMode" 
    : pathname.includes('/admin') ? "AdminPage" 
    : "Default"

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
              { layout[layoutType] && layout[layoutType]() }
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