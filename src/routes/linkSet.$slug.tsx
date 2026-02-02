import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'
import { GetLinkSet } from '@/actions/database/GetDatabase.server'
import { GetMarkdown } from '@/actions/markdown.server'
import AudioPlayer from '@/components/AudioPlayer'
import InlineLink from '@/components/InlineLink'
import { Markdown } from '@/components/markdown'
import DisplayDate from '@/lib/DisplayDate'
import { seo } from '@/utils/seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Title, Group, Badge, Flex, Anchor, ActionIcon, Stack, Text } from '@mantine/core'

import classes from "@/components/buttons/Buttons.module.css"

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/linkSet/$slug')({
  component: RouteComponent,
  loader:  async ({ params }) => {
        const { slug } = params as any
        const set = await GetLinkSet({ data: { slug } }) as any
        const description = await GetMarkdown({ data: { content: set?.description } }) as any
      return { 
        set,
        description,
        
        isUser: await UserLoggedInCheck(),
        isAdmin: await AdminAccessCheck()
      }
    },
  
    head: ({ loaderData }) => ({
      meta: [
        ...seo({
          title: `${loaderData?.set?.setName} | ${import.meta.env.VITE_WEBSITE_NAME}`,
          description: loaderData?.set?.description,
          image: loaderData?.set?.thumbnail!
        }),
      ]
    })
})

function RouteComponent() {
    const { set, description, isUser, isAdmin } = Route.useLoaderData()

    return <>
        <AudioPlayer audioSrc={set.media[0].audioSRC} title={set.setName} thumbnail={set.thumbnail} />
        <Box>
            <Box m="1rem 2rem">
                <Title order={1} fz="3rem" fw="300">{set.setName} - Donald Louch</Title>
                <Group mb="1rem">
                    <Badge color ="red" leftSection={<FontAwesomeIcon icon={["fadl", "calendar"]} size="lg" />}>
                        <DisplayDate source={set.postDate} format="MMMM Do YYYY [at] h:mm A" />
                    </Badge>
                    <Badge color="primary" leftSection={<FontAwesomeIcon icon={["fadl", "folder"]} size="lg" />}>
                        {set.media[0].type}
                    </Badge>
                </Group>
                <Markdown source={description} mah="60vh" />
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
                        <Text component="div">If you have found this on other services or have any issues please do not hesitate to contact me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} />. More services and links maybe added as they become available or known.</Text>
                        {set.links.length > 0 && set.links.map((link: any) => {
                            const iconName = link.icon.name ? link.icon.name 
                                : !link.icon.name && link.linkType.includes("ex") ? "arrow-up-right-01"
                                : !link.icon.name && link.linkType.includes("in") ? "link-square-02"
                                : "link-04"

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
                                    {/* <ActionIcon bg="none" style={{boxShadow: "none", padding: "0", margin: 0}}>{
                                        link.icon.variant.includes("fa")
                                            ? <FontAwesomeIcon icon={[link.icon.variant || "far", iconName]} size="1x" />
                                            : <HugeIcon name={iconName} variant={link.icon.variant || undefined} size="1.5rem" />
                                    }</ActionIcon> */}
                                    <ActionIcon bg="none" style={{boxShadow: "none", padding: "0", margin: 0}}><FontAwesomeIcon icon={[link.icon.pack || "far", iconName]} size="lg" /></ActionIcon>
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
