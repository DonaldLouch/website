'use client'
import {
  Flex,
  Link,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Grid,
  Text,
  Icon,
} from "@chakra-ui/react";

;

import { HeaderSubNavigationItems } from "@/lib/HeaderNavigationItems/SubNavigationItems";
import { BsMenuApp, BsPlus, BsPlusLg } from "react-icons/bs";

interface HeaderNavigationItemProps extends FlexProps {
  slug: any;
  icon: any;
  // iconPre: any;
  isParent: boolean;
  parentID: number | null;
  children: React.ReactNode;
}

export const MobileHeaderNavigationItem = ({
  slug,
  icon,
  // iconPre,
  isParent,
  parentID,
  children,
  ...rest
}: HeaderNavigationItemProps) => {
  return (
    <>
      {isParent == false ? (
        <Link
          href={slug == null ? "" : `../../../${slug}`}
          textDecoration="none"
          fontSize={{ base: "initial", lg: "0.5rem" }}
        >
          <Flex
            align="center"
            fontSize="1.3rem"
            py={{ base: "4", lg: "0rem" }}
            px={{ base: "4", lg: "1rem" }}
            mx="3"
            my="4"
            borderRadius="0 1.5rem"
            role="group"
            cursor="pointer"
            color="white"
            boxShadow="bsBoldPrimary"
            background={"none"}
            _hover={{ bg: "secondary", boxShadow: "none"  }}
            _focus={{ boxShadow: "none" }}
            transition="all 0.3s"
            {...rest}
            justifyContent={{ base: "initial", lg: "center" }}
          >
            <Box
              mr="0.5rem"
              // width="4%"
              color="white"
              display={{ base: "flex", lg: "none" }}
              // mr='1rem' boxSize="1.3rem"
            >
              <Icon boxSize="1.3rem" as={icon} />
            </Box>
            <Text fontSize="1.3rem">{children}</Text>
          </Flex>
        </Link>
      ) : (
        <Grid
          templateColumns={{ base: "80% 15%", lg: "75% 25%" }}
          alignItems="center"
        >
          <Link
            href={`../../../${slug}`}
            textDecoration="none"
            whiteSpace="nowrap"
          >
            <Flex
              align="center"
              fontSize="1.3rem"
              py={{ base: "4", lg: "0rem" }}
              px={{ base: "4", lg: "0.5rem" }}
              mx="3"
              my={{ base: "2.5", lg: "0" }}
              borderRadius="0 1.5rem"
              role="group"
              cursor="pointer"
              color="white"
              bg={"none"}
              boxShadow="bsBoldPrimary"
              _hover={{ bg: "secondary", boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
              transition="all 0.3s"
              justifyContent={{ base: "initial", lg: "center" }}
              gap="0.8rem"
              {...rest}
            >
              <Box
                mr="0.5rem"
                // width="4%"
                color="white"
                display={{ base: "flex", lg: "none" }}
                // mr='1rem' boxSize="1.3rem"
              >
              <Icon boxSize="1.3rem" as={icon} />
            </Box>
              <Text fontSize="1.3rem">{children}</Text>
            </Flex>
          </Link>
          <Menu>
            <MenuButton
              alignItems="center"
              my="1"
              borderRadius={{ base: "0 1.5rem", lg: "0" }}
              role="group"
              cursor="pointer"
              color="white"
              bg="none"
              _hover={{ bg: "secondary", boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
              transition="all 0.3s"
              textDecoration="none"
              w={{ base: "100%", lg: "100%" }}
            >
              <Box
                color="white"
                boxShadow="bsBoldPrimary"
                ml={{ base: "initial", lg: "0rem" }}
                _hover={{ boxShadow: "none", color: "primary" }}
                p={{ base: "0.9rem", lg: "0.5rem" }}
                borderRadius={{ base: "0 1.5rem", lg: "0" }}
                w="100%"
              > 
              <Icon as={BsPlusLg} />
              </Box> 
            </MenuButton>
            <MenuList
             bg="black" 
             border="none"
            >
              {HeaderSubNavigationItems.map(
                  (subLink: any) =>
                    subLink?.parentMenu == parentID && (
                      <MenuItem key={`sub_${parentID}${subLink.slug}`}  bg="black" _hover={{background: "blurredBackground", color:"secondary", fontWeight: "900 !important"}}>
                        {subLink.slug.includes("https://") ? (
                          <Link
                            href={subLink.slug}
                            variant="unstyled"
                            isExternal
                          >
                            {subLink.name}
                          </Link>
                        ) : (
                          <Link
                            href={`../../${subLink.slug}`}
                            variant="unstyled"
                          >
                            {subLink.name}
                          </Link>
                        )}
                      </MenuItem>
                    )
                )}
            </MenuList>
          </Menu>
        </Grid>
      )}
    </>
  );
};
