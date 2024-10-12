


'use client'

// import { AspectRatio, Card, Heading, Stack, Text, Box } from '@chakra-ui/react'
// 

// import Link from 'next/link'
// import Image from 'next/image'
import DisplayDate from '@/lib/DisplayDate'
// import { BsPinAngle } from 'react-icons/bs'
import { Badge, Text, Group, Paper, Title, Box, useMantineTheme, rem, AspectRatio, Center, Stack, Tooltip, Flex, Anchor, Button } from '@mantine/core'
import { Calendar03Icon, ContactIcon, Folder01Icon, PinIcon, ViewIcon } from '@hugeicons/react'
import PrimaryLinkedButton from '../(Buttons)/PrimaryLinkedButton'
import { useMediaQuery } from '@mantine/hooks'
// import { Carousel } from '@mantine/carousel';
import { SectionTitle } from '../SectionTitle'

import classes from "../Components.module.css"

function CardPost (post: any) {
    return <Anchor href={`/post/${post.slug}`} underline="never" c="white"><Flex direction="column" align={{base: "center", lg: "flex-start"}} key={post.id} style={{borderRadius: "var(--mantine-radius-md)"}} m="1.5rem" bg={`url(${post.thumbnail})`} bgp="center" className={classes.pinnedHover}>
    <Stack gap="0" bg="var(--blackRGBA)" w="100%" h="100%" p="0.5rem 2rem" style={{borderRadius: "var(--mantine-radius-md)"}} pos="relative">
        <Title
            order={1}
            style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
            fz="2rem"
            mt="1rem"
            lineClamp={1}
            // td="underline 0.4rem var(--primary)"
        >
            {post.title}
        </Title>
        <Text fz="1rem" c="grey" fw="300" mt="0" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} lineClamp={2}>
            {post.headingText}
        </Text>
    <Stack gap="1rem" m="0" visibleFrom="md" my="-0.5rem">
        <Group>
            <Badge color="grey" leftSection={<PinIcon />}>
                Pinned
            </Badge>
            <Anchor href="/"><Badge color="primary" leftSection={<ContactIcon />}>
                {post.author}
            </Badge></Anchor>
            <Badge color="red" leftSection={<Calendar03Icon />}>
                <DisplayDate source={post.postedOn} />
            </Badge>
            <Group>
                {post.category.map((category: any) => (
                    <Anchor key={category} href={`/blog/C/${category}`}><Badge color="blue" leftSection={<Folder01Icon />}>
                        {category}
                    </Badge></Anchor>
                ))}
            </Group>
        </Group>
    </Stack>
    </Stack>
</Flex></Anchor>
}


export default function PinnedPostsCard({pinnedPosts}: any) {
    // const theme = useMantineTheme();
    // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const posts = pinnedPosts.map((post: any) => (
        // <Box key={post.id}>
            <CardPost {...post} key={post.id} />
        // </Box>
    ));
    return (<>
    {/* <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
    <Stack gap="0">
        <Title
            order={1}
            style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
            fz="3rem"
            td="underline 0.4rem var(--primary)"
        >
            {post.title}
        </Title>
        <Text fz="1.3rem">
            {post.excerpt}
        </Text>
    </Stack>
    <Stack gap="1rem" m="0">
        <Group>
            <Anchor href="/"><Badge color="primary" leftSection={<ContactIcon />}>
                {post.author}
            </Badge></Anchor>
            <Badge color="red" leftSection={<Calendar03Icon />}>
                <DisplayDate source={post.postedOn} />
            </Badge>
            <Group>
                {categorySplit.map((category: any) => (
                    <Anchor key={category} href={`/blog/C/${category}`}><Badge color="blue" leftSection={<Folder01Icon />}>
                        {category}
                    </Badge></Anchor>
                ))}
            </Group>
        </Group>
    </Stack>
</Flex> */}
    {/* <Box 
        my="2rem"
        p="1rem"
        style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)"}}
    >
        <SectionTitle headingTitle="Pinned Blog Posts" /> */}
        <Box my="2rem">
            {posts}
            </Box>
    {/* </Box> */}
</>)
}
