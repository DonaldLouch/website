'use client'

import { AspectRatio, Box, Heading, Stack, Text } from "@chakra-ui/react";

import Image from "next/image";

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
// import Loading from "@/app/(Config)/ContentLoading";

// import { Suspense } from "react";

import { MdxContent } from '@/app/mdx-content'
// import { serialize } from 'next-mdx-remote/serialize'
// import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
// type Post = {
//   mdxSource: MDXRemoteSerializeResult
// }
// async function getAboutBio(postContent: string): Promise<Post> {
//   const mdxSource = await serialize(postContent, {mdxOptions: {
//     development: process.env.NODE_ENV === 'development',
//   }})
//   return {
//     mdxSource
//   }
// }

export default function AboutMeBio({about, mdxSource}: any) {
    // const { mdxSource } = await getAboutBio(about.bio!)
    // const mdxSource = await serialize(about.bio!, {mdxOptions: {
    //     development: process.env.NODE_ENV === 'development',
    // }}) as MDXRemoteSerializeResult
    return (
        <>
            <SectionCard id="aboutMe" styleType="primaryCard">
                <Box id="bio">
                    <Stack
                        direction="row"
                        gap="3rem"
                        justifyContent="flex-start"
                        alignItems="center"
                        mb="2rem"
                    >
                        <AspectRatio 
                            // ratio={2/3}
                            ratio={1/1}
                            w={{base: "50%", md: "28%"}}
                            objectPosition="top !important"
                        >
                            <Image
                                src={about.avatar}
                                alt={`${about.firstName} ${about.lastName}`}
                                height="2100" 
                                width="1500"
                                style={{ borderRadius: "0 2rem", objectPosition: "top"}}
                            />
                        </AspectRatio>
                        <Stack>
                            <Heading
                                as="h2"
                                fontSize={{ base: "3rem", md: "5rem" }}
                                textDecoration="underline"
                                textDecorationThickness="0.4rem"
                                textDecorationColor="primary"
                            >
                            {about.firstName} {about.middleName} {about.lastName}
                            </Heading>
                            <Text fontSize="2rem" m="0.5rem 0">
                                {about.pronouns}
                            </Text>
                        </Stack>
                    </Stack>
                    <Heading
                        as="h3"
                        size="2xl"
                        fontFamily="body"
                        fontWeight="300"
                        my="1rem"
                        textDecor="underline"
                        textDecorationThickness="0.2rem"
                        textDecorationColor="primary"
                    >
                        {about.tagLine}
                    </Heading>
                    <MdxContent source={mdxSource} />
                </Box>
            </SectionCard>
        </>
    )
}
