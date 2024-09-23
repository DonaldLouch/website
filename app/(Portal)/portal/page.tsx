import { checkRole } from "@/lib/roles";
import PortalHome from "./PortalHome";



export default function Portal() {
  const isAdmin = checkRole("admin") ? true : false
  const isMod = checkRole("moderator") ? true : false

  const isStaff = isAdmin || isMod
  
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  return <PortalHome isStaff={isStaff} />
}
