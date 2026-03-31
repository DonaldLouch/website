import { seo } from '@/utils/seo'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
    component: RouteComponent,
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
