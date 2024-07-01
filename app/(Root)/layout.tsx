'use client'

import { Anchor, AppShell, Group, rem, Image, Burger } from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { HeaderNavigationItems } from "@/lib/HeaderNavigationItems";
import HeaderNavigationItem from "../(Config)/(Layout)/(Header)/HeaderNavigationItem";
import Footer from "../(Config)/(Layout)/(Footer)";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

// import {hugeiconsLicense} from "@hugeicons/react";
// const iconLICENSE = process.env.NEXT_PUBLIC_HUGEICONSLICENSE as string
// hugeiconsLicense(iconLICENSE)

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname()
    const [windowHeight, setWindowHeight] = useState() as any
    const isHero = path.includes("/video") && path != "/feed/videography" || path === "/" || path === "/portfolio/resume" || path === "/blog" || path.includes("/post") ? true : false
    useEffect(() => {setWindowHeight(window.innerHeight + 60)})
 
    
    // const attachedHeaderHeight = !isHero ? 190 : 800 
    // path.includes("/video") && path != "/feed/videography" ||
    const disabled = path.includes("/embed") ? true : false
    const pinned = useHeadroom({ fixedAt: isHero ? windowHeight : 190 })
    const [opened, { toggle }] = useDisclosure()

    // console.log("Layout is disabled?", disabled)
    // const [opened { open, close }] = useDisclosure(false)

    return <AppShell 
        header={{ height: 63, collapsed: !pinned, offset: false }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened } }}
        withBorder={false}
        disabled={disabled}
    >
        <AppShell.Header
            mx="auto"
            py="0.8rem"
            px="1.5rem"
            w={{base: "calc(100vw - 4%)", lg: "calc(100vw - 8%)"}}
            top={{ base:"2%", lg: "2%" }}
            left={{ base:"2%", lg: "2%" }}
            right={{ base:"2%", lg: "2%" }}
            styles={{header: {borderRadius: "0 1.5rem", boxShadow: "var(--mantine-shadow-bsBoldPrimary)", border: "none", background:"var(--darkPurpleRGBA)", backdropFilter: "blur(20px)"}}}
            h="auto"
        >
            <Group gap="1rem" mx="auto" justify="space-between" h="auto">
                <Anchor href="/" m="0" p="0">
                    <Image
                        src="/titleLogoWhite.svg"
                        alt="Donald Louch"
                        w={{ base: "30vw", lg: "12vw" }}
                    />
                </Anchor>
                <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="white" />
            </Group>
        </AppShell.Header>
        <AppShell.Navbar my={{base: "5rem", sm: "1rem"}} p="2rem 1rem" zIndex="5000000" h="calc(100% - 2rem)" styles={{navbar: {borderRadius: "0 2rem 0 0", boxShadow: opened ? "var(--mantine-shadow-bsBoldPrimary)" : "none", border: "none", background:"var(--darkPurple)", backdropFilter: "blur(20px)"}}}>
            {HeaderNavigationItems.map((link) => (
                <HeaderNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID} linkName={link.name} icon={link.icon} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main pt={`calc(${rem(70)} + var(--mantine-spacing-md))`} pb="md" px={{base: "1rem", lg: "5rem"}} styles={{main: {overflowX:"clip", backdropBlur:"20px", wordBreak: "break-word", mih: "100vh", background: "var(--blurredBackground)"}}}>
            {children}
        </AppShell.Main>
        <AppShell.Footer pos="relative">
            <Footer />
        </AppShell.Footer>
    </AppShell>
}