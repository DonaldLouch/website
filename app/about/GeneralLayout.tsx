'use client'

import { Box } from "@chakra-ui/react";

import AboutMeBio from "./(Sections)/AboutMeBio";
import LinksSection from "./(Sections)/LinksSection";
import Contact from "./(Sections)/Contact";

import HomeButton from "../(Components)/(Buttons)/HomeButton";

export default function AboutGeneralLayout({about, posts, primaryLinks, links, embeds, mdxSource}: any) {
    return (
        <>
                <HomeButton />
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    zIndex="overlay"
                    background="black"
                    width="100%"
                    maxW="100%"
                    >
                    <Box
                        as="section"
                        color="white"
                        padding={{ base: "0.5rem", md: "2rem 5rem" }}
                        background="blurredBackground"
                        width="100%"
                        maxW="100%"
                    >
                        <AboutMeBio about={about} mdxSource={mdxSource} />
                        <LinksSection about={about} posts={posts} primaryLinks={primaryLinks} links={links} embeds={embeds}/> 
                        <Contact /> 
                    </Box>
                </Box>
        </>
    )
}
