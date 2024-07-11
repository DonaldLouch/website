'use client'

import { Box,  Stack, Text, Button, AppShell, Group, Anchor, Image, Burger, rem, Center } from '@mantine/core'

import { usePathname, useRouter } from 'next/navigation'

import LoadingComponent from '@/app/(Config)/ContentLoading'
import { Suspense, useEffect, useState } from 'react'
import { UserButton, useClerk, useUser } from '@clerk/nextjs'

import { shadesOfPurple } from '@clerk/themes';
import { useDisclosure, useHeadroom } from '@mantine/hooks'
import Footer from '@/app/(Config)/(Layout)/(Footer)'
import { AdminNavigationItems } from '@/lib/AdminNavigationItems'
import PortalNavigationItem from './PortalNavigationItem'
import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import HeaderNavigationItem from '@/app/(Config)/(Layout)/(Header)/HeaderNavigationItem'
import PrimaryLinkedButton from '@/app/(Components)/(Buttons)/PrimaryLinkedButton'
import { Home01Icon, Logout01Icon } from '@hugeicons/react'

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"

export default function PortalLayoutContext({ children, isUser }: { children: React.ReactNode, isUser: any }) {  
  const path = usePathname()
    const [windowHeight, setWindowHeight] = useState() as any
    const isHero = path === "/" || path === "/portfolio/resume" || path === "/blog" || path.includes("/post") ? true : false
    useEffect(() => {setWindowHeight(window.innerHeight + 60)})
 
    
    // const attachedHeaderHeight = !isHero ? 190 : 800 
    const disabled = path.includes("/video") && !path.includes("feed/video") ? true : false
    const pinned = useHeadroom({ fixedAt: isHero ? windowHeight : 190 })
    const [opened, { toggle }] = useDisclosure()

    const { signOut } = useClerk()
    const router = useRouter()

    const user = useUser()
    
    // const isInOrg = user.user?.organizationMemberships.length === 0 ? false : true
    // const [isAdmin, setIsAdmin] = useState(false)
    
    // useEffect(() => {
    //   if (isInOrg) {
    //     user.user?.organizationMemberships.forEach((org: any) => {
    //       if (org.organization.id === process.env.NEXT_PUBLIC_CLERK_ORG_ID) {
    //           setIsAdmin(org.permissions.includes("org:portal:access"))
    //       }
    //     })
    //   }
    // })
   
    return (
      <>
        <Box
          // mih="80vh"
          // bg="none"
          // // ra="0 2rem"
          // mt={{ base: "0vw", lg: "0" }}
          // // backdropFilter="blur(20px)"
          // w={{base: "100%", lg: "calc(100% + 6rem)"}}
          // mx={{base: "0", lg: "-3rem"}}
        >
          {!isUser ? (
            <Box
              px={{base: "1rem", lg: "5rem"}}  
              style={{overflowX:"clip", backdropBlur:"20px", wordBreak: "break-word", background: "var(--darkPurpleRGBA)"}} 
              mx="auto"
              mih="100vh"
            >
              <Center h="100vh">
              <Stack m="2rem">
                <Text mb="2rem" ta="center" fz="1.5rem">It appears that you are not Donald Louch and thus, can't login to the website admin dashboard! Donald may implement a user portal at one point or another?!</Text>
                <Group justify="center"> 
                  {user.isSignedIn && <Button
                    onClick={() => signOut(() => router.push("/"))}
                    leftSection={<Logout01Icon />} 
                    color="black" 
                    // fullWidth={isFullWidth}
                    variant="filled" 
                    size="lg"
                    classNames={{root: classes.primaryButton}}
                  >
                    Sign Out and Go Home!
                  </Button>}
                  <PrimaryLinkedButton link="/" icon={<Home01Icon />}>Go Home</PrimaryLinkedButton>
                </Group>
                {/* <UserButton afterSignOutUrl="/"/>  */}
              </Stack>
              </Center>
            </Box>
          ) : (
            <AppShell 
                header={{ height: 63, collapsed: !pinned, offset: false }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened } }}
                withBorder={false}
            >
                <AppShell.Header
                    mx="auto"
                    py="0.8rem"
                    px="1.5rem"
                    w={{base: "calc(100vw - 4%)", lg: "calc(100vw - 8%)"}}
                    top={{ base:"2%", lg: "2%" }}
                    left={{ base:"2%", lg: "2%" }}
                    right={{ base:"2%", lg: "2%" }}
                    styles={{header: {borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)", border: "none", background:"var(--darkPurpleRGBA)", backdropFilter: "blur(20px)"}}}
                    h="auto"
                >
                    <Group gap="1rem" mx="auto" justify="space-between" h="auto">
                        <Anchor href="/" m="0" p="0">
                            <Image
                                src="/titleLogo.svg"
                                alt="Donald Louch"
                                w={{ base: "30vw", lg: "12vw" }}
                            />
                        </Anchor>
                        <Group>
                          <UserButton />
                        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="white" />
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar my={{base: "5rem", sm: "1rem"}} p="2rem 1rem" zIndex="5000000" h="calc(100% - 2rem)" styles={{navbar: {borderRadius: "0 2rem 0 0", boxShadow: opened ? "var(--mantine-shadow-bsBoldPrimary)" : "none", border: "none", background:"var(--darkPurpleRGBA)", backdropFilter: "blur(20px)", overflow: "scroll"}}}>
                      {AdminNavigationItems.map((link) => (
                        <PortalNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID} linkName={link.name} icon={link.icon} />
                    ))}
                </AppShell.Navbar>
                <AppShell.Main pt={`calc(${rem(80)} + var(--mantine-spacing-md))`} pb="md" px={{base: "1rem", lg: "5rem"}}  styles={{main: {overflowX:"clip", backdropBlur:"20px", wordBreak: "break-word", mih: "100vh", background: "var(--blurredBackground)"}}} mx="auto">
                  <SectionCard id="portal">
                    {children}
                  </SectionCard>
                </AppShell.Main>
                {/* <AppShell.Footer pos="relative">
                    <Footer />
                </AppShell.Footer> */}
            </AppShell>
          )}
        </Box>
      </>
    )
}
