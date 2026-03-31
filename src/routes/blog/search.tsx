import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/search')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}