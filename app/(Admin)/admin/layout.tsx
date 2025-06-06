// import { SignedOut, auth, useSession } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import AdminLayoutContext from "../(Layout)/AdminLayoutContext";
import { isUserSignedIn, userRole } from "@/app/actions/clerk";

// import { checkRole } from "@/lib/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // const userData = useSession()
    // const orgRole = auth();
    // // console.log("Org", orgRole.orgPermissions)
    // const userRole = userData.session?.user.organizationMemberships?.[0].role
    // userRole != "admin" ? 
    // const {  } = auth()
    // // console.log(orgRole)
    // { role: "org:administration:admin" }
    // auth().protect({ role: 'org:admin' })
    // const { orgRole, orgId, userId, has, sessionClaims } = auth()
    //  const { userId }: { userId: string | null } = await auth()
    // const isAdmin = userId ? true : false

    const isUser = await isUserSignedIn()
    const role = await userRole()
    const isAdmin = isUser && role === "admin" ? true : false
    // ? true : false
    // console.log("Layout", userId)
    // const isAdmin = has({ permission:"org:portal:access" }) && orgId == process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID
    // const isAdmin = false
    // const isAdmin = orgRole == "admin" && orgId == process.env.NEXT_PUBLIC_CLERK_ADMIN_ORG_ID ? true : false
    // userId && isAdmin && auth().protect().has({ role: 'admin' })
    // // console.log(isAdmin, userId)

    return <AdminLayoutContext isAdmin={isAdmin}>{children}</AdminLayoutContext>
}