'use client'

import {
  Box,
  Stack,
  Image,
  Link,
  useDisclosure,
  Drawer,
  DrawerContent,
  IconButton,
} from "@chakra-ui/react";

import { HeaderNavigation } from "./HeaderNavigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// TODO: Look into usePathname() to get active page

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      role="header"
      mx="auto"
      py="0.8rem"
      px="1.5rem"
      pos="fixed"
      w={{base: "calc(100vw - 4%)", lg: "calc(100vw - 8%)"}}
      bg="blurredBackground"
      backdropFilter="blur(20px)"
      zIndex="docked"
      boxShadow="bsBoldPrimary"
      borderRadius={{base: "0 0 1.5rem 1.5rem", lg: "0 1.5rem"}}
      top={{ base:"0", lg: "2%" }}
      left={{ base:"2%", lg: "2%" }}
      right={{ base:"2%", lg: "2%" }}
    >
      <Stack direction="row" spacing="1rem" mx="auto" justifyContent="space-between">
        <Stack
          direction="row"
          align="center"
          w="100%"
          justify={{ base: "space-between", lg: "inherit" }}
          // px={{ base: "5rem", lg: "inherit" }}
        >
          <Link href="../../../">
            <Image
              src="/titleLogoWhite.svg"
              alt="Donald Louch"
              width={{ base: "30vw", lg: "12vw" }}
            />
          </Link>
          <HeaderNavigation
            onClose={() => onClose}
            display={{ base: "none", lg: "flex" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <HeaderNavigation onClose={onClose} />
            </DrawerContent>
          </Drawer>

          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
            variant="unstyled"
            boxShadow="bsBoldPrimary"
            aria-label="open menu"
            w="5%"
            // h="auto"
            padding="0.5rem"
            borderRadius="0 1em"
            fontSize="inherit"
            color="white"
            _hover={{
              boxShadow: "none",
              color: "primary",
            }}
            icon={
              <FontAwesomeIcon
                icon={"grip"}
                height="100%"
                width="100%"
              />
            }
          />
        </Stack>
      </Stack>
    </Box>
  );
}
