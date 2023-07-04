'use client'

import { AspectRatio, Box, Heading, Stack, Text } from "@chakra-ui/react";

import Image from "next/image";

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";

import { MdxContent } from '@/app/mdx-content'

export default function AboutMeBio({about, mdxSource}: any) {
    return (
        <>
            <SectionCard id="aboutMe" styleType="primaryCard">
                <Box id="bio">
                    <Stack
                        direction={{base: "column", lg: "row"}}
                        gap={{base: "0.5rem", lg: "2rem", xl: "3rem"}}
                        justifyContent="flex-start"
                        alignItems="center"
                        mb="2rem"
                    >
                        <AspectRatio 
                            // ratio={2/3}
                            ratio={1/1}
                            // w={{base: "50%", md: "28%"}}
                            w={{base: "70%", lg: "30%", xl: "28%"}}
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
                        <Stack alignItems={{base: "center", lg: "flex-start"}} mt={{base: "1rem", lg: "0"}}>
                            <Heading
                                as="h2"
                                fontSize={{ base: "7vw", md:"5vw" }}
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
                        fontSize={{base: "5vw", lg: "4vw", xl: "3vw"}}
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
