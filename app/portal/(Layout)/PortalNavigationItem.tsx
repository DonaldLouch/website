'use client'
import {
  Box,
  Flex,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Link from "next/link"

import { PortalSubNavigationItems } from "@/lib/PortalNavigationItems/PortalSubNavigationItems"

interface PortalNavigationItemProps extends FlexProps {
  slug: any;
  iconName: any;
  iconPre: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
  children: React.ReactNode
}

export const PortalNavigationItem = ({
  slug,
  iconName,
  iconPre,
  isParent,
  parentID,
  levelOfAccess,
  children,
  ...rest
}: PortalNavigationItemProps) => {

  return (
    <>
      {isParent == false ? (
        <Link
          href={slug == null ? "" : `../../../${slug}`}
          style={{textDecoration: "none"}}
        >
          <Flex
            align="center"
            p="4"
            mx="3"
            my="1"
            borderRadius="0 1.5rem"
            role="group"
            cursor="pointer"
            color="white"
            bg="none"
            _hover={{ bg: "secondary", color: "white" }}
            _focus={{ boxShadow: "none" }}
            transition="all 0.3s"
            {...rest}
          >
            {iconName && (
              <Box
                mr="4"
                width={{ base: "4%", md: "12%" }}
                color="white"
              >
                <FontAwesomeIcon
                  icon={[iconPre, iconName]}
                  width="100%"
                />
              </Box>
            )}
            {children}
          </Flex>
        </Link>
      ) : (
        <Menu>
          <MenuButton
            alignItems="center"
            p="4"
            mx="3"
            my="1"
            borderRadius="0 1.5rem"
            role="group"
            cursor="pointer"
            color="secondary"
            bg="none"
            _hover={{ bg: "secondary", color: "primary" }}
            _focus={{ boxShadow: "none" }}
            transition="all 0.3s"
            w={{ base: "96%", md: "initial" }}
            textDecoration="none"
            fontWeight="900"
          >
            <Flex align="center" whiteSpace="nowrap" {...rest}>
              {iconName && (
                <Box
                  mr="4"
                  width={{ base: "4%", md: "12%" }}
                  color="currentColor"
                >
                  <FontAwesomeIcon
                    icon={[iconPre, iconName]}
                    width="100%"
                  />
                </Box>
              )}
              {children}
            </Flex>
          </MenuButton>
          <MenuList
            bg="black" 
            border="none"
            m="-0.5rem"
          >
            {PortalSubNavigationItems.map((subLink: any) => (
               <Box key={`portSub_${parentID}${subLink.slug}`}>
               {subLink?.parentMenu == parentID && (
                 <Link
                   key={`portSub_${parentID}${subLink.slug}`}
                   href={`../../../${subLink.slug}`}
                   style={{textDecoration:"none", color:"white"}}
                 >
                   <MenuItem textDecoration="none"  bg="black" _hover={{background: "blurredBackground", color:"secondary", fontWeight: "900 !important"}}>{subLink.name}</MenuItem>
                 </Link>
               )}
               </Box>
            ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
};
