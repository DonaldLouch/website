'use client'

import { Box,  Stack, Text, Button, AppShell, Group, Anchor, Image, Burger, rem, Center } from '@mantine/core'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// import LoadingComponent from '@/app/(Config)/ContentLoading'
import { Suspense, useEffect, useState } from 'react'
import { SignOutButton, UserButton, useClerk, useUser } from '@clerk/nextjs'

import { shadesOfPurple } from '@clerk/themes';
import { useDisclosure, useHeadroom } from '@mantine/hooks'
import Footer from '@/app/(Config)/(Layout)/(Footer)'
import { AdminNavigationItems } from '@/lib/AdminNavigationItems'
import PortalNavigationItem from './PortalNavigationItem'
import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import HeaderNavigationItem from '@/app/(Config)/(Layout)/(Header)/HeaderNavigationItem'
import PrimaryLinkedButton from '@/app/(Components)/(Buttons)/PrimaryLinkedButton'

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import WebsiteAlerts from '@/app/(Components)/WebsiteAlerts'
import Notifications from '@/app/(Components)/Notifications'
import { PortalNavigationItems } from '@/lib/PortalNavigationItems'
import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import HugeIcon from '@/app/(Components)/HugeIcon'
import InlineLink from '@/app/(Components)/InlineLink'

export default function PortalLayoutContext({ children, isUser, isAdmin }: { children: React.ReactNode, isUser: any, isAdmin: any }) {  
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

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const getOpenID = searchParams.get("openID")
    const redirectPath = getOpenID ? pathname + "?openID=" + getOpenID : pathname
    // console.log(pathname + "?openID=" + getOpenID)

    // const redirectPath = window.location.href.split('/').slice(3).toString().replaceAll(",", "/")

    // console.log("Path", window.location.href.split('/').slice(3).toString().replaceAll(",", "/"))
    
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
                <Text fz="1.5rem">Please note that the client portal has been currently disabled. At this time, Donald Louch has decided to pause the implementation of the Client Portal and will be corresponding to client projects via. email with <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "mail-at-sign-01"}} />.</Text>
                <Text fz="1.5rem">Sorry for any inconvenience this may cause.</Text>
                <PrimaryLinkedButton link="/" icon={<HugeIcon name="home-01" />}>Go Home</PrimaryLinkedButton>
                {/* <Text mb={getOpenID === "newProject" ? "0.5rem" : "2rem"} ta="center" fz="1.5rem">It appears that you're currently not signed in to the Donald Louch Client Portal! You will need to create an account/signin to use any of the Donald Louch Client Portal features!</Text>
                {getOpenID === "newProject" && <Text mb="2rem" ta="center" fz="1.5rem">If you would like to request a new project you must signin to the FREE Donald Louch Client Portal!</Text>}
                <Group justify="center"> 
                  {user.isSignedIn && <Button
                    onClick={() => signOut(() => router.push("/"))}
                    leftSection={<HugeIcon name="logout-01" />}
                    color="black" 
                    // fullWidth={isFullWidth}
                    variant="filled" 
                    size="lg"
                    classNames={{root: classes.primaryButton}}
                  >
                    Sign Out and Go Home!
                  </Button>}
                  <PrimaryLinkedButton link="/" icon={<HugeIcon name="home-01" />}>Go Home</PrimaryLinkedButton>
                  <PrimaryLinkedButton link={`/signin?reURL=${redirectPath}`} icon={<HugeIcon name="login-01" />}>{getOpenID === "newProject" ? "Sign In and Request a Project! (you will be redirected once successfully signed in!)" : "Sign In and Come Back!"}</PrimaryLinkedButton>
                </Group> */}
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
                                src="/titleLogo/titleLogoWhiteColoured.svg"
                                alt="Donald Louch"
                                w={{ base: "30vw", lg: "12vw" }}
                            />
                        </Anchor>
                        <Group>
                          <WebsiteAlerts />
                          <Notifications />
                          {isAdmin && <PrimaryLinkedButton link="/admin" icon={<HugeIcon name="dashboard-browsing" />}>Admin Dashboard</PrimaryLinkedButton>}
                          <UserButton />
                        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="white" />
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar my={{base: "5rem", sm: "1rem"}} p="2rem 1rem" zIndex="5000000" h="calc(100% - 2rem)" styles={{navbar: {borderRadius: "0 2rem 0 0", boxShadow: opened ? "var(--mantine-shadow-bsBoldPrimary)" : "none", border: "none", background:"var(--darkPurpleRGBA)", backdropFilter: "blur(20px)", overflow: "scroll"}}}>
                      {PortalNavigationItems.map((link) => (
                        <PortalNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID} linkName={link.name} icon={link.icon} />
                    ))}
                    <PrimaryButton icon={<HugeIcon name="logout-01" />} color="red" action={() => signOut({ redirectUrl: '/' })}>Sign out</PrimaryButton>
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
