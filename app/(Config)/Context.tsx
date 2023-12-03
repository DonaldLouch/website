'use client'

import { theme } from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"

import AppLayout from "./(Layout)/AppLayout"
// import { MantineProvider } from "@mantine/core"
// import { ClerkProvider } from "@clerk/nextjs";

export default function Context({ children }: { children: React.ReactNode }) {
    return (
        // <ClerkProvider>
            <ChakraProvider theme={theme} resetCSS={true}>
                {/* <MantineProvider> */}
                    <AppLayout>{children}</AppLayout>
                {/* </MantineProvider> */}
            </ChakraProvider>
        // </ClerkProvider>
    )
}