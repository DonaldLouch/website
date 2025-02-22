import PortalHome from "./PortalHome";

import { isUserSignedIn, userRole } from "@/app/actions/clerk"



export default async function Portal() {
  // const { orgRole, orgId, userId, has } = await auth()
  // const isAdmin = userId ? true : false
  // const isMod = userId ? true : false

  
  const isUser = await isUserSignedIn()
  const role = await userRole()
  const isAdmin = isUser && role === "admin" ? true : false
  const isMod = isUser && role === "moderator" ? true : false
  const isStaff = isAdmin || isMod
  
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  return <PortalHome isStaff={isStaff} />
}
