import {
  Text,
  Link,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
  // useColorModeValue
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
        // templateColumns={{
        //   base: "20% 80%",
        //   md: "10% 90%",
        //   lg: "5% 95%",
        // }}
        color={primeWhite}
        boxShadow="bsBlue"
        my="0.8rem"
        p="1.2rem 2rem"
        borderRadius="0 2rem"
        whiteSpace="nowrap"
        overflowX="scroll"
        alignItems="center"
        justifyContent="start"
        // letterSpacing=".005rem"
        // fontWeight="900"
        // fontSize={{ base: "5vw", md: "2rem", lg: "2vw" }}
        gap="1.3rem"
        _hover={{
          boxShadow: "none",
          bg: "backgroundGradient",
          color: "white",
        }}
      >
        <IconButton
          aria-label={`${link.title} Link`}
          w="1.8rem"
          h="auto"
          variant="unstyled"
          // p="910em"
          fontSize="inherit"
          // display="flex"
          // alignContent="center"
          // justifyContent="center"
          // pt="0.5rem"
          // padding="0.5rem"
          // borderRadius="0 1em"
          // color={primeWhite}
          // _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
          icon={<FontAwesomeIcon icon={[link.iconPrefix, link.iconName]} />}
        />
        <Stack>
          <Text
            m="0"
            fontWeight="700"
            fontSize={{ base: "2rem", xl: "1.8rem" }}
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
