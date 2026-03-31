import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/album/$slug')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}