'use client'
import { BreadCrumb } from '@/app/(Components)/BreadCrumbsComponentPortal'
import { Alert, Table, Tabs, Title, Text } from '@mantine/core'

import TicketRow from './TicketRow'
import CreateNewTicket from './CreateNewTicket'
import HugeIcon from '@/app/(Components)/HugeIcon'
// import GetProjects from './GetProjects'
// import { RequestNewProject } from './RequestNewProject'
// import { BreadCrumb } from "../(Components)/BreadCrumbsComponent";
// import supabase from '@/lib/supabase';
// import { currentUser } from '@clerk/nextjs';
type ProjectProps = {
    isStaff: boolean
    clientTickets: any
    adminTickets?: any
}

export default function Tickets({isStaff, clientTickets, adminTickets}: ProjectProps) {
    // const toast = useToast()

    // const { data: session } = useSession() as any
    // const [nextSession, setNextSession] = useState(undefined) as any

    // const { data, error } = fetch(`/api/project/getClientProjects?id=${session.user.userID}`)

    // console.log(data, error)

    // console.table(project)
    // const user = currentUser()
    // console.log(user)
    // const { data: clientProjects } = await supabase.from('Project').select().match({ clientID: user?.id }) as any
    // const { data: adminProjects } = await supabase.from('Project').select() as any

    // function handleNewRequest() {
    //     onOpen()
    // }
    // console.log(clientProjects, adminProjects)
    const breadCrumbs = [
        {"pageLink": null, "pageName": "Tickets"},
    ]

    return <>
        <BreadCrumb breads={breadCrumbs} />
         {/* isAdmin={isAdmin} isMod={isMod} */}
        <CreateNewTicket isStaff={isStaff} />
        <Title mt="1.5rem" ta="center">Tickets</Title>
        {/* <Stack style={{ boxShadow:"var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)" }} m="2rem 0" p="1rem 1.5rem 2rem" gap="1rem"> */}
            {isStaff ? <Tabs defaultValue="personal">
                <Tabs.List grow justify="center">
                    <Tabs.Tab value="personal">Personal</Tabs.Tab>
                    <Tabs.Tab value="all">All</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="personal">
                    {clientTickets.length === 0 ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no tickets that have been requested!</Text></Alert> :
                    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}}>
                        <Table.Tbody>
                            {clientTickets.map((ticket: any, index: number) => (
                                <TicketRow key={index} ticket={ticket} />
                            ))}
                        </Table.Tbody>
                    </Table>}
                </Tabs.Panel>
                <Tabs.Panel value="all">
                    {adminTickets.length === 0  || !adminTickets ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no tickets from any clients!</Text></Alert> :
                    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}}>
                        <Table.Tbody>
                            {adminTickets.map((ticket: any, index: number) => (
                                <TicketRow key={index} ticket={ticket} />
                            ))}
                        </Table.Tbody>
                    </Table>}
                </Tabs.Panel>
            </Tabs> 
            : clientTickets.length === 0 ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no tickets that have been requested!</Text></Alert> : <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}} my="2rem">
                <Table.Tbody>
                    {clientTickets.map((ticket: any, index: number) => (
                        <TicketRow key={index} ticket={ticket} />
                    ))}
                </Table.Tbody>
            </Table>
          }
        {/* </Stack> */}
    </>
}