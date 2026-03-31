import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/admin/photo/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}