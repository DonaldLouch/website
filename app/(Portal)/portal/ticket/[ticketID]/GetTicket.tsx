'use client'

import { Alert, Badge, Button, Divider, Title, Modal, Stack, Tabs, Text, Group, Box, convertCssVariables, Grid, Anchor, Tooltip, AspectRatio } from "@mantine/core";
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal"

import { ProjectStatus } from "@/lib/Project/projectStatus";
import DisplayDate from "@/lib/DisplayDate";
import { Cone01Icon, ContactIcon, Files01Icon, Loading03Icon, MailAtSign01Icon, SmartPhone01Icon, Time02Icon, UserIcon, UserShield01Icon } from "@hugeicons/react";
import { serialize } from "next-mdx-remote-client/serialize"
import { MdxContent } from "@/app/mdx-content";
import GetReply from "./GetReply";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AddReply from "./AddReply";
import StatusBadge from "../../project/(Components)/StatusBadge";
import PriorityBadge from "../../project/(Components)/PriorityBadge";
import EditTicket from "./EditTicket";

import { MDXBody } from "@/app/actions/mdxBody"

// import { Metadata } from 'next';

// async function getProjectData(projectID: string) {
//   const res = await fetch(`/api/project/getProject?id=${projectID}`, { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error('Failed to fetch project');
//   }
//   return res.json();
// }

// async function getBody(body: string) {
//     "use server"
//     const ticketBody = await serialize({source: body})
//     return ticketBody
// }

export default async function GetTicket({ticket, isStaff, replies }: any) {
    // const { user } = useUser()


    // const ticketBody = await getBody(ticket.body) //TO DO: Fix this
    // const ticketBody = ticket.body
    
    const breadCrumbs = [
        {"pageLink": "/portal/tickets", "pageName": "Tickets"},
        {"pageLink": null, "pageName": ticket.id},
    ]


    const ticketStatus = ProjectStatus.find(({ id }) => id === ticket.status)

    const ticketBody = await MDXBody(ticket.body)

    return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Group justify="space-between" align="center">
            <Stack gap="0">
                <Title order={1} mt="3rem" lh="0.2">{ticket.subject}</Title>
                <Text fz="sm" c="gray">Ticket ID: <Anchor href={`/portal/ticket/${ticket.id}`} c="var(--secondary)" fz="inherit">{ticket.id}</Anchor> created on <DisplayDate source={ticket.createdOn} /></Text>
            </Stack>
            <Group>
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
            </Group>
        </Group>
        <Divider m="1rem 2rem" color="gray" />
        <Grid gutter="2rem" m="3rem 2rem">
            <Grid.Col span={{base: 12, sm: 8}} style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldWhite)", overflow: "scroll" }} p="2rem" mah="80vh">
                <Box style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }} p="2rem">
                    <Group align="center" gap="0.5rem">
                        <Box c={ticket.from.type != "admin" ? "white" : "secondary"} hidden={ticket.from.type != "client"  && ticket.from.type != "admin" }>{ticket.from && ticket.from.type === "client" ? <UserIcon variant="duotone" color="currentColor" /> : ticket.from.type === "admin" ? <UserShield01Icon variant="duotone" color="currentColor" /> : null}</Box>
                        <Title order={2} fz="1.2rem" c={ticket.from.type != "admin" ? "white" : "secondary"} lineClamp={1}>{ticket.from ? ticket.from.type === "client" ?  `${ticket.from.firstName} ${ticket.from.lastName}` : "Donald Louch": "Unknown"} <Tooltip label={<DisplayDate source={ticket.createdOn} />}><Box component="span" style={{ fontWeight: "300" }} c="gray" fz="0.8rem"><DisplayDate source={ticket.createdOn} format="MM/DD/yy @ h:mm a" /></Box></Tooltip></Title>
                    </Group>
                    <MdxContent source={ticketBody} />
                </Box>
                <Divider m="2rem 2rem 1rem" color="gray" label="Replies" labelPosition="center" />
                {replies.map((reply: any, index: number) => (
                    <GetReply key={index} ticket={ticket} isStaff={isStaff} reply={reply} />
                ))}
            </Grid.Col>
            <Grid.Col span={{base: 12, sm: 4}}>
                <Stack gap="0" pl="2rem">
                    {ticket.from.type === "client" || ticket.from.type === "assigned" ? 
                        <AspectRatio ratio={16/9} p="2rem" style={{ boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)" }} mt="-1rem">
                            <Stack m="0" gap="0">
                                <Title size="2xl" td="underline" fw="900" order={2} ta="center" my="1rem">{ticket.from.type === "client"  ? "Created By" : ticket.from.type === "assigned" && "Assigned Information"}</Title>
                                <Tooltip label={`${ticket.from.firstName} ${ticket.from.lastName}`}>
                                    <Text fz="2xl" fw="900" lineClamp={1}>{ticket.from.firstName} {ticket.from.lastName}</Text>
                                </Tooltip>
                                {ticket.from.id &&
                                    <Group c="white" wrap="nowrap">
                                        <ContactIcon />
                                        <Tooltip label={ticket.from.id}>
                                            <Text lineClamp={1}>{ticket.from.id}</Text>
                                        </Tooltip>
                                    </Group>
                                }
                                <Group c="white" wrap="nowrap">
                                    <MailAtSign01Icon />
                                    <Tooltip label={`Send an Email to ${ticket.from.email}`}>
                                        <Anchor href={`mailto:${ticket.from.firstName} ${ticket.from.lastName}<${ticket.from.email}>?subject=RE: Donald Louch Project ${ticket.id}>`} c="var(--secondary)" underline="hover"><Text lineClamp={1}>{ticket.from.email}</Text></Anchor>
                                    </Tooltip>
                                </Group>
                                {ticket.from.phoneNumber &&
                                    <Group c="white" wrap="nowrap">
                                        <SmartPhone01Icon />
                                        <Tooltip label={`Client Phone Number ${ticket.from.phoneNumber}`}>
                                            <Text lineClamp={1}>{ticket.from.phoneNumber}</Text>
                                        </Tooltip>
                                    </Group>
                                }{ticket.from.timezone &&
                                    <Group c="white" wrap="nowrap">
                                        <Time02Icon />
                                        <Tooltip label={`It's ${moment().tz(ticket.from.timezone).format("MMMM Do, YYYY")} for the client right now!; ${ticket.from.timezone}`}>
                                            <Text lineClamp={1}><DisplayDate timeZone={ticket.from.timezone ? ticket.from.timezone : null} format="h:mma (z)" /></Text>
                                        </Tooltip>
                                    </Group>
                                }
                            </Stack>
                        </AspectRatio>
                    : <Text>No information available.</Text>}
                    {ticket.relatedTo && <>
                        <Title size="2xl" td="underline" fw="900" order={2} ta="center" mt="2rem">Ticket is Related To</Title>
                        <Tooltip label={`Go to the project page for this ticket`}>
                            <Anchor unstyled href={`/portal/project/${ticket.relatedTo.id}`}>
                                <Badge color="gray" leftSection={<Files01Icon />}>
                                    {ticket.relatedTo.id}
                                </Badge>
                            </Anchor>
                        </Tooltip>
                    </>}
                    {<EditTicket ticket={ticket} isStaff={isStaff} />}
                </Stack>
            </Grid.Col>
        </Grid>
        <Box style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldWhite)" }} p="2rem" mt="3rem">
            <AddReply ticket={ticket} isStaff={isStaff} />
        </Box>
    </>
    )
}