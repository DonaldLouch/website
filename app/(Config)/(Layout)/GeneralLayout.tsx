'use client'

import { Box } from "@chakra-ui/react";

import Header from "./(Header)";
import Footer from "./(Footer)";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {/* Breaking code: whiteSpace="break-spaces" */}
            <Box as="main" bg="blurredBackground" minH="100vh" pt={{base: "4.5rem", lg: "5.8rem"}} pb={{base: "1rem", lg: "2rem"}} px={{base: "1rem", lg: "5rem"}} overflowX="clip" backdropBlur={"20px"}  wordBreak="break-word">
                {children}
            </Box>
            <Footer />
        </>
    )
}