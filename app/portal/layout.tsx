import createClient from "@/lib/supabase-server"
import PortalLayoutContext from "./(Layout)/PortalLayoutContext";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    let isLoggedIn = false
    user ? isLoggedIn = true : false

    return <PortalLayoutContext isLoggedIn={isLoggedIn}>{children}</PortalLayoutContext>
}