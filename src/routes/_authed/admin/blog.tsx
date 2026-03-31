import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/admin/blog')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}