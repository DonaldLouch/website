'use client'

import { Box, Heading, Image, Text } from "@chakra-ui/react";

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
            <Suspense fallback={<LoadingComponent />}>
                <SectionCard id="aboutMe" styleType="primaryCard">
                    <Box id="bio">
                        <Box
                            display="grid"
                            gridTemplateColumns={{ base: "100%", md: "25% 75%" }}
                            gap="2rem"
                            alignItems="center"
                        >
                            <Image
                                src={about.avatar}
                                alt={`${about.firstName} ${about.lastName}`}
                                w={{ base: "50%", md: "100%" }}
                                m="0 auto"
                            />
                            <Box>
                                <Heading
                                    as="h2"
                                    fontSize={{ base: "3rem", md: "5rem" }}
                                    textDecoration="underline"
                                    textDecorationColor="white"
                                >
                                    {about.firstName} {about.middleName} {about.lastName}
                                </Heading>
                                <Text fontSize="2rem" m="0.5rem 0">
                                    {about.pronouns}
                                </Text>
                            </Box>
                        </Box>
                        <Heading
                            as="h3"
                            size="2xl"
                            fontFamily="body"
                            fontWeight="400"
                            my="0.5rem"
                            textDecor="underline"
                        >
                            {about.tagLine}
                        </Heading>
                        <Suspense fallback={<Loading />}>
                            <MdxContent source={mdxSource} />
                        </Suspense> 
                    </Box>
                </SectionCard>
            </Suspense>
        </>
    )
}
