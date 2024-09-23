'use client'

import { Alert, Badge, Button, Divider, Title, Modal, Stack, Tabs, Text, Group, Box, convertCssVariables, Grid, Anchor, Tooltip } from "@mantine/core";
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal"

import { ProjectStatus } from "@/lib/Project/projectStatus";
import DisplayDate from "@/lib/DisplayDate";
import { Cone01Icon, UserIcon, UserShield01Icon } from "@hugeicons/react";
import { serialize } from "next-mdx-remote-client/serialize"
import { MdxContent } from "@/app/mdx-content";

// import { Metadata } from 'next';

// async function getProjectData(projectID: string) {
//   const res = await fetch(`/api/project/getProject?id=${projectID}`, { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error('Failed to fetch project');
//   }
//   return res.json();
// }

async function getBody(body: string) {
    "use sever"
    const replyBody = await serialize({source: body})
    return replyBody
}

export default async function GetReply({ticket, isStaff, reply }: any) {
    const replyBody = await getBody(reply.body)
   
    // UserShield01Icon
    // UserIcon

    return <Box style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: reply.from.type != "admin" ? "var(--mantine-shadow-bsBoldWhite)" : "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem" my="2rem">
        <Group align="center" gap="0.5rem">
            <Box c={reply.from.type != "admin" ? "white" : "secondary"} hidden={reply.from.type != "client"  && reply.from.type != "admin" }>{reply.from && reply.from.type === "client" ? <UserIcon variant="duotone" color="currentColor" /> : reply.from.type === "admin" ? <UserShield01Icon variant="duotone" color="currentColor" /> : null}</Box>
            <Title order={2} fz="1.2rem" c={reply.from.type != "admin" ? "white" : "secondary"} lineClamp={1}>{reply.from ? reply.from.type === "client" ?  `${reply.from.firstName} ${reply.from.lastName}` : "Donald Louch": "Unknown"} <Tooltip label={<DisplayDate source={reply.createdOn} />}><Box component="span" style={{ fontWeight: "300" }} c="gray" fz="0.8rem"><DisplayDate source={reply.createdOn} format="MM/DD/yy @ h:mm a" /></Box></Tooltip></Title>
        </Group>
        <MdxContent source={replyBody} />
    </Box>
}