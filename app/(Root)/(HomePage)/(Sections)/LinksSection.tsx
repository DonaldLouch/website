'use client'

import { AspectRatio, Box, Anchor, Stack, Group, Image, Flex, Tabs, Text } from '@mantine/core'

import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { LinkedSVGButton } from '@/app/(Components)/(Buttons)/LinkedSVGButton'
import { LinkedButton } from '../LinkedButton'
import { LinkButton } from '../LinkButton'
import PinnedPostsCard from '@/app/(Components)/(Cards)/PinnedPostsCard'
import { Title } from '@mantine/core'
import { FooterIcon } from '@/app/(Config)/(Layout)/(Footer)/FooterIcon'
import { BsFacebook, BsTwitterX, BsLinkedin, BsYoutube, BsThreads, BsInstagram, BsTiktok, BsGithub, BsLink45Deg, BsSend, BsEnvelopeAt } from 'react-icons/bs'
import { Chatting01Icon, MailAtSign02Icon } from '@hugeicons/react'

export default function LinksSection({about, primaryLinks, links}: any) {
    return <Box component="section" id="links">
        <Title order={2} fz="3rem" fw="300" ta="center" mt="2rem">Links</Title>
        <Text ta="center">Link Icons To Be Updated On GA Release!</Text>
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
            {primaryLinks.map((buttonLink: any) => {
                const icon = 
                    buttonLink.icon === "BsFacebook" ? <BsFacebook size="2rem" /> :
                    buttonLink.icon === "BsTwitterX" ? <BsTwitterX size="2rem" /> :
                    buttonLink.icon === "BsLinkedin" ? <BsLinkedin size="2rem" /> :
                    buttonLink.icon === "BsYoutube" ? <BsYoutube size="2rem" /> :
                    buttonLink.icon === "BsThreads" ? <BsThreads size="2rem" /> :
                    buttonLink.icon === "BsInstagram" ? <BsInstagram size="2rem" /> :
                    buttonLink.icon === "BsTiktok" ? <BsTiktok size="2rem" /> :
                    buttonLink.icon === "BsGithub" ? <BsGithub size="2rem" /> :
                    BsLink45Deg
                return <FooterIcon linkURL={buttonLink.link} socialMedia={`${buttonLink.title} (${buttonLink.subTitle})`} linkIcon={icon} iconPadding="0.6rem"/>
            })}
            <FooterIcon linkURL="#" socialMedia="Contact Me" linkIcon={<Chatting01Icon variant='twotone' size="2rem" />}  iconPadding="0.6rem"/>
            <FooterIcon linkURL={`mailto:${about.email}`} socialMedia="Direct Email Me" linkIcon={<MailAtSign02Icon variant='twotone' size="2rem" />} iconPadding="0.6rem" />
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
