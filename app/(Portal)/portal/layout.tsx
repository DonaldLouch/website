import PortalLayoutContext from "../(Layout)/PortalLayoutContext";
import { isUserSignedIn, userRole } from "@/app/actions/clerk";
// import { checkRole } from "@/lib/roles";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
    // const userData = useSession()
    // const orgRole = auth();
    // // console.log("Org", orgRole.orgPermissions)
    // const userRole = userData.session?.user.organizationMemberships?.[0].role
    // userRole != "admin" ? 
    // const {  } = auth()
    // // console.log(orgRole)
    // { role: "org:administration:admin" }
    // auth().protect({ role: 'org:admin' })
    // const { orgRole, orgId, userId, has } = await auth()

    // const isAdmin = has({ permission:"org:portal:access" }) && orgId == process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID
    
    let isUser = await isUserSignedIn()
    const role = await userRole()
    const isAdmin = isUser && role === "admin" ? true : false

    isUser = isAdmin ? true : false 


    console.log(isUser, role, isAdmin)

    return <PortalLayoutContext isUser={isUser} isAdmin={isAdmin}>{children}</PortalLayoutContext>
}