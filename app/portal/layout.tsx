// import { SignedOut, auth, useSession } from "@clerk/nextjs";
import PortalLayoutContext from "./(Layout)/PortalLayoutContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    // const userData = useSession()
    // const orgRole = auth();
    // console.log("Org", orgRole.orgPermissions)
    // const userRole = userData.session?.user.organizationMemberships?.[0].role
    // userRole != "admin" ? 
    return <PortalLayoutContext>{children}</PortalLayoutContext>
}