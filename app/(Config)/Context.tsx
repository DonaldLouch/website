'use client'

import { theme } from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"

import AppLayout from "./(Layout)/AppLayout"

export default function Context({ children, isLoggedIn }: { children: React.ReactNode, isLoggedIn: boolean}) {
    return (
        <ChakraProvider theme={theme} resetCSS={true}>
            <AppLayout isLoggedIn={isLoggedIn}>{children}</AppLayout>
        </ChakraProvider>
    )
}