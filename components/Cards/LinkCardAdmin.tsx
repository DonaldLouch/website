import {
  Text,
  Link,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Key } from "react";
import "../../lib/fontAwesome";

// TODO: Fix type safety for iconPrefix and iconName

export const LinkCardAdmin = (link: {
  id: Key;
  link: string;
  title: string;
  iconPrefix: any;
  iconName: any;
  subTitle: string | null | undefined;
}) => {
  const toast = useToast();
  const router = useRouter();
  const primeWhite = useColorModeValue("primary", "white");

  async function deleteLink() {
    console.log(`Deleting link: ${link.id}`);
    const id = link.id;

    const response = await fetch(`/api/links/deleteLink/${id}`, {
      method: "post",
    });
    if (response.ok) {
      toast({
        title: "Link deleted successfully 🎉",
        description: `You have successfully deleted ${link.title}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.reload();
    } else {
      toast({
        title: "An error occurred while deleting the media",
        description: `Please try again or contact support if the problem persists.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex gap="1.3rem" key={link.id}>
      <Link
        href={`linkEdit/${link.id}`}
        variant="unstyled"
        _hover={{ textDecoration: "none" }}
        flex="auto"
      >
        <Tooltip label={link.link}>
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
              h="auto"
              variant="unstyled"
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
        </Tooltip>
      </Link>
      <IconButton
        aria-label={`${link.title} Link`}
        h="auto"
        variant="unstyled"
        color="red.500"
        size="sm"
        onClick={deleteLink}
        icon={<FontAwesomeIcon icon={["fas", "trash"]} />}
      />
    </Flex>
  );
};
