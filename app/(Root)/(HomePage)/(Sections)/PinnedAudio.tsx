


'use client'


import DisplayDate from '@/lib/DisplayDate'
import { Badge, Text, Group, Paper, Title, Box, useMantineTheme, rem, AspectRatio, Center, Stack, Tooltip, Flex, Anchor, Button } from '@mantine/core'
import { Calendar03Icon, ContactIcon, Folder01Icon, PinIcon, ViewIcon } from '@hugeicons/react'
// // import PrimaryLinkedButton from '../(Buttons)/PrimaryLinkedButton'
// import { useMediaQuery } from '@mantine/hooks'
// // import { Carousel } from '@mantine/carousel';
// import { SectionTitle } from '../SectionTitle'

import classes from "@/app/(Components)/Components.module.css"

function CardPost (post: any) {
    return <Anchor href={`/linkSet/${post.setSlug}`} underline="never" c="white">
        <Flex direction="column" align={{base: "center", lg: "flex-start"}} key={post.id} style={{borderRadius: "var(--mantine-radius-md)"}} m="1.5rem" bg={`url(${post.thumbnail})`} bgp="center" className={classes.pinnedHover}>
            <Stack gap="0" bg="var(--blackRGBA)" w="100%" h="100%" p="0.5rem 2rem" style={{borderRadius: "var(--mantine-radius-md)"}} pos="relative">
                <Title
                    order={1}
                    style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                    fz="2rem"
                    mt="1rem"
                    lineClamp={1}
                >
                    {post.setName}
                </Title>
                <Text fz="1rem" c="grey" fw="300" mt="0" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} lineClamp={2}>
                    {post.excerpt}
                </Text>
                <Stack gap="1rem" m="0" visibleFrom="md" my="0rem">
                    <Group>
                        <Badge color="grey" leftSection={<PinIcon />}>Pinned</Badge>
                        <Badge color="primary" leftSection={<ContactIcon />}>
                            Donald Louch
                        </Badge>
                        <Badge color="red" leftSection={<Calendar03Icon />}>
                            <DisplayDate source={post.postDate} />
                        </Badge>
                        <Group>
                            <Badge color="blue" leftSection={<Folder01Icon />} key={post.media[0].type}>
                                {post.media[0].type}
                            </Badge>
                        </Group>
                    </Group> 
                </Stack>
            </Stack>
        </Flex>
    </Anchor>
}


export default function PinnedAudio({audios}: any) {
    return <Box my="2rem">
        {audios.map((audio: any) => (
            <CardPost {...audio} key={audio.id} />
        ))}
    </Box>
}