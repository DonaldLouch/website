// import { SessionInformation } from "@/app/actions/auth"
import { SessionInformation } from "@/app/actions/auth"
import AuthLoginSignup from "./AuthPage"
import { authClient } from "@/lib/auth/auth-client"

export default async function Auth() {
  const session = await SessionInformation()
  return (
    <AuthLoginSignup session={session} />
  )
}
