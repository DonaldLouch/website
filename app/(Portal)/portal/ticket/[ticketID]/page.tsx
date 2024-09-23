import supabase from '@/lib/supabase';
import GetTicket from './GetTicket';

import { checkRole } from '@/lib/roles';
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


export default async function TicketOverview({params}: any) {
    const { ticketID } = params

    const isAdmin = checkRole("admin") ? true : false
    const isMod = checkRole("moderator") ? true : false

    const isStaff = isAdmin || isMod

    const { data: ticket } = await supabase.from('Tickets').select().match({id: ticketID}).single() as any
    const { data: replies } = await supabase.from('TicketReplies').select().match({ticketID: ticketID}).order("createdOn", {ascending: true}) as any
    
    return <GetTicket ticket={ticket} isStaff={isStaff} replies={replies} /> 
}