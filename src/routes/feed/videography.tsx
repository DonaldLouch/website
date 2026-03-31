import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feed/videography')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}