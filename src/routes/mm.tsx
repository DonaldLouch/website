import MaintenanceModePage from '@/components/layout/MaintenanceModePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MaintenanceModePage />
}
