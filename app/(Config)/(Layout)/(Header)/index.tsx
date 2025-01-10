'use client'

;
// import { BsList } from "react-icons/bs";
import { AppShell, Group, Image, Anchor, Burger } from "@mantine/core";
import { HeaderNavigationItems } from "@/lib/HeaderNavigationItems";
import HeaderNavigationItem from "./HeaderNavigationItem";
import { useDisclosure } from "@mantine/hooks";

// TODO: Look into usePathname() to get active page

export default function Header() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell.Header
      mx="auto"
      py="0.8rem"
      px="1.5rem"
      w={{base: "calc(100vw - 4%)", lg: "calc(100vw - 8%)"}}
      top={{ base:"0", lg: "2%" }}
      left={{ base:"2%", lg: "2%" }}
      right={{ base:"2%", lg: "2%" }}
      styles={{header: {borderRadius: "0 1.5rem", boxShadow: "var(--mantine-shadow-bsBoldPrimary)", border: "none", background:"var(--blurredBackground)", backdropFilter: "blur(20px)"}}}
      h="auto"
    >
      <Group gap="1rem" mx="auto" justify="space-between" h="auto">
        {/* <Group align="center" w="100%" justify="space-between" px={{ base: "5rem", lg: "inherit" }} > */}
          <Anchor href="/" m="0" p="0">
            <Image
              src="/titleLogoWhiteColoured.svg"
              alt="Donald Louch"
              w={{ base: "30vw", lg: "12vw" }}
            />
          </Anchor>
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" c="white" />
          {/* <AppShell.Navbar ></AppShell.Navbar> */}
          {/* <Group wrap="nowrap"> */}
            {/* {HeaderNavigationItems.map((link) => (
                <HeaderNavigationItem key={`nav_${link.name}`} slug={link.slug} isParent={link.isParent} parentID={link.parentID} linkName={link.name} />
              ))} */}
            </Group>
        {/* </Group> */}
    {/* </Box> */}
    </AppShell.Header>
  );
}
