import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/admin/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}