'use client'

import { Title, Group, Box, Tooltip } from "@mantine/core";

import DisplayDate from "@/lib/DisplayDate";
import { MdxContent } from "@/app/mdx-content";
import { MDXBody } from "@/app/actions/mdxBody";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default async function GetReply({ reply }: any) {
    // const replyBody = await getBody(reply.body) //TO DO: Fix this
    const replyBody = await MDXBody(reply.body)
//    const replyBody = reply.body
    // UserShield01Icon
    // UserIcon

    return <Box style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: reply.from.type != "admin" ? "var(--mantine-shadow-bsBoldWhite)" : "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem" my="2rem">
        <Group align="center" gap="0.5rem">
            <Box c={reply.from.type != "admin" ? "white" : "secondary"} hidden={reply.from.type != "client"  && reply.from.type != "admin" }>{reply.from && reply.from.type === "client" ? <HugeIcon name="user" variant="duotone" color="currentColor" /> : reply.from.type === "admin" ? <HugeIcon name="user-shield-01" variant="duotone" color="currentColor" /> : null}</Box>
            <Title order={2} fz="1.2rem" c={reply.from.type != "admin" ? "white" : "secondary"} lineClamp={1}>{reply.from ? reply.from.type === "client" ?  `${reply.from.firstName} ${reply.from.lastName}` : "Donald Louch": "Unknown"} <Tooltip label={<DisplayDate source={reply.createdOn} />}><Box component="span" style={{ fontWeight: "300" }} c="gray" fz="0.8rem"><DisplayDate source={reply.createdOn} format="MM/DD/yy @ h:mm a" /></Box></Tooltip></Title>
        </Group>
        {/* <Text>{replyBody}</Text> */}
        <MdxContent source={replyBody} />
    </Box>
}