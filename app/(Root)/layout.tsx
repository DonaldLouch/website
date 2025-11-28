'use client'

import { Anchor, AppShell, rem, Image, Burger, Tooltip, Box, Flex, NavLink } from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import HugeIcon from "../(Components)/HugeIcon";
import { HeaderLinkProps, HeaderLinks } from "@/lib/HeaderLinks";
import HeaderLink from "../(Components)/(Buttons)/HeaderLink";

import classes from '@/app/(Components)/(Buttons)/Buttons.module.css'
import FooterContent from "../(Config)/(Layout)/(Footer)/FooterContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname()
    const [windowHeight, setWindowHeight] = useState() as any
    const isHero = path.includes("/video") && path != "/feed/videography" || path === "/" || path === "/portfolio/resume" || path === "/blog" || path.includes("/post") || path.includes("/auth") ? true : false
    useEffect(() => {setWindowHeight(window.innerHeight + 60)})
 
    const disabled = path.includes("/embed") || path.includes("/auth") ? true : false
    const pinned = useHeadroom({ fixedAt: isHero ? windowHeight : 190 })
    const [opened, { toggle }] = useDisclosure()

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
                <Flex gap="1rem" mx="auto" justify="space-between" h="auto" wrap="nowrap" align="center">
                    <Tooltip label="Go Home">
                        <Anchor href="/" m="0" p="0">
                            <Image
                                src="/titleLogo/titleLogoWhiteColoured.svg"
                                alt="Donald Louch"
                                w={{ base: "30vw", lg: "15vw" }}
                            />
                        </Anchor>
                    </Tooltip>
                    <Box p="0">
                        <Flex visibleFrom="sm">
                            {HeaderLinks.map((link: HeaderLinkProps, index: number) => (
                                <HeaderLink key={`${link.slug}Header${index}`} {...link} />
                            ))}
                        </Flex>
                        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="white" hiddenFrom="sm" />
                    </Box>
                    <NavLink href="/contact"
                        variant="subtle"
                        classNames={{
                            root: classes.headerLink,
                            label: classes.headerLink_label,
                        }}
                        label="Contact Me"
                        p="1rem"
                        pl="1.5rem"
                        fw="500"
                        rightSection={null}
                        w="fit-content"
                        style={{ boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }}
                        visibleFrom="md"
                    />
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar my={{base: "5rem", sm: "1rem"}} p="2rem 1rem" zIndex="5000000" h="calc(100% - 2rem)" styles={{navbar: {borderRadius: "0 2rem 0 0", boxShadow: opened ? "var(--mantine-shadow-bsBoldPrimary)" : "none", border: "none", background:"var(--darkPurple)", backdropFilter: "blur(20px)", overflowY: "scroll", overflowX: "hidden"}}}>
                <NavLink href="/"
                    variant="subtle"
                    classNames={{
                        root: classes.headerLink,
                        label: classes.headerLink_label,
                        section: classes.headerLink_section
                    }}
                    label="Home"
                    description="My home page where you can find out quick information about me, pinned content, links to my social accounts, and much more."
                    p="1rem"
                    leftSection={<FontAwesomeIcon icon={["fajdr", "house"]} size="lg" />}
                    rightSection={null}
                />
                {HeaderLinks.map((link: HeaderLinkProps, index: number) => (
                    <HeaderLink key={`${link.slug}HeaderMobile${index}`} {...link} isMobile={true} />
                ))}
                <NavLink href="/contact"
                    variant="subtle"
                    classNames={{
                        root: classes.headerLink,
                        label: classes.headerLink_label,
                        section: classes.headerLink_section
                    }}
                    label="Contact Me"
                    description="Here is where you are able to contact me if you have any inquiries."
                    p="1rem"
                    mt="1rem"
                    leftSection={<FontAwesomeIcon icon={["fajr", "envelope"]} size="lg" />}
                    rightSection={null}
                />
                <NavLink href="/#links"
                    variant="subtle"
                    classNames={{
                        root: classes.headerLink,
                        label: classes.headerLink_label,
                        section: classes.headerLink_section
                    }}
                    label="Links"
                    description="Here is the link to all my links to my social accounts, and much more."
                    p="1rem"
                    my="1rem"
                    leftSection={<FontAwesomeIcon icon={["fajr", "link"]} size="lg" />}
                    rightSection={null}
                />
            </AppShell.Navbar>
            <AppShell.Main 
                pt={`calc(${rem(95)} + var(--mantine-spacing-md))`} 
                pb="md" 
                px={{base: "1rem !important", lg: "5rem !important"}}
                styles={{
                    main: {overflowX:"clip", backdropBlur:"20px", wordBreak: "break-word", mih: "100vh", background: "var(--blurredBackground)"}
                }}>
                {children}
            </AppShell.Main>
            <AppShell.Footer pos="relative">
                <FooterContent />
            </AppShell.Footer>
        </AppShell>
}