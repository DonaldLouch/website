'use client'

import { theme } from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"

import AppLayout from "./(Layout)/AppLayout"
// import { MantineProvider } from "@mantine/core"
// import { ClerkProvider } from "@clerk/nextjs";

export default function Context({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={theme} resetCSS={true}>
            <AppLayout>{children}</AppLayout>
        </ChakraProvider>
    )
}