'use client'

import { 
    Box,
    Title,
    Stack,
    Button,
    Grid,
    Text
} from '@mantine/core'

import PostContent from './PostContent'
import TableOfContents from '@/app/(Components)/TableOfContents'

export const SidebarCard = ({post, mdxSource}: any) => {
    // const sectionsSplit = post.sections.split(',')
    const sections = new Array({label: post.title, link: "#hero", order: 1})
    post.sections.forEach((section: any) => {
        sections.push({label: section.title, link: `#${section.slug}`, order: 1})
    })

    return (
        <Grid pos="relative" gutter="5rem" my="5rem">
        <Grid.Col span={9} p="1rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}}>
            <PostContent mdxSource={mdxSource} />
        </Grid.Col>
        <Grid.Col span={3} top="3rem" bottom="-4rem" pos="sticky" h="74vh">
            <Box component="aside" id="sidebar">
                <TableOfContents sections={sections} />
            </Box>
        </Grid.Col>
        </Grid>
    )}
