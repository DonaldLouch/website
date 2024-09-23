// "use client"

import { Stack, Text } from "@mantine/core";
// import { useSession } from "next-auth/react";

// import Link from "next/link"
// import ProjectRow from "./ProjectRow";
// import ProjectAdminRow from "./ProjectAdminRow";

// async function getClientProjects(userID: string) {
//   const res = await fetch(`/api/project/getClientProjects?id=${userID}`, { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error('Failed to fetch all client projects');
//   }
//   return res.json();
// }

// async function getAllProjects() {
//   const response = await fetch(`/api/project/getAllProjects`, { cache: 'no-store' });
//   if (!response.ok) {
//     throw new Error('Failed to fetch all projects');
//   }
//   return response.json();
// }

export default async function GetProjects() {
    // const {data: session} = useSession() as any
    // const userID = session.user.userID

    // const {response: clientProjects} = await getClientProjects(userID)
    // const {response: adminProjects} = await getAllProjects()

    return (
        <>
            <Stack style={{ boxShadow:"var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)" }} m="2rem 0" p="1rem 1.5rem 2rem" gap="1rem">
                {/* {session.user.accountType === "ADMIN" ? (
                    <Tabs isFitted>
                        <TabList mb='1em'>
                            <Tab>My Projects</Tab>
                            <Tab>All Projects</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Grid alignItems="center" gridTemplateColumns={{base: "50% 20% 20% 10%", lg: "65% 10% 10% 10%"}} gap="1rem" p="2rem 4rem 2rem 1rem" overflowX="scroll" borderRadius="0 2rem" mb="-0.5rem" justifyContent="center" textAlign="center">
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Project Name</Text>
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Type</Text>
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Status</Text>
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">View</Text>
                                </Grid>
                                {!clientProjects || clientProjects?.[0]?.id === "comingSoon" ? (<><Grid alignItems="center" boxShadow={"bsBoldPrimary"} gridTemplateColumns="65% 10% 10% 10%" gap="1rem" p="2rem" overflowX="scroll" borderRadius="0 2rem"><Text fontWeight="800" fontSize="1.3rem">No Current Projects</Text></Grid></>) : (
                                clientProjects?.map((cProject:any) => (
                                    <Box key={cProject.id}>
                                        <ProjectRow name={cProject.name} type={cProject.projectKind} status={cProject.status} id={cProject.id} />
                                    </Box>
                                )))}
                            </TabPanel>
                            <TabPanel>
                                <Grid alignItems="center" gridTemplateColumns="65% 10% 10% 10%" gap="1rem" p="1rem" overflowX="scroll" borderRadius="0 2rem" mb="-0.5rem" justifyContent="center" textAlign="center">
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Project Name</Text>
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Type</Text>
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Status</Text>
                                    <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">View</Text>
                                </Grid>
                                {adminProjects?.map((aProject:any) => (
                                    <Box key={`ADMIN_${aProject.id}`}>
                                       {/* @ts-expect-error Server Component
                                        <ProjectAdminRow name={aProject.name} type={aProject.projectKind} status={aProject.status} id={aProject.id} requested={aProject.client} />
                                    </Box>
                                ))} 
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                ) : (
                <>
                    <Grid alignItems="center" gridTemplateColumns="65% 10% 10% 10%" gap="1rem" p="1rem" overflowX="scroll" borderRadius="0 2rem" mb="-0.5rem" justifyContent="center" textAlign="center">
                        <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Project Name</Text>
                        <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Type</Text>
                        <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">Status</Text>
                        <Text fontWeight="800" fontFamily="heading" fontSize="1.2rem">View</Text>
                    </Grid>
                    {!clientProjects || clientProjects?.[0]?.id === "comingSoon" ? (<><Grid alignItems="center" boxShadow={"bsBoldPrimary"} gridTemplateColumns="65% 10% 10% 10%" gap="1rem" p="1rem" overflowX="scroll" borderRadius="0 2rem"><Text fontWeight="800" fontSize="1.3rem">No Current Projects</Text></Grid></>) : (
                    clientProjects?.map((cProject:any) => (
                        <Box key={cProject.id}>
                            <ProjectRow name={cProject.name} type={cProject.projectKind} status={cProject.status} id={cProject.id} />
                        </Box>
                    )))}
                </>
                )} */}
            </Stack>
        </>
    )
}