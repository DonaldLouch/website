'use client'

import {
Box,
Stack,
Text,
Image,
Link,
Button,
} from "@chakra-ui/react";

import { FooterIcon } from "./FooterIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function FooterContent({ isLoggedIn }: { isLoggedIn: boolean}){
  const router = useRouter()  
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.SITE_URL
  const supabase = createClientComponentClient<Database>()
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${baseURL}/auth/callback`
      }
    })
    router.refresh();
  }
  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <Box
      bg="black"
      maxW="100vw"
      boxShadow="bsBoldBlue"
    >
      <Box
        as="footer"
        role="contentinfo"
        mx="auto"
        py="10"
        px={32}
        color="white"
        pos="relative"
      >
        <Stack>
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing="4"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <Link href="#">
              <Image
                src="/titleLogoWhite.svg"
                alt="Donald Louch"
                width={{base: "100%", lg: "20vw !important"}}
                height="auto"
              />
            </Link>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="4"
              alignItems="center"
              justifyContent="space-between"
              pb={{ base: "1rem", lg: "0" }}
              mx={{ base: "4rem", lg: "0" }}
            >
            <iframe
              src="https://github.com/sponsors/DonaldLouch/button"
              title="Sponsor DonaldLouch"
              height="35"
              width="116"
            ></iframe>
            <Stack direction="row" alignItems="baseline" mt="-0.5rem">
              <FooterIcon
                linkURL="https://facebook.com/DonaldLouchProductions"
                socialMedia="Facebook"
                linkIcon="facebook"
              />
              <FooterIcon
                linkURL="https://twitter.com/DonaldLouch"
                socialMedia="Twitter"
                linkIcon="twitter"
              />
              <FooterIcon
                linkURL="https://instagram.com/donaldlouch"
                socialMedia="Instagram"
                linkIcon="instagram"
              />
              <FooterIcon
                linkURL="https://youtube.donaldlouch.ca"
                socialMedia="YouTube"
                linkIcon="youtube"
              />
              <FooterIcon
                linkURL="https://github.com/DonaldLouch"
                socialMedia="GitHub"
                linkIcon="github"
              />
            </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "flex-start" }}
          >
            <Text fontSize="sm" fontWeight="medium" m="0">&copy; 1994 - {new Date().getFullYear()} Donald Louch.</Text>
          </Stack>
          {isLoggedIn ? 
            <Button pos="absolute" bottom="3%" right="0" opacity="0.09" onClick={signOut} size="xs">Logout</Button>
          :   
            <Button pos="absolute" bottom="3%" right="0" opacity="0.09" onClick={signInWithGoogle} size="xs">Developer Login</Button>  
          } 
        </Stack>
      </Box>
    </Box>
  );
}
