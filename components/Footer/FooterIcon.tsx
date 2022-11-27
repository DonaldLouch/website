import { Box, IconButton, Link, Tooltip } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/fontAwesome";

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
        _hover={{ color: "tertiary", border: "none" }}
        px="0.2rem"
      >
        <Tooltip label={socialMedia}>
          <IconButton
            aria-label={`${socialMedia} Link`}
            variant="unstyled"
            h="auto"
            fontSize="inherit"
            icon={<FontAwesomeIcon icon={["fab", linkIcon]} />}
          />
        </Tooltip>
      </Link>
    </Box>
  );
};
