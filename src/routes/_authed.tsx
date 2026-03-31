import { authMiddleware } from '@/middleware/auth'
import { seo } from '@/utils/seo'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
    component: RouteComponent,
    server: {
      middleware: [authMiddleware],
    },
    head: () => ({
      noindex: true,
      meta: [
        ...seo({
          title: `Admin Portal | ${import.meta.env.VITE_WEBSITE_NAME}`,
        }),
      ]
    })
})

function RouteComponent() {
  return <Outlet />
}
