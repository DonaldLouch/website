'use client'

import { AspectRatio, Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link"
import Image from "next/image"

export default function BlogPostCard(props: any) {
    return (
    <Box
        key={props.id}
        id={props.id}
        as="article"
        filter="opacity(98%)"
        p="2rem"
        borderRadius="0 3rem"
        w="100%"
        mb="2rem"
        bg="none"
        boxShadow="bsBoldWhite"
        _hover={{ boxShadow: "bsBoldWhite", background: "black" }}
        color={"white"}
    >
        <Link
            href={`/post/${props.slug}`}
            style={{textDecoration: "none", color: "currentcolor"}}
        >
            <AspectRatio
                ratio={16 / 9}
                w="calc(100% + 4rem) "
                m="-2rem"
                mb="1rem"
                overflow="hidden"
                bg="blurredBackground"
                borderRadius="0 3rem 0 0"
            >
                <Image src={props.thumbnail} alt={props.title} width="3840" height="2160" />
            </AspectRatio>
            <Heading
                as="h2"
                size="md"
                fontWeight="bold"
                mt="2rem"
                textTransform="uppercase"
                color="secondary"
            >
                {props?.categories.split(",").length >= 1 ? props.categories.replace(",", ", ") : props.categories}
            </Heading>
            <Heading as="h2" size="2xl" fontWeight="bold" mb="1.5rem">{props.title}</Heading>
            <Text fontSize="1.2rem">{props.excerpt}</Text>
        </Link>
    </Box>
    )
}