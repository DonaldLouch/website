'use client'

import { AspectRatio, Box, Anchor, Stack, Group, Image, Flex, Tabs, Text, Tooltip, Center, ActionIcon } from '@mantine/core'

import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { LinkedSVGButton } from '@/app/(Components)/(Buttons)/LinkedSVGButton'
import { LinkButton } from '../LinkButton'
import PinnedPostsCard from '@/app/(Components)/(Cards)/PinnedPostsCard'
import { Title } from '@mantine/core'
import { FooterIcon } from '@/app/(Config)/(Layout)/(Footer)/FooterIcon'
// import { BsFacebook, BsTwitterX, BsLinkedin, BsYoutube, BsThreads, BsInstagram, BsTiktok, BsGithub, BsLink45Deg, BsSend, BsEnvelopeAt } from 'react-icons/bs'
import { ArrowUpRight01Icon, Chatting01Icon, Facebook02Icon, GithubIcon, InstagramIcon, Linkedin02Icon, MailAtSign01Icon, MailAtSign02Icon, NewTwitterIcon, ThreadsIcon, TiktokIcon, YoutubeIcon } from '@hugeicons/react'
import InlineLink from '@/app/(Components)/InlineLink'
// import HugeIcon from '@/app/(Components)/HugeIcon'

// import classesMarkdown from "@/app/(Components)/Components.module.css"

export default function LinksSection({about, primaryLinks, links}: any) {
    return <Box component="section" id="links">
        <Title order={2} fz="3rem" fw="300" ta="center" mt="2rem">Links</Title>
        <Text ta="center" mb="2rem">If you have found any additional links and your're unsure if they are my true accounts; or have any issues please do not hesitate to contact me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{"name": "mail-at-sign-01"}} />.</Text>
        
        <Flex
            justify={{base: "flex-start", sm: "center"}}
            c="white"
            gap="1rem"
            w="100%"
            align="center"
            wrap="nowrap"
            style={{
                overflowX: "scroll",
                overflowY: "hidden",
                whiteSpace: "nowrap"
            }}
        >
            {primaryLinks.map((buttonLink: any) => (<FooterIcon linkURL={buttonLink.link} socialMedia={`${buttonLink.title} (${buttonLink.subTitle})`} linkIcon={buttonLink.newIcon[0].name} iconPadding="0.6rem" key={buttonLink.title} iconSize="2rem" iconVariant={buttonLink.newIcon[0].variant} />))}
            <FooterIcon linkURL="/contact" socialMedia="Contact Me" linkIcon="chatting-01" iconPadding="0.6rem"/>
            <FooterIcon linkURL={`mailto:${about.email}`} socialMedia="Direct Email Me" linkIcon="mail-at-sign-01" iconPadding="0.6rem" />
        </Flex>
        <Box>
            {links.map((link: any) => (
                <LinkButton {...link} key={`allLink_${link.id}`}  />
            ))} 
        </Box>
        
    {/*         
        <Tabs
            p="1rem"
            borderRadius="0 2rem"
            isFitted
        >
            <TabList display="flex" justifyContent="center">
                <Tab>All</Tab>
                <Tab>Posts</Tab>
                <Tab>Links</Tab>
                <Tab>Embed Content</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Box my="2rem">
                        {posts.map((post: any) => ( 
                            <PinnedPostsCard {...post} key={`allPinned_${post.id}`} />
                        ))}
                    </Box>
                    {embeds.map((embed: any) => (
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
                    ))}
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
                    {embeds.map((embed: any) => (
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
                    ))}
                </TabPanel>
            </TabPanels>
        </Tabs> */}
   </Box>
}
