import React from "react";
import { Box, CloseButton, Flex, Image, BoxProps } from "@chakra-ui/react";

import { signOut } from "next-auth/react";

// import React from 'react';
// import nookies from "nookies"

// import { FirebaseAuth } from "../../config/Firebase/FirebaseClient"

import { PortalNavigationItems } from "../../config/PortalNavigationItems";
// import { PortalSubNavigationItems } from '../../config/Portal/PortalSubNavigationItems'

import { PortalNavigationItem } from "./PortalNavigationItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../config/fontAwesome";

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
      bg="blurredBackground"
      backdropFilter="blur(20px)"
      borderRadius="0 0 0 2rem"
      boxShadow="bsBlue"
      //borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="auto"
      pb="6"
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
          src="/titleLogo.svg"
          alt="Donald Louch"
          width="25vw"
          m="0.5rem auto"
          // display={{ base: 'flex', md: 'none' }}
        />
        <CloseButton onClick={onClose} />
      </Flex>
      <Box display={{ base: "none", md: "block" }} mt="0.8rem"></Box>
      {PortalNavigationItems.map((link) => (
        // <FontAwesomeIcon icon={['fab', linkIcon]} />
        <>
          <PortalNavigationItem
            key={link.name}
            slug={link.slug}
            iconPre={link.iconPre}
            iconName={link.iconName}
            isParent={link.isParent}
            parentID={link.parentID}
            levelOfAccess={link.levelOfAccess}
          >
            {link.name}
          </PortalNavigationItem>
        </>
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
        onClick={() => signOut()}
        fontWeight="900"
      >
        <Box mr="4" width={{ base: "5%", md: "12%" }}>
          <FontAwesomeIcon
            icon={["fas", "sign-out-alt"]}
            color="black"
            // {
            //     useColorModeValue('black', 'white')
            // }
            width="100%"
          />
        </Box>
        Logout
      </Flex>
    </Box>
  );
};
