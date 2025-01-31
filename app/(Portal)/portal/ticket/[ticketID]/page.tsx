import supabase from '@/lib/supabase';
import GetTicket from './GetTicket';

// import { checkRole } from '@/lib/roles';
import { redirect } from 'next/navigation';
import { isUserSignedIn, userData, userRole } from '@/app/actions/clerk';
// import { Metadata } from 'next';
// type Props = {
//     params: { ticketID: string }
// };
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const id = params.ticketID
//     const project = await fetch(`${process.env.NEXTAUTH_URL}/api/project/getProject?id=${id}`).then((res) => res.json())
//     return {
//         title: `Project: ${project.response.name} | ${process.env.WEBSITE_NAME}`,
//     }
// }

type Params = Promise<{ ticketID: string }>

export default async function TicketOverview({ params }: { params: Params }) {
    const { ticketID } = await params

    const isUser = await isUserSignedIn()
    const role = await userRole()
    const { userId } = await userData()
    const isAdmin = isUser && role === "admin" ? true : false
    const isMod = isUser && role === "moderator" ? true : false
    const isStaff = isAdmin || isMod

    // const router = useRouter()

    const { data: ticket } = await supabase.from('Tickets').select().match({id: ticketID}).single() as any

    !isStaff && ticket.internalONLY && redirect("/portal/tickets?error=unauthorized")
    !isStaff && ticket.from.id != userId && redirect("/portal/tickets?error=unauthorized")

    const { data: replies } = await supabase.from('TicketReplies').select().match({ticketID: ticketID}).order("createdOn", {ascending: true}) as any

    return <GetTicket ticket={ticket} isStaff={isStaff} replies={replies} />
}