'use client'
import { BreadCrumb } from '@/app/(Components)/BreadCrumbsComponentPortal'
import { Alert, Box, Modal, Stack, Table, Tabs, Title, Text } from '@mantine/core'
import GetProjects from './GetProjects'
import { useDisclosure } from '@mantine/hooks'
import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import RequestNewProject from './RequestNewProject'
import ProjectRow from './ProjectRow'
import HugeIcon from '@/app/(Components)/HugeIcon'
// import GetProjects from './GetProjects'
// import { RequestNewProject } from './RequestNewProject'
// import { BreadCrumb } from "../(Components)/BreadCrumbsComponent";
// import supabase from '@/lib/supabase';
// import { currentUser } from '@clerk/nextjs';
type ProjectProps = {
    isAdmin: boolean
    isMod: boolean
    clientProjects: any
    adminProjects?: any
}

export default function Projects({isAdmin, isMod, clientProjects, adminProjects}: ProjectProps) {
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
    console.log(clientProjects, adminProjects)
    const breadCrumbs = [
        {"pageLink": null, "pageName": "Projects"},
    ]

    return <>
        <BreadCrumb breads={breadCrumbs} />
         {/* isAdmin={isAdmin} isMod={isMod} */}
        <RequestNewProject />
        <Title mt="1.5rem" ta="center">Projects</Title>
        {/* <Stack style={{ boxShadow:"var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)" }} m="2rem 0" p="1rem 1.5rem 2rem" gap="1rem"> */}
            {isAdmin || isMod ? <Tabs defaultValue="personal">
                <Tabs.List grow justify="center">
                    <Tabs.Tab value="personal">Personal</Tabs.Tab>
                    <Tabs.Tab value="all">All</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="personal">
                    {clientProjects.length === 0 ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no projects that have been requested! If there should be projects please contact Donald for further assistance (COMING SOON!)!</Text></Alert> :
                    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}}>
                        <Table.Tbody>
                            {clientProjects.map((project: any, index: number) => (
                                <ProjectRow key={index} project={project} orderNumber={index} />
                            ))}
                        </Table.Tbody>
                    </Table>}
                </Tabs.Panel>
                <Tabs.Panel value="all">
                    {adminProjects.length === 0  || !adminProjects ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no projects from any clients!</Text></Alert> :
                    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}}>
                        <Table.Tbody>
                            {adminProjects.map((project: any, index: number) => (
                                <ProjectRow key={index} project={project} orderNumber={index} isStaff={isAdmin || isMod}/>
                            ))}
                        </Table.Tbody>
                    </Table>}
                </Tabs.Panel>
            </Tabs> 
            : clientProjects.length === 0 ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no projects that have been requested! If there should be projects please contact Donald for further assistance (COMING SOON!)!</Text></Alert> : <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}} my="2rem">
                <Table.Tbody>
                    {clientProjects.map((project: any, index: number) => (
                        <ProjectRow key={index} project={project} orderNumber={index} />
                    ))}
                </Table.Tbody>
            </Table>
          }
        {/* </Stack> */}
    </>
}