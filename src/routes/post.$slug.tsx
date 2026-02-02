import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'
import { GetBlogPost } from '@/actions/database/GetDatabase.server'
import { GetMarkdown } from '@/actions/markdown.server'
import HomeButton from '@/components/buttons/HomeButton'
import PrimaryLinkedButton from '@/components/buttons/PrimaryLinkedButton'
import LinkBadge from '@/components/LinkBadge'
import { Markdown } from '@/components/markdown'
import TableOfContents from '@/components/TableOfContents'
import DisplayDate from '@/lib/DisplayDate'
import { seo } from '@/utils/seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper, Stack, Group, Title, Text, Image, Anchor, AspectRatio, Badge, Flex, Space, Tooltip, useMantineTheme, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/$slug')({
    component: RouteComponent,
    loader:  async ({ params: { slug } }) => {
        const post = await GetBlogPost({ data: { slug } })  as any
        const body = await GetMarkdown({ data: { content: post?.body} })
        return { 
            post,
            body,

            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
        }
    },

    head: ({ loaderData }) => ({
        meta: [
            ...seo({
                title: `${loaderData?.post?.title} | ${import.meta.env.VITE_WEBSITE_NAME}`,
                description: loaderData?.post?.excerpt,
                keywords: `${import.meta.env.VITE_KEYWORDS},  ${loaderData?.post?.tags}, ${loaderData?.post?.category}`,
                image: loaderData?.post?.thumbnail
            }),
        ]
    })
})

