import { IconButton, Link, Tooltip, useColorModeValue } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Key } from "react";
import "../config/fontAwesome";

export const LinkedButton = (buttonLink: {
  id: Key;
  link: string;
  subTitle: string | null | undefined;
  title: string;
  icon: any;
}) => {
  const primeGrey = useColorModeValue("primary", "grey");

  return (
    <Link
      key={buttonLink.id}
      href={buttonLink.link}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Tooltip label={buttonLink.subTitle}>
        <IconButton
          aria-label={`${buttonLink.title} Link`}
          w="100%"
          variant="unstyled"
          p="1rem"
          h="auto"
          fontSize="inherit"
          _hover={{ color: primeGrey }}
          icon={<FontAwesomeIcon icon={["fab", buttonLink.icon]} />}
        />
      </Tooltip>
    </Link>
  );
};
