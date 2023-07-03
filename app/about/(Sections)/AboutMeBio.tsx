'use client'

import { AspectRatio, Box, Heading, Stack, Text } from "@chakra-ui/react";

import Image from "next/image";

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import Loading from "@/app/(Config)/ContentLoading";

import { Suspense } from "react";

import { MdxContent } from '@/app/mdx-content'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import LoadingComponent from "@/app/(Config)/ContentLoading";
type Post = {
  mdxSource: MDXRemoteSerializeResult
}
async function getAboutBio(postContent: string): Promise<Post> {
  const mdxSource = await serialize(postContent, {mdxOptions: {
    development: process.env.NODE_ENV === 'development',
  }})
  return {
    mdxSource
  }
}

export default async function AboutMeBio(about: any) {
    const { mdxSource } = await getAboutBio(about.bio!)
    return (
        <>
            {/* <Suspense fallback={<LoadingComponent />}> */}
                <SectionCard id="aboutMe" styleType="primaryCard">
                    <Box id="bio">
                        {/* <Suspense fallback={<LoadingComponent />}> */}
                            <Stack
                                // display="stack"
                                direction="row"
                                // gridTemplateColumns={{ base: "100%", md: "25% 75%" }}
                                gap="3rem"
                                // justifyContent="center"
                                justifyContent="flex-start"
                                alignItems="center"
                                mb="2rem"
                                // p="0 5rem"
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
                                        // height="3840" 
                                        // width="2160"
                                        height="2100" 
                                        width="1500"
                                        // w={{ base: "50%", md: "100%" }}
                                        // m="0 auto"
                                        style={{ borderRadius: "0 2rem", objectPosition: "top"}}
                                        // borderRadius="0 2rem"

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
                                {/* </Box> */}
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
                                // textAlign="center"
                            >
                                {about.tagLine}
                            </Heading>
                            {/* </Stack> */}
                            {/* </Stack> */}
                            {/* <Suspense fallback={<Loading />}> */}
                                <MdxContent source={mdxSource} />
                            {/* </Suspense>  */}
                        {/* </Suspense> */}
                    </Box>
                </SectionCard>
            {/* </Suspense> */}
        </>
    )
}
