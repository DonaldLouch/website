// import { checkRole } from "@/lib/roles";
import { auth } from "@clerk/nextjs/server";
import PortalHome from "./PortalHome";



export default async function Portal() {
  const { orgRole, orgId, userId, has } = await auth()
  const isAdmin = userId ? true : false
  const isMod = userId ? true : false

  const isStaff = isAdmin || isMod
  
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  return <PortalHome isStaff={isStaff} />
}
