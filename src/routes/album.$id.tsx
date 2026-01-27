import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/album/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/album/$id"!</div>
}
