import { Alert, Table, Text } from "@mantine/core";
import ProjectTicketRow from "./ProjectTicketRow";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import CreateNewTicket from "@/app/(Portal)/portal/tickets/CreateNewTicket";
import HugeIcon from "@/app/(Components)/HugeIcon";


export default function ProjectTickets({ id, isStaff }: any) {
    const [tickets, setTickets] = useState<any>([])
    useEffect(() => {
        const fetchTickets = async () => {
            const {data} = await supabase.from('Tickets').select().contains('relatedTo', {id: id}).order('lastUpdatedOn', { ascending: false }) as any
            setTickets(data)
        }
        fetchTickets()
    }, [])
  return <>
    <CreateNewTicket isStaff={isStaff} relatedID={`Project;;${id}`} />
    {tickets.length === 0 ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone" />} mt="3rem"><Text my="0.5rem" c="white">There currently is no tickets that have been requested!</Text></Alert> : <Table mt="3rem" stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}}>
        <Table.Tbody>
            {tickets.map((ticket: any, index: number) => (
                !isStaff && ticket.internalONLY || isStaff ? <ProjectTicketRow key={index} ticket={ticket} /> : null
            ))}
        </Table.Tbody>
    </Table>}
  </>
}
