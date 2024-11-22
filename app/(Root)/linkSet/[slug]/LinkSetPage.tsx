import AudioPlayer from "@/app/(Components)/AudioPlayer";
import { MdxContent } from "@/app/mdx-content";
import DisplayDate from "@/lib/DisplayDate";
import { AppleIcon, ArrowUpRight01Icon, Calendar03Icon, LibraryIcon, Link04Icon, LinkSquare02Icon, MailAtSign01Icon, MusicNote01Icon, SpotifyIcon, YoutubeIcon } from "@hugeicons/react";
import { ActionIcon, Anchor, Badge, Box, Group, Stack, Title, Text, Flex, Tooltip, Center } from "@mantine/core"

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import classesMarkdown from "@/app/(Components)/Components.module.css"
import InlineLink from "@/app/(Components)/InlineLink";

export default function LinkSetPage({ linkSet, mdxSource }: { linkSet: any, mdxSource: any }) {
  return <>
        <AudioPlayer audioSrc={linkSet.media[0].audioSRC} title={linkSet.setName} thumbnail={linkSet.thumbnail} />
        <Box>
            <Box m="1rem 2rem">
                <Title order={1} fz="3rem" fw="300">{linkSet.setName} - Donald Louch</Title>
                <Group mb="1rem">
                    <Badge color ="red" leftSection={<Calendar03Icon />}>
                        <DisplayDate source={linkSet.postDate} format="MMMM Do YYYY [at] h:mm A" />
                    </Badge>
                    <Badge color="primary" leftSection={<LibraryIcon />}>
                        {linkSet.media[0].type}
                    </Badge>
                </Group>

                <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)", overflow: "scroll"}} p="1rem 2rem" mah="60vh">
                    <MdxContent source={mdxSource} />
                </Box>

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
                    <Box w="100%" m="2rem 1rem">
                        <Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Links</Title>                        
                        <Text>If you have found this on other services or have any issues please do not hesitate to contact me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{"name": "mail-at-sign-01"}} />. More services and links maybe added as they become available or known.</Text>
                        {linkSet.links.length > 0 && linkSet.links.map((link: any) => {
                            const linkIcon = link.icon === "Apple" ? <AppleIcon />
                                : link.icon === "Spotify" ? <SpotifyIcon />
                                : link.icon === "YouTube" ? <YoutubeIcon />
                                : link.icon === "" && link.linkType.includes("ex") ? <ArrowUpRight01Icon />
                                : link.icon === "" && link.linkType.includes("in") ? <LinkSquare02Icon />
                                : <MusicNote01Icon />

                            return <Anchor
                                key={link.id}
                                href={link.link ? link.link : "#"}
                                c="currentColor"
                                underline="never"
                                target={link.linkType === "exLink" ? "_blank" : "_self"}
                            >
                                <Group wrap="nowrap" className={ classes.linkButton } 
                                    my="1.5rem"
                                    p={"1.2rem"}
                                    align="center"
                                >
                                    <ActionIcon bg="none" style={{boxShadow: "none", padding: "0", margin: 0}}>{linkIcon}</ActionIcon>
                                    <Stack gap="0" m="0" p="0">
                                        <Text c="white" m="0" fz="1.5rem" p="0" lh="1">{link.name}</Text>
                                        {link.subTitle ? <Text size="sm" c="dimmed" fw={300} m="0.2rem 0" p="0" lh="1">{link.subTitle}</Text> : null}
                                    </Stack>
                                </Group>
                            </Anchor>
                        })}
                    </Box>
                </Flex>
            </Box>
        </Box>
    </>
}