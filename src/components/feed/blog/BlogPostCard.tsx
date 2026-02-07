import { Box, Anchor, AspectRatio, Title, Tooltip, Image, Text } from "@mantine/core"
import { useNavigate } from "@tanstack/react-router"

export default function BlogPostCard( {post, ...rest}: {post: any, [key: string]: any} ) {
    const navigate = useNavigate()

    return <Box
        key={post.id}
        // span={{base: 12, sm: 3.33}}
        id={post.id}
        // component="article"
        style={{
        filter: "opacity(98%)",
        boxShadow: "var(--mantine-shadow-bsBoldWhite)",
        borderRadius: "var(--mantine-radius-md)"
        }}
        // p="2rem"
        // w="100%"
        // mb="2rem"
        bg="none"
        c="white"
        {...rest}
    >
        <Anchor
            // href={`/post/${post.slug}`}
            onClick={(e) => {navigate({to: "/post/$slug", params: {slug: post.slug}})}}
            style={{textDecoration: "none", color: "currentcolor"}}
        >
            <AspectRatio
                ratio={16/9}
                style={{
                    overflow: "hidden",
                    borderRadius: "0 1.5rem 0 0"
                }}
                bg="blurredBackground"
            >
                <Image src={post.thumbnail} alt={post.title}/>
            </AspectRatio>
            <Box m="0" p="2rem">
                <Title
                    order={3}
                    size="1.1rem"
                    fw={300}
                    // mt="2rem"
                    tt="capitalize"
                    ff="text"
                    c="var(--secondary)"
                >
                    {post.category && post.category.length == 2 ? `${post.category[0]} and ${post.category[1]}` :  post.category.length > 2 ? post.category.map((cat: any, index: number) => (index === post.category.length-1 ? cat : `${cat}, `)) : post.category[0]}
                </Title>
                <Tooltip label={post.title}>
                    <Title order={2} size="2rem" fw="bold" mb="1.5rem" lineClamp={1}>{post.title}</Title>
                </Tooltip>
                <Tooltip label={post.excerpt}>
                    <Text fz="1.2rem" lineClamp={3}>{post.excerpt}</Text>
                </Tooltip>
            </Box>
        </Anchor>
    </Box>
}
