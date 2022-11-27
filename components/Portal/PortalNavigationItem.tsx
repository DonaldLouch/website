import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/fontAwesome";

import { PortalSubNavigationItems } from "../../lib/PortalNavigationItems/PortalSubNavigationItems";

interface PortalNavigationItemProps extends FlexProps {
  slug: any;
  iconName: any;
  iconPre: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
  children: ReactNode
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
  const blackWhiteColour = useColorModeValue("black", "white");
  const primeColour = useColorModeValue("primary", "secondary");

  return (
    <>
      {isParent == false ? (
        <Link
          href={slug == null ? "" : `../../../${slug}`}
          textDecoration="none"
        >
          <Flex
            align="center"
            p="4"
            mx="3"
            my="1"
            borderRadius="0 1.5rem"
            role="group"
            cursor="pointer"
            color={blackWhiteColour}
            bg="none"
            _hover={{ bg: "secondary" }}
            _focus={{ boxShadow: "none" }}
            transition="all 0.3s"
            {...rest}
          >
            {iconName && (
              <Box
                mr="4"
                width={{ base: "4%", md: "12%" }}
                color={blackWhiteColour}
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
            color={primeColour}
            bg="none"
            _hover={{ bg: "secondary" }}
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
                  color={primeColour}
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
            bg={useColorModeValue('white', 'black')}
            boxShadow="bsBlue"
            m="-0.5rem"
          >
            {PortalSubNavigationItems.map((subLink: any) => (
               <Box key={`portSub_${parentID}${subLink.slug}`}>
               {subLink?.parentMenu == parentID && (
                 <Link
                   key={`portSub_${parentID}${subLink.slug}`}
                   href={`../../../${subLink.slug}`}
                   variant="unstyled"
                   textDecoration="none"
                 >
                   <MenuItem textDecoration="none" bg={useColorModeValue('white', 'black')}>{subLink.name}</MenuItem>
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
