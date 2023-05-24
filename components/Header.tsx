import {
  Box,
  Stack,
  Image,
  Link,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  IconButton,
} from "@chakra-ui/react";

import { HeaderNavigation } from "./Header/HeaderNavigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../lib/fontAwesome";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      role="header"
      mx="auto"
      py="1rem"
      px={{ base: 0, lg: 20 }}
      pos="fixed"
      w="100vw"
      bg="blurredBackground"
      backdropFilter="blur(20px)"
      zIndex="docked"
      boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
    >
      <Stack direction="row" spacing="1rem" mx="auto">
        <Stack
          direction="row"
          align="center"
          w="100%"
          justify={{ base: "space-between", lg: "inherit" }}
          px={{ base: "5rem", lg: "inherit" }}
        >
          <Link href="../../../">
            <Image
              src={useColorModeValue("/titleLogoPride.svg", "/titleLogoPride.svg")}
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
            boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
            aria-label="open menu"
            w="5%"
            // h="auto"
            padding="0.5rem"
            borderRadius="0 1em"
            fontSize="inherit"
            color={useColorModeValue("black", "white")}
            _hover={{
              boxShadow: "none",
              color: useColorModeValue("primary", "grey"),
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
