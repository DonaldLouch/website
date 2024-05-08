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
    useMantineTheme
} from '@mantine/core'

import { PostCard } from '../PostCard'
import { TagsCard } from '../TagsCard'
import { SidebarCard } from '../SidebarCard'
import PostContent from '../PostContent'
import DisplayDate from '@/lib/DisplayDate'
import { ArrowLeft02Icon, Calendar03Icon, ContactIcon, Folder01Icon, Tag01Icon, TagsIcon } from '@hugeicons/react-pro'
import HomeButton from '@/app/(Components)/(Buttons)/HomeButton'
import { useMediaQuery } from '@mantine/hooks'

// const meta = keyframes `
//     0% {
//         left: -30vw;
//     }
//     100% {
//         left: 0;
//     }
// `

export const StandardPostType = ({post, mdxSource}: any) => {
    // const prefersReducedMotion = usePrefersReducedMotion()
    // const metaAnimation = prefersReducedMotion ? undefined : `${meta} ease 2s`
    // const categorySplit = post.categories.split(",")
    // const tagsSplit = post.tags.split(', ')
    return (<>
        <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
            <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
            <Box w="100vw" h="100vh">
                <Image src={post.thumbnail} alt={post.title} w="100vw" h="100vh"/>
            </Box>
            <Box><HomeButton icon={<ArrowLeft02Icon size="3rem" />} link="/blog" helperText="Go Back to Blog Feed" /></Box> 
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
                                        {post.category.map((category: any) => (
                                            <Anchor key={category} href={`/blog/C/${category}`}><Badge color="blue" leftSection={<Folder01Icon />}>
                                                {category}
                                            </Badge></Anchor>
                                        ))}
                                    </Group>
                                </Group>
                            </Stack>
                        </Flex>
                    </Flex>
                    <Group gap="1rem" m="1rem" mah="30vh" style={{overflow: "scroll"}}>
                        <TagsIcon />
                        {post.tags.map((tag: any) => (
                            <Anchor key={tag} href={`/blog/T/${tag}`} m="0"><Badge color="white" leftSection={<Tag01Icon />}>
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
            {post.isSidebar === true ?
            (<SidebarCard post={post} mdxSource={mdxSource}/>) 
            : (<PostContent mdxSource={mdxSource} />)}
        </Box>
        {/* </PostCard> */}
    </>)
}