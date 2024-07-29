// import supabase from "@/lib/supabase"
import { checkRole } from "@/lib/roles"
import PAGETITLEPage from "./PAGETITLEPage"
import { auth, currentUser, getAuth } from "@clerk/nextjs/server"

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Test Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'The portal test page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `Test Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'The portal test page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

// type Props = {
//     params: { ID: string }
// };

export default async function PAGETITLE() {
    // { params }: Props
    // const { ID } = params

    // User:
        // const user = await currentUser()
        // const isAdmin = checkRole("admin") ? true : false
        // const isMod = checkRole("moderator") ? true : false
        // const isUser = checkRole("user") ? true : false
        // const isPayment = checkRole("paymentOnly") ? true : false
        // const isSupport = checkRole("ticketSupportOnly") ? true : false
        // const userLevel = isAdmin ? 0 : isMod ? 1 : isUser ? 2 : isPayment ? 3 : isSupport ? 4 : 10


    // Database:
        // const { data: DATA } = await supabase.from('DATABASE').select().match({id: ID}).single() as any // Single Entry
        // const { data: DATA } = await supabase.from('DATABASE').select().order('ORDER', { ascending: true }) as any // Multiple All Entry
        // const { data: DATA } = await supabase.from('DATABASE').select().match({id: ID}).order('ORDER', { ascending: true }) as any // Multiple Select Entry
    
        return <PAGETITLEPage />
}
