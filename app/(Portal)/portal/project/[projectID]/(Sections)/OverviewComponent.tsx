import { Card, Title, Stack, Text, Group, AspectRatio, Anchor, Tooltip, Box } from "@mantine/core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { MdxContent } from '../../../mdx-content';
import Link from "next/link";
import moment from 'moment-timezone';

import { useUser } from '@clerk/nextjs'
import { ContactIcon, MailAtSign01Icon, SmartPhone01Icon, Time02Icon } from "@hugeicons/react";
import { MdxContent } from "@/app/mdx-content";
import DisplayDate from "@/lib/DisplayDate";
// import Loading from "../../../(Config)/ContentLoading";

// type Post = {
//   mdxSource: MDXRemoteSerializeResult;
// };
// async function getDescription(postContent: string): Promise<Post> {
//     const mdxSource = await serialize(postContent, {mdxOptions: {
//         development: process.env.NODE_ENV === 'development',
//     }})
//     return {
//         mdxSource
//     }
// }

// import dayjs from "dayjs"
// import 'dayjs/plugin/timezone';

export default async function OverviewComponent({project, projectDescription}: any) {
    // dayjs.extend(require('dayjs/plugin/timezone'))

    const overviewData = [
        {'field': project.id, 'heading': 'Project ID', 'data': project.id},
        {'field': project.name, 'heading': 'Project Name', 'data': project.name},
        {'field': project.startDate, 'heading': 'Starting Date', 'data': <DisplayDate source={project.startDate} timeZone={project.client.timezone ? project.client.timezone : null} />},
        {'field': project.deadline, 'heading': 'Deadline', 'data': <DisplayDate source={project.deadline} timeZone={project.client.timezone ? project.client.timezone : null} />},
        // {'field': project.startDate, 'heading': 'Starting Date', 'data': moment(new Date(project.startDate)).utc(project.client.timezone).format("MMMM Do, YYYY [at] h:mma")},
        // {'field': project.deadline, 'heading': 'Deadline', 'data': moment(new Date(project.deadline)).utc(project.client.timezone).format("MMMM Do, YYYY [at] h:mma")},
        {'field': 'approval', 'heading': 'Approval', 'data': `The project is currently ${project.isApproved ? "approved" : "not approved"} by Donald Louch`},
        {'field': project.budget, 'heading': 'Budget', 'data': `The estimated budget for the project is ${project.budget}`},
        {'field': project.requestedAt, 'heading': 'Requested At', 'data': <DisplayDate source={project.createdOn} timeZone={project.client.timezone ? project.client.timezone : null} />},
        {'field': project.lastUpdated, 'heading': 'Last Updated On', 'data': <DisplayDate source={project.lastUpdated} timeZone={project.client.timezone ? project.client.timezone : null} />},
        // {'field': project.requestedAt, 'heading': 'Requested At', 'data': moment(new Date(project.createdOn)).utc(project.client.timezone).format("MMMM Do, YYYY [at] h:mma")},
        // {'field': project.lastUpdated, 'heading': 'Last Updated On', 'data': moment(new Date(project.lastUpdated)).utc(project.client.timezone).format("MMMM Do, YYYY [at] h:mma")},
    ]

    const { user } = useUser()
    // console.log(user)
    // const { mdxSource } = await getDescription(project.description)
    return (
        <>
            <Card bg="none" c="white" m="-1rem 0 1rem">
               <Title size="2xl" td="underline" fw="900" order={2}>At a Glance</Title>
                    <Group justify="space-between" gap="3rem" align="flex-start">
                        <Card bg="none" c="white">
                                {overviewData.map((overview:any) =>(
                                    overview.field && (
                                        <Stack key={overview.index} my="0.5rem" pb="0.5rem">
                                            <Title size="1.5rem" ml="-1rem" my="0">{overview.heading}</Title>
                                            <Text my="0.5rem">{overview.data}</Text>
                                        </Stack>
                                    )
                                ))} 
                        </Card>
                        <AspectRatio ratio={16/9} p="2rem" mt="2rem !important" style={{ boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)" }}>
                            <Stack m="0" gap="0">
                                <Title size="2xl" td="underline" fw="900" order={2} ta="center" my="1rem">Client Information</Title>
                                <Tooltip label={`${project.client.firstName} ${project.client.lastName}`}>
                                    <Text fz="2xl" fw="900" lineClamp={1}>{project.client.firstName} {project.client.lastName}</Text>
                                </Tooltip>
                                <Group c="white">
                                    <ContactIcon />
                                    <Tooltip label={project.client.id}>
                                        <Text lineClamp={1}>{project.client.id}</Text>
                                    </Tooltip>
                                </Group>
                                <Group c="white">
                                    <MailAtSign01Icon />
                                    <Tooltip label={`Send an Email to ${project.client.email}`}>
                                        <Anchor href={`mailto:${project.client.firstName} ${project.client.lastName}<${project.client.email}>?subject=RE: Donald Louch Project ${project.id}`} c="var(--secondary)" underline="hover"><Text lineClamp={1}>{project.client.email}</Text></Anchor>
                                    </Tooltip>
                                </Group>
                                <Group c="white">
                                    <SmartPhone01Icon />
                                    <Tooltip label={`Client Phone Number ${project.client.phoneNumber}`}>
                                        <Text lineClamp={1}>{project.client.phoneNumber}</Text>
                                    </Tooltip>
                                </Group>
                                <Group c="white">
                                    <Time02Icon />
                                    <Tooltip label={`It's ${moment().tz(project.client.timezone).format("MMMM Do, YYYY")} for the client right now!; ${project.client.timezone}`}>
                                        {/* MMMM Do, YYYY; h:mma */}
                                        <Text lineClamp={1}><DisplayDate timeZone={project.client.timezone ? project.client.timezone : null} format="h:mma (z)" /></Text>
                                    </Tooltip>
                                </Group>
                            </Stack>
                        </AspectRatio>
                    </Group>
            </Card>
            <Box p="2rem" style={{ boxShadow: "var(--mantine-shadow-bsBoldSecondary)", borderRadius: "var(--mantine-radius-md)" }} mb="0">
                <Title ta="center">Description</Title>
                <MdxContent source={projectDescription} />
            </Box>
        </>
    )
}
