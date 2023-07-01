import {
  Text,
  Link,
  Flex,
  IconButton,
  Stack,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface LinkButtonProps {
  id: string
  link: string|null
  title: string
  iconPrefix: any
  iconName: any
  subTitle: string | null | undefined
}

export const LinkButton = (link: LinkButtonProps) => {
  return (
    <Link
      key={link.id}
      href={link.link ? link.link : "#"}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        color="white"
        boxShadow="bsBoldOrange"
        my="1.5rem"
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
          w="auto"
          fontSize="3xl"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={[link.iconPrefix, link.iconName]} />}
        />
        <Stack>
          <Text
            m="0"
            fontWeight={{ base: "300", md: "600" }}
            fontSize={{ base: "2rem", md: "1.5rem" }}
            lineHeight="0.9"
          >
            {link.title}
          </Text>
          <Text
            fontSize="1rem"
            fontWeight="400"
            wordBreak="break-word"
            color="grey"
          >
            {link.subTitle}
          </Text>
        </Stack>
      </Flex>
    </Link>
  )
}