function RouteComponent() {
    const { post, body, isUser, isAdmin } = Route.useLoaderData()

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const shadow = mobile ? "none" : "var(--mantine-shadow-bsBoldPrimary)"

    const toc = new Array({label: post.title, link: "#hero", order: 1})
        post.toc.forEach((section: any) => {
        toc.push({label: section.title, link: `#${section.slug}`, order: 1})
    })

    const isPrivate = post.postStatus === "Private"
    const isDrafted = post.postStatus === "Draft"

    notifications.show({
        id: `postPerm${post.id}`,
        title: isPrivate 
            ? "Private Blog Post" 
            : isDrafted 
            ? "Blog Post is Drafted" 
            : null,
        message:
            isPrivate
            ? `Note that the blog post "${post.title}" is a private post and is only viewable at an administrator level!`
            : isDrafted
            ? `Note that this blog post is drafted! Don't forget to publish the post to the public when you are ready!`
            : null,
        color: "var(--blackRGBA)",
        icon: <FontAwesomeIcon icon={["fal", "info-circle"]} />,
        autoClose: false,
        withCloseButton: true,
    });

    return <Box>
        {!isPrivate || (isPrivate && isUser && isAdmin) 
            ? <>
                <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
                    <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
                    <Box w="100vw" h="100vh">
                        <Image src={post.thumbnail} alt={post.title} w="100vw" h="100vh"/>
                    </Box>
                    <Box><HomeButton icon={<FontAwesomeIcon icon={["fal", "arrow-left"]} size="3x" />} link="/blog" helperText="Go Back to Blog Feed" /></Box> 
                    <Stack component="section" pos="absolute" top="0" left="0" h="100vh" mx={{base: "0.5rem", md: "2rem"}} mah={{base: "auto", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center" miw="calc(100% - 2rem)">
                        <Box bg="var(--darkPurpleRGBA)" 
                            style={{
                                boxShadow: "var(--mantine-shadow-bsSMPrimary)",
                                backdropFilter: "blur(20px)",
                                borderRadius: "var(--mantine-radius-lg)"
                            }} 
                            w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} 
                            p={{base: "1rem", sm: "2rem"}} 
                            mx={{base: "0.5rem", sm: "0"}}
                        >
                            <Flex
                                direction={{base: "column", sm: "row"}}
                                gap={{base: "0.5rem", sm: "2rem"}}
                                justify="flex-start"
                                align="center"
                            >
                                <AspectRatio ratio={16/9} w="50%">
                                    <Image src={post.thumbnail} alt={post.title} />
                                </AspectRatio>               
                                <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
                                    <Stack gap="0">
                                        <Tooltip label={post.title}>
                                            <Title
                                                order={1}
                                                style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                                                fz="3rem"
                                                fw="200"
                                                mb="-0.5rem"
                                                // td="underline 0.4rem var(--primary)"
                                                lineClamp={1}
                                            >
                                                {post.title}
                                            </Title>
                                        </Tooltip>
                                        <Text fz="1.3rem">
                                            {post.excerpt}
                                        </Text>
                                    </Stack>
                                    <Stack gap="1rem" m="1rem 0">
                                        <Group>
                                            {isUser && isAdmin &&
                                                <Anchor href={`/admin/postEdit/${post.slug}`} m="0"><Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "pen"]} size="lg" />} >
                                                    Edit Post
                                                </Badge></Anchor>
                                            }
                                            <Anchor href="/" m="0"><Badge color="primary" leftSection={<FontAwesomeIcon icon={["fadl", "id-badge"]} size="lg" />} >
                                                {post.author}
                                            </Badge></Anchor>
                                            <Badge color="red" leftSection={<FontAwesomeIcon icon={["fadl", "calendar"]} size="lg" />} >
                                                <DisplayDate source={post.postedOn} />
                                            </Badge>
                                            <Group>
                                                {post.category.map((category: any) => (
                                                    <Anchor key={category} href={`/blog/search?type=category&keyword=${category}`} m="0"><Badge color="blue" leftSection={<FontAwesomeIcon icon={["fadl", "folder"]} size="lg" />} >
                                                        {category}
                                                    </Badge></Anchor>
                                                ))}
                                            </Group>
                                            {post.links.length > 0 && post.links.map((link: any, index: number) => (<LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, pack: link.icon.pack}} key={index} />))} 
                                        </Group>
                                    </Stack>
                                </Flex>
                            </Flex>
                            <Group gap="1rem" m="1rem" mah="20vh" style={{overflow: "scroll"}}>
                                <FontAwesomeIcon icon={["fadl", "tags"]} size="lg" />
                                {post.tags.map((tag: any) => (
                                    <Anchor key={tag} href={`/blog/search?type=tag&keyword=${tag}`} m="0"><Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "tag"]} size="lg" />}>
                                        {tag}
                                    </Badge></Anchor>
                                ))}
                            </Group>
                        </Box>
                    </Stack>
                </Box>
                <Space h="101vh" />
                <Box component="article" id="post">
                    <Title order={2} fz="2.5rem" fw="300" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} m="0">{post.headingText}</Title>
                    {post.toc.length > 0 
                        ? <Grid pos="relative" gutter={{base: "0", sm: "5rem"}} my={{base: "1rem", sm: "5rem"}}>
                            <Grid.Col span={{base: 12, sm: 9}} p={{base: "1rem", sm: "1rem 2rem"}} style={{boxShadow: shadow, borderRadius: "var(--mantine-radius-md)"}}>
                                <Markdown source={body} />
                            </Grid.Col>
                            <Grid.Col span={3} top="3rem" bottom="-4rem" pos="sticky" h="74vh" visibleFrom="sm">
                                <Box component="aside" id="sidebar">
                                    <TableOfContents sections={toc} />
                                </Box>
                            </Grid.Col>
                        </Grid>
                        : <Markdown source={body} />
                    }
                </Box>
            </> : ( 
                <Paper p="2rem" color="white" bg="none" shadow="bsBoldSecondary" radius="lg" m="2rem">
                    <Stack align="center">
                        <Group gap="2rem" align="center">
                            <FontAwesomeIcon icon={["fadl", "bell-exclamation"]} size="4x" color="red" />
                            <Title order={1} fz={{base: "2rem", md: "3rem"}}>Private Post</Title>
                        </Group>
                        <Text>🚨 This post is listed as a private post and is not viewable to the public. 🚨</Text>
                        <PrimaryLinkedButton link={{ to: "/blog" }} icon={{ name: "arrow-left", pack: "fadl" }}>Go Back To The Blog Feed</PrimaryLinkedButton>
                    </Stack>
                </Paper>    
            )}
      </Box>
}
