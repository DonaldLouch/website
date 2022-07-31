import { Box, IconButton, Link, Tooltip } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../config/fontAwesome";

interface FooterProps {
  linkURL: string;
  socialMedia: string;
  linkIcon: any;
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, linkIcon } = props;

  return (
    <Box>
      <Link
        href={linkURL}
        isExternal
        variant="unstyled"
        // colorScheme="white"
        _hover={{ color: "tertiary", border: "none" }}
        px="0.2rem"
      >
        <Tooltip label={socialMedia}>
          <IconButton
            aria-label={`${socialMedia} Link`}
            variant="unstyled"
            h="auto"
            fontSize="inherit"
            //   _hover={{ color: primeGrey }}
            icon={<FontAwesomeIcon icon={["fab", linkIcon]} />}
          />
        </Tooltip>
      </Link>
    </Box>
    // <IconButton
    //     aria-label={socialMedia}
    //     variant="unstyled"
    //     h="auto"
    //     fontSize="inherit"
    //     as="a"
    //     href={linkURL}

    //     p="0.5rem"
    //     variant="outline"
    //     rounded="full"
    //     colorScheme="white"
    //     _hover={{ bg: "white", color: "tertiary", border: "none" }}>
    //         <FontAwesomeIcon icon={['fab', linkIcon]} />
    // </IconButton>
  );
};
