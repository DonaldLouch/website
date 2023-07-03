// import createClient from "@/lib/supabase-server"
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import PortalLayoutContext from "./(Layout)/PortalLayoutContext";
import { useRouter } from "next/navigation";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser()
    // let isLoggedIn = false
    // user ? isLoggedIn = true : false
    // const isLoggedIn = false
    // const router = useRouter()
    // !isLoggedIn && router.push("/?message=userLoginNotAllowed")

    return <ClerkProvider><PortalLayoutContext>{children}</PortalLayoutContext></ClerkProvider>
}