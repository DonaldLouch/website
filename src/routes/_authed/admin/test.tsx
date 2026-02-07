import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/admin/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/test"!</div>
}
