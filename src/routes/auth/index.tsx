import { SessionInformation } from "@/actions/auth.server"
import { createFileRoute, useLoaderData } from "@tanstack/react-router"
import AuthLoginSignup from "./-AuthPage"

export const Route = createFileRoute('/auth/')({ 
    loader: () => SessionInformation(),
    component: Auth
})
function Auth() {
  const session = Route.useLoaderData()

  return <AuthLoginSignup session={session} />
}
