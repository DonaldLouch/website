import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/linkSet/$slug')({
    component: RouteComponent,
})

function RouteComponent() {
    return <></>
}