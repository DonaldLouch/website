'use client'

import { 
    Box,
    // Image,
    Text,
    // keyframes,
    // usePrefersReducedMotion,
    Title,
    Anchor,
    AspectRatio,
    Image,
    Space,
    Flex,
    Stack,
    Group,
    Badge,
    useMantineTheme,
    Tooltip
} from '@mantine/core'

import { SidebarCard } from '../(Components)/SidebarCard'
import PostContent from '../(Components)/PostContent'
import HomeButton from '@/app/(Components)/(Buttons)/HomeButton'
import DisplayDate from '@/lib/DisplayDate'
import { useUser } from '@clerk/nextjs'

import LinkBadge from '@/app/(Components)/LinkBadge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// const meta = keyframes `
//     0% {
//         left: -30vw;
//     }
//     100% {
//         left: 0;
//     }
// `

export const StandardPostType = ({post, mdxSource, isLoggedIn}: any) => {
    // const prefersReducedMotion = usePrefersReducedMotion()
    // const metaAnimation = prefersReducedMotion ? undefined : `${meta} ease 2s`
    // const categorySplit = post.categories.split(",")
    // const tagsSplit = post.tags.split(', ')

    // TODO: Implement <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">?
    const { user } = useUser()
    const isAdmin = user && user.publicMetadata.role === "admin" ? true : false

    return (<>
        <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
            <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
            <Box w="100vw" h="100vh">
                <Image src={post.thumbnail} alt={post.title} w="100vw" h="100vh"/>
            </Box>
            <Box><HomeButton icon={<FontAwesomeIcon icon={["fal", "arrow-left"]} size="3x" />} link="/blog" helperText="Go Back to Blog Feed" /></Box> 
            <Stack component="section" pos="absolute" top="0" left="0" h="100vh" mx={{base: "0.5rem", md: "2rem"}} mah={{base: "auto", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center" miw="calc(100% - 2rem)">
                <Box bg="var(--darkPurpleRGBA)" style={{
                    boxShadow: "var(--mantine-shadow-bsSMPrimary)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--mantine-radius-lg)"
                }} w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} p={{base: "1rem", sm: "2rem"}} mx={{base: "0.5rem", sm: "0"}}>
                    <Flex
                    direction={{base: "column", sm: "row"}}
                    gap={{base: "0.5rem", sm: "2rem"}}
                    justify="flex-start"
                    align="center"
                    >
                        <AspectRatio ratio={16/9} 
                            w="50%"
                        >
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
                                    {isLoggedIn && isAdmin &&
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
                                            <Anchor key={category} href={`/blog/C/${category}`} m="0"><Badge color="blue" leftSection={<FontAwesomeIcon icon={["fadl", "folder"]} size="lg" />} >
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
                            <Anchor key={tag} href={`/blog/T/${tag}`} m="0"><Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "tag"]} size="lg" />}>
                                {tag}
                            </Badge></Anchor>
                        ))}
                    </Group>
                </Box>
            </Stack>
        </Box>
        <Space h="101vh" />
        <Box component="article" id="post">
        {/* <PostCard> */}
            <Title order={2} fz="2.5rem" fw="300" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} m="0">{post.headingText}</Title>
            {post.toc.length > 0 ?
            (<SidebarCard post={post} mdxSource={mdxSource}/>) 
            : (<PostContent mdxSource={mdxSource} />)}
        </Box>
        {/* </PostCard> */}
    </>)
}