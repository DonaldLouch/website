'use client'
import {
  Box,
  Flex,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Link from "next/link"

import { PortalSubNavigationItems } from "@/lib/PortalNavigationItems/PortalSubNavigationItems"
// import { BsHouseGear } from "react-icons/bs"

interface PortalNavigationItemProps extends FlexProps {
  slug: any;
  // iconName: any;
  // iconPre: any;
  icon: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
  children: React.ReactNode
}

export const PortalNavigationItem = ({
  slug,
  // iconName,
  // iconPre,
  icon,
  isParent,
  parentID,
  levelOfAccess,
  children,
  ...rest
}: PortalNavigationItemProps) => {

  console.log(icon)

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
            {/* mr='1rem' w="1.5rem" h="1.5rem"  */}
            {/* {icon && ( */}
              <Icon mr='1rem' boxSize="1.3rem" as={icon} />
            {/* )} */}
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
              {icon && (
                <Icon mr='1rem' boxSize="1.3rem" as={icon} />
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
