'use client'
import { Heading, Link, Stack, Text } from "@chakra-ui/react"

// import { useRouter } from "next/navigation"


// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function MaintenanceModePage() {
    // const router = useRouter()
    // const supabase = createClientComponentClient<Database>()
    // const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_SITE_URL
    // const signInWithGoogle = async () => {
    //     await supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             queryParams: {
    //                 access_type: 'offline',
    //                 prompt: 'consent',
    //             },
    //             redirectTo: `${baseURL}/auth/callback`
    //         }
    //     })
    //     router.refresh();
    // }

    return (
        <>
            <Stack w="100vw" h="100vh" background="black" overflow="hidden" color="white" pos="absolute" top="0" left="0" zIndex="sticky" justifyContent="center" alignItems="center" px="2rem">
                {/* <Button pos="absolute" top="2%" right="2%" opacity="0.09" onClick={signInWithGoogle}>Developer Login</Button> */}
                <Heading textAlign="center" fontSize="5xl" fontWeight="900" color="secondary">Under Development</Heading>
                <Text textAlign="center" fontSize="5xl" fontWeight="900" color="secondary" mt="1rem">Under Development</Text>
                <Text fontSize="2xl" textAlign="center" lineHeight="1.5"> Please note that this version of Donald Louch's Website is currently under development and will not be functional to the public at this time. You may visit the live version of the website at <Link href="https://donaldlouch.ca" variant="primary" color="white">https://donaldlouch.ca</Link>.</Text>
            </Stack>
        </>
    )
}