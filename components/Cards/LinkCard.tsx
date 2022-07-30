import {
  Text,
  Link,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Key } from "react";
import "../../config/fontAwesome";

// TODO: Fix type safety for iconPrefix and iconName

export const LinkCard = (link: {
  id: Key;
  link: string;
  title: string;
  iconPrefix: any;
  iconName: any;
  subTitle: string | null | undefined;
}) => {
  const primeWhite = useColorModeValue("primary", "white");

  return (
    <Link
      key={link.id}
      href={link.link}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        color={primeWhite}
        boxShadow="bsBlue"
        my="0.8rem"
        p="1.2rem 2rem"
        borderRadius="0 2rem"
        whiteSpace="nowrap"
        overflowX="scroll"
        alignItems="center"
        justifyContent="start"
        gap="1.3rem"
        _hover={{
          boxShadow: "none",
          bg: "backgroundGradient",
          color: "white",
        }}
      >
        <IconButton
          aria-label={`${link.title} Link`}
          // w="1.8rem"
          // h="auto"
          variant="unstyled"
          // fontSize="inherit"
          icon={<FontAwesomeIcon icon={[link.iconPrefix, link.iconName]} />}
        />
        <Stack>
          <Text
            m="0"
            fontWeight="300"
            fontSize={{ base: "2rem", xl: "1.8rem" }}
            lineHeight="0.6"
          >
            {link.title}
          </Text>
          <Text
            fontSize="0.8rem"
            fontWeight="300"
            wordBreak="break-word"
            color="grey"
          >
            {link.subTitle}
          </Text>
        </Stack>
      </Flex>
    </Link>
  );
};
