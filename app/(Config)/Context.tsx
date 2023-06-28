'use client'

import { theme } from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"

import AppLayout from "./(Layout)/AppLayout"
// import { ClerkProvider } from "@clerk/nextjs";

export default function Context({ children, isLoggedIn }: { children: React.ReactNode, isLoggedIn: boolean}) {
    return (
        // <ClerkProvider>
            <ChakraProvider theme={theme} resetCSS={true}>
                <AppLayout isLoggedIn={isLoggedIn}>{children}</AppLayout>
            </ChakraProvider>
        // </ClerkP/rovider>
    )
}