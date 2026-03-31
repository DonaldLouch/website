import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feed/photography')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}