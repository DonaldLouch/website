'use client'

import {
  Link,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Tooltip,
  Icon,
} from "@chakra-ui/react";

import { HeaderSubNavigationItems } from "@/lib/HeaderNavigationItems/SubNavigationItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsChevronDown } from "react-icons/bs";

interface HeaderNavigationItemProps extends FlexProps {
  slug: any;
  isParent: boolean;
  parentID: number | null;
  children: React.ReactNode;
}

export const HeaderNavigationItem = ({ slug, isParent, parentID, children }: HeaderNavigationItemProps) => {
  return (
    <>
      {isParent == false ? (
        <Link
          href={`/${slug}`}
          textDecoration="none"
          variant="primary"
          mx="0.7rem"
          fontSize="1.2rem"
          color="white"
          _hover={{ color: "secondary" }}
        >
          {children}
        </Link>
      ) : (
        <>
        <Stack direction="row" gap ="0">
          <Link
            href={`/${slug}`}
            textDecoration="none"
            variant="primary"
            mx="0.3rem"
            fontSize="1.2rem"
            color="white"
            _hover={{ color: "secondary" }}
          >
            {children}
          </Link>
          <Menu>
            <Tooltip label="More Pages">
              <MenuButton as="button" color="white" _hover={{ color: "secondary" }} _active={{ color: "secondary" }}>
                <BsChevronDown />
                {/* <Icon w="1.2rem" h="1.2rem" as={BsChevronDown} /> */}
                  {/* <FontAwesomeIcon icon={['fal', 'chevron-down']} color="currentColor" />  */}
                {/* </Icon> */}
              </MenuButton>
            </Tooltip>
            <MenuList bg="black" border="none">
                {HeaderSubNavigationItems.map( (subLink: any) =>subLink?.parentMenu == parentID && (
                  <MenuItem key={`sub_${parentID}${subLink.slug}`} bg="black" _hover={{background: "blurredBackground", color:"secondary", fontWeight: "900 !important"}}>
                    {subLink.slug.includes("https://") ? (
                      <Link
                        href={subLink.slug}
                        variant="unstyled"
                        isExternal
                        _hover={{border: "none"}}
                      > {subLink.name}</Link>
                    ) : (
                      <Link
                        href={`../../${subLink.slug}`}
                        variant="unstyled"
                        _hover={{border: "none"}}
                      >{subLink.name}</Link>
                    )}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </Stack>
        </>
      )}
    </>
  );
};
