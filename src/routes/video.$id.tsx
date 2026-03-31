import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}