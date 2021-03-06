import React, { ReactText } from "react";
import {
  useColorModeValue,
  Link,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Tooltip,
  //   IconButton,
  //   Icon,
} from "@chakra-ui/react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../../config/fontAwesome";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { HeaderSubNavigationItems } from "../../config/HeaderNavigationItems/SubNavigationItems";

interface HeaderNavigationItemProps extends FlexProps {
  slug: any;
  isParent: boolean;
  parentID: number | null;
  children: ReactText;
}

export const HeaderNavigationItem = ({
  slug,
  isParent,
  parentID,
  children,
}: HeaderNavigationItemProps) => {
  const blackWhite = useColorModeValue("black", "white");
  return (
    <>
      {isParent == false ? (
        <Link
          href={`../../${slug}`}
          textDecoration="none"
          variant="primary"
          mx="0.7rem"
          fontSize="1.2rem"
          color={blackWhite}
        >
          {children}
        </Link>
      ) : (
        <>
          <Stack direction="row" mx="1rem" alignItems="center">
            <Link
              href={`../../${slug}`}
              textDecoration="none"
              variant="primary"
              fontSize="1.2rem"
              color={blackWhite}
            >
              {children}
            </Link>
            <Menu>
              <Tooltip label="More Pages">
                <MenuButton
                  color={blackWhite}
                  _hover={{ color: "secondary" }}
                  _active={{ color: "secondary" }}
                >
                  <ChevronDownIcon color="currentColor" w="2rem" h="2rem" />
                </MenuButton>
              </Tooltip>
              <MenuList bg="white">
                {HeaderSubNavigationItems.map(
                  (subLink: any) =>
                    subLink?.parentMenu == parentID && (
                      <MenuItem key={subLink.index}>
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
          </Stack>
        </>
      )}
    </>
  );
};
