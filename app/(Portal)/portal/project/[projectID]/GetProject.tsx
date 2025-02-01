'use client'

import { Badge, Divider, Title, Stack, Tabs, Text, Group, Box } from "@mantine/core";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal"
// import moment from 'moment';
// import Loading from "../../(Config)/ContentLoading";

import OverviewComponent from "./(Sections)/OverviewComponent";
import DetailsComponent from "./(Sections)/(Details)/DetailsComponent";
import TasksComponent from "./(Sections)/(Tasks)/TasksComponent";

import { ProjectType } from "@/lib/Project/projectType";
import { useRouter, useSearchParams } from "next/navigation";
import NotesSection from "./(Sections)/NotesSection";
import { useUser } from "@clerk/nextjs";
import ProjectTickets from "./(Sections)/(Tickets)/ProjectTickets";
import HugeIcon from "@/app/(Components)/HugeIcon";

import StatusBadge from "../(Components)/StatusBadge";

// import { Metadata } from 'next';

// async function getProjectData(projectID: string) {
//   const res = await fetch(`/api/project/getProject?id=${projectID}`, { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error('Failed to fetch project');
//   }
//   return res.json();
// }

export default async function GetProject({project, projectDescription, isStaff, tasks}: any) {
    const { user } = useUser()
    const router = useRouter()
    // console.log(user.id)
    !isStaff && project.client.id != user.id && router.push("/portal/projects?error=unauthorized")
    
    // const projectID = props.projectID
    // const {response: project} = await getProjectData(projectID)
    // const {data: session} = useSession()
    // const user  = session
    // console.log(session)
    // const project = props
    // function handleModal() {
    //     onOpen()
    // }
    // const { isOpen, onOpen, onClose } = useDisclosure()

    const prams = useSearchParams()
    const openID = prams.get("openID") as string

    
    
    const breadCrumbs = [
        {"pageLink": "/portal/projects", "pageName": "Projects"},
        {"pageLink": null, "pageName": project.name},
    ]


    // const projectStatus = ProjectStatus.find(({ id }) => id === project.status)
    const projectType = ProjectType.find(({ id }) => id === project.projectKind)
    // console.log(ProjectStatus.find(({ id }) => id === project.status)?.fullText)

    const tabsData = [
        {
            "id": "overview",
            "label": "Overview"
        },
        {
            "id": "details",
            "label": "Details"
        },
        {
            "id": "tasks",
            "label": "Tasks"
        },
        {
            "id": "notes",
            "label": "Notes"
        },
        {
            "id": "files",
            "label": "Files"
        },
        {
            "id": "communication",
            "label": "Communication"
        },
        {
            "id": "tickets",
            "label": "Tickets"
        },
        {
            "id": "timeSheets",
            "label": "Time Sheets"
        },
        {
            "id": "invoices",
            "label": "Invoices"
        },
        {
            "id": "payments",
            "label": "Payments"
        },
    ] as any

    const openTab = tabsData.find(({ id }: any) => id === openID) ? tabsData.find(({ id }: any) => id === openID).id : null

    console.log(openTab)

    return (
    <>
        <BreadCrumb breads={breadCrumbs} />
            {/* <Alert 
                hidden={!project.bannerMessage} 
                status={project.bannerMessage ? project.bannerMessage.find(({ banner }) => banner === "bannerStatus").bannerValue : undefined} 
                borderRadius="0 2rem" p="1.3rem" 
                color="black"
                pos={project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerIsSticky").bannerValue ? "sticky" : "initial"} 
                top="-1.5rem"
            >
                <AlertIcon /> */}
            {/* <Alert hidden={project.bannerMessage ? false : true} status={project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerStatus").bannerValue} borderRadius="0 2rem" p="1.3rem" pos={project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerIsSticky").bannerValue ? "sticky" : "initial"} top="0"><AlertIcon />
                {project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerTitle").bannerValue && (
                    <AlertTitle fontSize='lg' color="black">
                        {project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerTitle").bannerValue}
                    </AlertTitle>
                )}
                {project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerBody").bannerValue && (
                    <AlertDescription color="black">{project.bannerMessage && project.bannerMessage.find(({ banner }) => banner === "bannerBody").bannerValue}</AlertDescription>
                )}
                {/* {project.bannerMessage.find(({ banner }) => banner === "bannerCloseable").bannerValue && (
                <CloseButton
                    alignSelf='flex-start'
                    position='relative'
                    right={-1}
                    top={-1}
                    onClick={onClose}
                />
                )} 
            </Alert>*/}
            <Group mb="1rem" justify="space-between" align="center" mt="1rem">
                <Group align="center">
                <Title ff="body" fw="900">{project.name}</Title>
                </Group>
                <Group align="center" justify="center">
                    {/* <Badge color="gray" m="0 auto">{projectType?.fullText ? projectType?.fullText : projectType?.smallText}</Badge> */}
                    <Badge color="gray" leftSection={<HugeIcon name="book-02" />}>
                        {projectType?.smallText}
                    </Badge>
                    <StatusBadge status={project.status} />
                </Group>
            </Group>
            <Divider />
            <Tabs defaultValue={openTab ? openTab : "overview"} style={{boxShadow: "none"}} m="0 0rem 2rem">
                <Tabs.List grow justify="flex-start">
                    {tabsData.map((tab: any) => (
                        <Tabs.Tab key={tab.id} value={tab.id} mx="0">{tab.label}</Tabs.Tab>
                    ))}
                </Tabs.List>
                <Tabs.Panel value="overview" py="2rem">
                    <OverviewComponent project={project} projectDescription={projectDescription} /> 
                </Tabs.Panel>
                
                <Tabs.Panel value="details" py="2rem">
                    <DetailsComponent project={project} isStaff={isStaff} />
                </Tabs.Panel>
                
                <Tabs.Panel value="tasks" py="2rem">
                    <TasksComponent project={project} isStaff={isStaff} tasks={tasks} openID={openID} />
                </Tabs.Panel>
                
                <Tabs.Panel value="notes" py="2rem">
                    <NotesSection project={project} isStaff={isStaff} />
                </Tabs.Panel>
                
                <Tabs.Panel value="files" py="2rem"><>
                 <Stack align="center" justify="center"><Text fz="3xl" fw="700" c="var(--secondary)" display="inline-flex" style={{alignItems: "center", justifyContent: "center"}}><Box component="span" mr="1rem"><HugeIcon name="cone-01" size="2rem" color="currentColor" /></Box>The "Files" section is currently under constriction.</Text></Stack>
                </></Tabs.Panel>
                
                <Tabs.Panel value="communication" py="2rem"><>
                 <Stack align="center" justify="center"><Text fz="3xl" fw="700" c="var(--secondary)" display="inline-flex" style={{alignItems: "center", justifyContent: "center"}}><Box component="span" mr="1rem"><HugeIcon name="cone-01" size="2rem" color="currentColor" /></Box>The "Communication" section is currently under constriction.</Text></Stack>
                </></Tabs.Panel>
                
                <Tabs.Panel value="tickets" py="2rem"><>
                    <ProjectTickets id={project.id} isStaff={isStaff} />
                 {/* <Stack align="center" justify="center"><Text fz="3xl" fw="700" c="var(--secondary)" display="inline-flex" style={{alignItems: "center", justifyContent: "center"}}><Box component="span" mr="1rem"><Cone01Icon size="2rem" color="currentColor" /></Box>The "Tickets" section is currently under constriction.</Text></Stack> */}
                </></Tabs.Panel>
                
                <Tabs.Panel value="timeSheets" py="2rem"><>
                 <Stack align="center" justify="center"><Text fz="3xl" fw="700" c="var(--secondary)" display="inline-flex" style={{alignItems: "center", justifyContent: "center"}}><Box component="span" mr="1rem"><HugeIcon name="cone-01" size="2rem" color="currentColor" /></Box>The "Time Sheets" section is currently under constriction.</Text></Stack>
                </></Tabs.Panel>
                
                <Tabs.Panel value="invoices" py="2rem"><>
                 <Stack align="center" justify="center"><Text fz="3xl" fw="700" c="var(--secondary)" display="inline-flex" style={{alignItems: "center", justifyContent: "center"}}><Box component="span" mr="1rem"><HugeIcon name="cone-01" size="2rem" color="currentColor" /></Box>The "Invoices" section is currently under constriction.</Text></Stack>
                </></Tabs.Panel>
                
                <Tabs.Panel value="payments" py="2rem"><>
                 <Stack align="center" justify="center"><Text fz="3xl" fw="700" c="var(--secondary)" display="inline-flex" style={{alignItems: "center", justifyContent: "center"}}><Box component="span" mr="1rem"><HugeIcon name="cone-01" size="2rem" color="currentColor" /></Box>The "Payments" section is currently under constriction.</Text></Stack>
                </></Tabs.Panel>


               
                        {/* 
                        
                        {/* userType={user.accountType} *
                    
                        <TasksComponent {...project} />
                
                        <Text ta="center" fz="3xl" fw="900" c="secondary" mt="1rem"><FontAwesomeIcon icon={["fal", "traffic-cone"]} color="currentColor" width="3%" shake  /> This section is currently under construction</Text> */}
            </Tabs>
    </>
    )
}