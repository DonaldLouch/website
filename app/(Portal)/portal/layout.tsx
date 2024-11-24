// import { SignedOut, auth, useSession } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import PortalLayoutContext from "../(Layout)/PortalLayoutContext";
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
    const { orgRole, orgId, userId, has } = await auth()

    // const isAdmin = has({ permission:"org:portal:access" }) && orgId == process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID
    const isUser = userId ? true : false
    const isAdmin = isUser
    // const isAdmin = orgRole == "admin" && orgId == process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID ? true : false
    // userId && isAdmin && auth().protect().has({ role: 'admin' })
    // // console.log(isAdmin, userId)

    // auth().protect()
    return <PortalLayoutContext isUser={isUser} isAdmin={isAdmin}>{children}</PortalLayoutContext>
}