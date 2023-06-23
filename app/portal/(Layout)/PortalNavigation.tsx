'use client'

import { Box, CloseButton, Flex, Image, BoxProps } from "@chakra-ui/react"

import { PortalNavigationItem } from "./PortalNavigationItem";

import { PortalNavigationItems } from "@/lib/PortalNavigationItems"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PortalNavigationProps extends BoxProps {
  onClose: () => void;
}

export const PortalNavigation = ({
  onClose,
  ...rest
}: PortalNavigationProps) => {
  return (
    <Box
      transition="3s ease"
      bg={{base: "black", md: "blurredBackground"}}
      backdropFilter="blur(20px)"
      borderRadius={{base: "0", md: "0 0 0 2rem"}}
      boxShadow="bsBlue"
      w={{ base: "full", md: "15rem" }}
      pos="fixed"
      h={{base: "100vh", md: "auto"}}
      pb="6"
      // top="9%"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Image
          src="/titleLogoPride.svg"
          alt="Donald Louch"
          width="25vw"
          m="0.5rem auto"
        />
        <CloseButton onClick={onClose} />
      </Flex>
      <Box display={{ base: "none", md: "block" }} mt="0.8rem"></Box>
      {PortalNavigationItems.map((link) => (
        <Box key={`port_${link.name}`}>
         <PortalNavigationItem
            slug={link.slug}
            iconPre={link.iconPre}
            iconName={link.iconName}
            isParent={link.isParent}
            parentID={link.parentID}
            levelOfAccess={link.levelOfAccess}
          >
            {link.name}
          </PortalNavigationItem>
        </Box>
      ))}
      <Flex
        align="center"
        p="4"
        mx="3"
        my="1"
        borderRadius="0 1.5rem"
        role="group"
        cursor="pointer"
        color="white"
        bg="red.500"
        _hover={{ bg: "secondary" }}
        _focus={{ boxShadow: "none" }}
        transition="all 0.3s"
        // onClick={() => signOut()}
        fontWeight="900"
      >
        <Box mr="4" width={{ base: "5%", md: "12%" }}>
          <FontAwesomeIcon
            icon={["fas", "sign-out-alt"]}
            color="black"
            width="100%"
          />
        </Box>
        Logout
      </Flex>
    </Box>
  )
}
