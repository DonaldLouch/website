'use client'

import { 
    Box,
    Grid,
    useMantineTheme
} from '@mantine/core'

import PostContent from './PostContent'
import TableOfContents from '@/app/(Components)/TableOfContents'
import { useMediaQuery } from '@mantine/hooks'

export const SidebarCard = ({post, mdxSource}: any) => {
    // const sectionsSplit = post.sections.split(',')
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const shadow = mobile ? "none" : "var(--mantine-shadow-bsBoldPrimary)"
    
    const toc = new Array({label: post.title, link: "#hero", order: 1})
    post.toc.forEach((section: any) => {
        toc.push({label: section.title, link: `#${section.slug}`, order: 1})
    })

    return (
        <Grid pos="relative" gutter={{base: "0", sm: "5rem"}} my={{base: "1rem", sm: "5rem"}}>
        <Grid.Col span={{base: 12, sm: 9}} p={{base: "1rem", sm: "1rem 2rem"}} style={{boxShadow: shadow, borderRadius: "var(--mantine-radius-md)"}}>
            <PostContent mdxSource={mdxSource} />
        </Grid.Col>
        <Grid.Col span={3} top="3rem" bottom="-4rem" pos="sticky" h="74vh" visibleFrom="sm">
            <Box component="aside" id="sidebar">
                <TableOfContents sections={toc} />
            </Box>
        </Grid.Col>
        </Grid>
    )}
