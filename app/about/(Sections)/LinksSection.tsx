'use client'

import { AspectRatio, Box, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { LinkedSVGButton } from '@/app/(Components)/(Buttons)/LinkedSVGButton'
import { LinkedButton } from '../LinkedButton'
import { LinkButton } from '../LinkButton'
import PinnedPostsCard from '@/app/(Components)/(Cards)/PinnedPostsCard'

export default function LinksSection({about, posts, primaryLinks, links, embeds}: any) {
    return (
        <>
            <SectionTitle headingTitle="Links" />

            <Stack
                id="links"
                direction="row"
                justifyContent={{ base: "flex-start", xl: "center" }}
                m="1.5rem"
                fontSize="2rem"
                color="white"
                gap={{base: "1.2rem", xl: "2rem"}}
                alignItems="center"
                overflowX="scroll"
                overflowY="hidden"
                whiteSpace="nowrap"
            >
                <LinkedSVGButton link="/" title="Go Home" icon="home" />
                {primaryLinks.map((buttonLink: any) => (
                    <LinkedButton {...buttonLink} key={buttonLink.id} />
                ))}
                <Link href="#contact" variant="primary" pt="0.5rem">Contact Me</Link>
                <Link href={`mailto:${about.email}`} variant="primary" pt="0.5rem">Direct Email Me</Link>
            </Stack>
        
            <Tabs
                p="1rem"
                borderRadius="0 2rem"
                isFitted
            >
                <TabList display="flex" justifyContent="center">
                    <Tab>All</Tab>
                    <Tab>Posts</Tab>
                    <Tab>Links</Tab>
                    {/* <Tab>Embed Content</Tab> */}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box my="2rem">
                            {posts.map((post: any) => ( 
                                <PinnedPostsCard {...post} key={`allPinned_${post.id}`} />
                            ))}
                        </Box>
                        {/* {embeds.map((embed: any) => (
                            <AspectRatio
                                key={`allEmbed_$embed.id}`}
                                ratio={16 / 9}
                                w="95%"
                                m="1rem auto"
                                overflow="hidden"
                                zIndex="10000"
                                bg="mainGradient"
                                borderRadius="0 2rem"
                            >
                                <iframe src={`${embed.embedLink}`} allowFullScreen></iframe>
                            </AspectRatio>
                        ))} */}
                        {links.map((link: any) => (
                            <LinkButton {...link} key={`allLink_${link.id}`}  />
                        ))} 
                    </TabPanel>
                    <TabPanel>        
                        <Box my="2rem">
                            {posts.map((post: any) => (  
                                <PinnedPostsCard {...post} key={`pinned_${post.id}`}  />
                            ))}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        {links.map((link: any) => (
                            <LinkButton {...link} key={`link_${link.id}`}  />
                        ))} 
                    </TabPanel>
                    <TabPanel>
                        {/* {embeds.map((embed: any) => (
                            <AspectRatio
                                key={`embed_$embed.id}`}
                                ratio={16 / 9}
                                w="95%"
                                m="1rem auto"
                                overflow="hidden"
                                zIndex="10000"
                                bg="mainGradient"
                                borderRadius="0 2rem"
                            >
                                <iframe src={`${embed.embedLink}`} allowFullScreen></iframe>
                            </AspectRatio>
                        ))} */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
