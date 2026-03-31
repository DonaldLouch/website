import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/embed/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}