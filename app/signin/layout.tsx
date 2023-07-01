import { ClerkProvider } from "@clerk/nextjs";


export default async function PortalLayout({ children }: { children: React.ReactNode }) {
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser()
    // let isLoggedIn = false
    // user ? isLoggedIn = true : false
    // const isLoggedIn = false
    // const router = useRouter()
    // !isLoggedIn && router.push("/?message=userLoginNotAllowed")

    return <ClerkProvider>{children}</ClerkProvider>
}