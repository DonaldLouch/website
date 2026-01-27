// "use client"

import { Box,  Stack, Text, AppShell, Group, Anchor, Image, Burger, rem, Center } from '@mantine/core'

import { useEffect, useState } from 'react'
// import { UserButton } from '@clerk/nextjs'

import { useDisclosure, useHeadroom } from '@mantine/hooks'
import AdminNavigationItem from '../(Buttons)/AdminNavigationItem'
import { SectionCard } from '../(Cards)/SectionCard'
import PrimaryLinkedButton from '../(Buttons)/PrimaryLinkedButton'

import InlineLink from '../InlineLink'
import { AdminLinks } from '@/lib/AdminLinks'
import PrimaryButton from '../(Buttons)/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { notifications } from '@mantine/notifications'
import { signOutUser } from '@/actions/auth.server'
import { useNavigate } from '@tanstack/react-router'

export default function AdminLayout({ children, isAdmin }: { children: React.ReactNode, isAdmin: any }) {  
//   const path = usePathname()
//   const router = useRouter()
  const [windowHeight, setWindowHeight] = useState() as any
//   const isHero = path === "/" || path === "/portfolio/resume" || path === "/blog" || path.includes("/post") ? true : false
    const isHero = false
  useEffect(() => {setWindowHeight(window.innerHeight + 60)})

  const pinned = useHeadroom({ fixedAt: isHero ? windowHeight : 190 })
  const [opened, { toggle }] = useDisclosure()

  const navigate = useNavigate();

  const signOut = async () => {
      const res = await signOutUser()
      if (res.code === 200) {
          notifications.show({ 
              title: `Signed Out!`,
              message:"You have been successfully signed out.",
              color: "black",
              icon: <FontAwesomeIcon icon={["fal", "badge-check"]} />
          })
          navigate({
            to: '/auth',
        })
      } else {
          notifications.show({ 
              title: `Error #${res?.code} has Occurred`,
              message: res?.message,
              color: "red",
              icon: <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />
          })
      }
  }

  return <>{!isAdmin ? (
    <Box
      px={{base: "1rem", lg: "5rem"}}  
      style={{overflowX:"clip", backdropBlur:"20px", wordBreak: "break-word", background: "var(--darkPurpleRGBA)"}} 
      mx="auto"
      mih="100vh"
    >
      <Center h="100vh">
        <Stack m="2rem">
          <Text fz="1.5rem" component="span">Please note that the client portal has been currently disabled. At this time, Donald Louch has decided to pause the implementation of the Client Portal and will be corresponding to client projects via. email with <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} />.</Text>
          <Text fz="1.5rem">Sorry for any inconvenience this may cause.</Text>
          <PrimaryLinkedButton link="/" primNewIcon={{pack: "fajdr", name: "house"}}>Go Home</PrimaryLinkedButton>
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
            {/* <UserButton /> */}
            <PrimaryButton onClick={() => signOut()} icon={<FontAwesomeIcon icon={["fal", "person-from-portal"]} />}>Sign Out</PrimaryButton>
            <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="white" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar my={{base: "5rem", sm: "1rem"}} p="2rem 1rem" zIndex="5000000" h="calc(100% - 2rem)" styles={{navbar: {borderRadius: "0 2rem 0 0", boxShadow: opened ? "var(--mantine-shadow-bsBoldPrimary)" : "none", border: "none", background:"var(--darkPurpleRGBA)", backdropFilter: "blur(20px)", overflow: "scroll"}}}>
        {AdminLinks.map((link) => (
          <AdminNavigationItem key={`nav_${link.name}`} {...link} />
        ))}
      </AppShell.Navbar>
      <AppShell.Main 
        pt={`calc(${rem(95)} + var(--mantine-spacing-md))`} 
        pb="md" 
        px={{base: "1rem !important", lg: "5rem !important"}}
        styles={{main: {overflowX:"clip", backdropBlur:"20px", wordBreak: "break-word", mih: "100vh", background: "var(--blurredBackground)"}}} 
        mx="auto"
      >
        <SectionCard id="portal">
          {children}
        </SectionCard>
      </AppShell.Main>
      {/* <AppShell.Footer pos="relative">
        <Footer />
      </AppShell.Footer> */}
    </AppShell>
  )}</>
}