

'use client'

import { AspectRatio, Box, Title, Text, Anchor, Image, Grid, Tooltip } from "@mantine/core";

export default function BlogPostCard(props: any) {
    return (
    <Box
        key={props.id}
        // span={{base: 12, sm: 3.33}}
        id={props.id}
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
    >
        <Anchor
            href={`/post/${props.slug}`}
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
                <Image src={props.thumbnail} alt={props.title}/>
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
                    {props.category && props.category.length == 2 ? `${props.category[0]} and ${props.category[1]}` :  props.category.length > 2 ? props.category.map((cat: any, index: number) => (index === props.category.length-1 ? cat : `${cat}, `)) : props.category[0]}
                </Title>
                <Tooltip label={props.title}>
                    <Title order={2} size="2rem" fw="bold" mb="1.5rem" lineClamp={1}>{props.title}</Title>
                </Tooltip>
                <Tooltip label={props.excerpt}>
                    <Text fz="1.2rem" lineClamp={3}>{props.excerpt}</Text>
                </Tooltip>
            </Box>
        </Anchor>
    </Box>
    )
}