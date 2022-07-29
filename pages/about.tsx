import React from "react";

import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Heading,
  Link,
  IconButton,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
  Icon,
} from "@chakra-ui/react";

import prisma from "../config/prisma";

import { Metadata } from "../components/Metadata";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { SectionCard } from "../components/Cards/SectionCard";
import { LinkCard } from "../components/Cards/LinkCard";
import { SectionTitle } from "../components/SectionTitle";

import Contact from "../components/Contact";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../config/fontAwesome";
import useSWR from "swr";

const FaHome = () => <FontAwesomeIcon icon={["fas", "house"]} />;

const paragraph = (props: any) => (
  <Text fontSize="1.1rem" lineHeight="1.4rem">
    {props.children}
  </Text>
);

export default function AboutMe({
  source,
  aboutData,
  linkData,
  primaryLinkData,
  embedData,
}: any) {
  const about = aboutData?.[0];

  const links = linkData;
  const primaryLinks = primaryLinkData;
  const embeds = embedData;

  const primeGrey = useColorModeValue("primary", "grey");
  // const primeWhite = useColorModeValue("primary", "white");

  const components = {
    p: paragraph,
  };

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBFE8Gz45" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  // const pageID = "pageL4UBFE8Gz45" as string
  // updatePostView(pageID)
  // async function updatePostView(pageID: string) {
  //     await fetch('/api/pages/updateView', {
  //         method: 'POST',
  //         body: JSON.stringify(pageID)
  //     })
  // }

  return (
    <>
      <Metadata
        title={`About ${about.firstName} ${about.lastName}`}
        keywords={`${process.env.KEYWORDS}, ${about.firstName} ${about.lastName}, ${about.firstName}, ${about.lastName}, ${about.middleName}, about me, ${about.firstName} ${about.middleName} ${about.lastName}, canada, Canadian, photographer, videographer, web developer, devop`}
        description={`${about.bioExcerpt}`}
      />

      <Box
        position="absolute"
        top="2%"
        left="2%"
        zIndex="overlay"
        color={useColorModeValue("primary", "white")}
        fontSize="1.5rem"
      >
        <Link href="../">
          <Icon as={FaHome} width="100%" color="currentColor" />
        </Link>
      </Box>
      <Box
        as="section"
        color={useColorModeValue("black", "white")}
        padding={{ base: "0.5rem", md: "5rem" }}
        position="absolute"
        top="0"
        left="0"
        zIndex="dropdown"
        background={useColorModeValue("white", "black")}
        width="100%"
        maxW="100%"
      >
        <SectionCard id="aboutMe" styleType="primaryCard">
          <Box id="bio">
            <Box
              display="grid"
              gridTemplateColumns={{ base: "100%", md: "25% 75%" }}
              gap="2rem"
              alignItems="center"
            >
              <Image
                src={about.avatar}
                alt={`${about.firstName} ${about.lastName}`}
                w={{ base: "50%", md: "100%" }}
                m="0 auto"
              />
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "3rem", md: "5rem" }}
                  textDecoration="underline"
                  textDecorationColor={useColorModeValue("primary", "white")}
                >
                  {about.firstName} {about.middleName} {about.lastName}
                </Heading>
                <Text fontSize="2rem" m="0.5rem 0">
                  {about.pronouns}
                </Text>
              </Box>
            </Box>
            {/* <Text>A {about.currentAge}-year-old, {about.tagLine} from {about.city}, {about.province}, {about.country}</Text> */}
            <Heading
              as="h3"
              size="3xl"
              fontFamily="body"
              fontWeight="300"
              mt="0.5rem"
            >
              {about.tagLine}
            </Heading>
            <MDXRemote {...source} components={components} />
          </Box>
        </SectionCard>

        <SectionTitle headingTitle="Links" />

        <Stack
          id="links"
          direction="row"
          justify={{ base: "start", md: "center" }}
          m="1.5rem"
          fontSize="2rem"
          color={useColorModeValue("black", "white")}
          gap="2rem"
          alignItems="center"
          overflowX="scroll"
          overflowY="hidden"
          whiteSpace="nowrap"
        >
          {primaryLinks.map((pLink: any) => (
            <Link
              key={pLink.id}
              href={pLink.link}
              isExternal
              variant="unstyled"
              _hover={{ textDecoration: "none" }}
            >
              <Tooltip label={pLink.subTitle} aria-label={pLink.subTitle}>
                <IconButton
                  aria-label={`${pLink.title} Link`}
                  w="100%"
                  variant="unstyled"
                  p="1rem"
                  h="auto"
                  fontSize="inherit"
                  _hover={{ color: primeGrey }}
                  icon={<FontAwesomeIcon icon={["fab", pLink.icon]} />}
                />
              </Tooltip>
            </Link>
          ))}
          <Link href="#contact" variant="primary" pt="0.5rem">
            Contact Me
          </Link>
          <Link href={`mailto:${about.email}`} variant="primary" pt="0.5rem">
            Direct Email Me
          </Link>
        </Stack>
        {/* </Box> */}

        <Tabs
          variant="soft-rounded"
          colorScheme="purple"
          my="1rem"
          boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
          p="2rem 0"
          borderRadius="0 2rem"
        >
          <TabList display="flex" justifyContent="center">
            <Tab>All</Tab>
            <Tab>Links</Tab>
            <Tab>Embed Content</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {embeds.map((embed: any) => (
                <AspectRatio
                  key={embed.id}
                  ratio={16 / 9}
                  // w={{base: "calc(100% - -6rem);", xl: "95%"}}
                  w="95%"
                  // m={{ base: "0 -4rem", xl: "0"}}
                  m="1rem auto"
                  overflow="hidden"
                  zIndex="10000"
                  bg="mainGradient"
                  borderRadius="0 2rem"
                >
                  <iframe src={`${embed.embedLink}`} allowFullScreen></iframe>
                </AspectRatio>
              ))}
              {links.map((link: any) => (
                <LinkCard {...link} />
                // <Link
                //   key={link.id}
                //   href={link.link}
                //   isExternal
                //   variant="unstyled"
                //   _hover={{ textDecoration: "none" }}
                // >
                //   <Flex
                //     // templateColumns={{
                //     //   base: "20% 80%",
                //     //   md: "10% 90%",
                //     //   lg: "5% 95%",
                //     // }}
                //     color={primeWhite}
                //     boxShadow="bsBlue"
                //     my="0.8rem"
                //     p="1.2rem 2rem"
                //     borderRadius="0 2rem"
                //     whiteSpace="nowrap"
                //     overflowX="scroll"
                //     alignItems="center"
                //     justifyContent="start"
                //     // letterSpacing=".005rem"
                //     // fontWeight="900"
                //     // fontSize={{ base: "5vw", md: "2rem", lg: "2vw" }}
                //     gap="1.3rem"
                //     _hover={{
                //       boxShadow: "none",
                //       bg: "backgroundGradient",
                //       color: "white",
                //     }}
                //   >
                //     <IconButton
                //       aria-label={`${link.title} Link`}
                //       w="1.8rem"
                //       h="auto"
                //       variant="unstyled"
                //       // p="910em"
                //       fontSize="inherit"
                //       // display="flex"
                //       // alignContent="center"
                //       // justifyContent="center"
                //       // pt="0.5rem"
                //       // padding="0.5rem"
                //       // borderRadius="0 1em"
                //       // color={primeWhite}
                //       // _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
                //       icon={
                //         <FontAwesomeIcon
                //           icon={[link.iconPrefix, link.iconName]}
                //         />
                //       }
                //     />
                //     <Stack>
                //       <Text
                //         m="0"
                //         fontWeight="700"
                //         fontSize={{ base: "2rem", xl: "1.8rem" }}
                //       >
                //         {link.title}
                //       </Text>
                //       <Text
                //         fontSize="0.8rem"
                //         fontWeight="300"
                //         wordBreak="break-word"
                //         color="grey"
                //       >
                //         {link.subTitle}
                //       </Text>
                //     </Stack>
                //   </Flex>
                // </Link>
              ))}
            </TabPanel>
            <TabPanel>
              {links.map((link: any) => (
                <LinkCard {...link} />
                // <Link
                //   key={link.id}
                //   href={link.link}
                //   isExternal
                //   variant="unstyled"
                //   _hover={{ textDecoration: "none" }}
                // >
                //   <Grid
                //     templateColumns={{
                //       base: "20% 80%",
                //       md: "10% 90%",
                //       lg: "5% 95%",
                //     }}
                //     color="primary"
                //     boxShadow="bsBlue"
                //     my="0.8rem"
                //     p="1.2rem"
                //     borderRadius="0 2rem"
                //     overflowX="scroll"
                //     alignItems="center"
                //     justifyContent="start"
                //     letterSpacing=".005rem"
                //     fontWeight="900"
                //     fontSize={{ base: "5vw", md: "2rem", lg: "2vw" }}
                //     columnGap="0.5rem"
                //     _hover={{
                //       boxShadow: "none",
                //       bg: "backgroundGradient",
                //       color: "white",
                //     }}
                //   >
                //     <IconButton
                //       aria-label={`${link.title} Link`}
                //       w="100%"
                //       variant="unstyled"
                //       p="1rem"
                //       fontSize="inherit"
                //       // pt="0.5rem"
                //       // padding="0.5rem"
                //       // borderRadius="0 1em"
                //       color={primeWhite}
                //       // _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
                //       icon={
                //         <FontAwesomeIcon
                //           icon={[link.iconPrefix, link.iconName]}
                //         />
                //       }
                //     />
                //     <Stack>
                //       <Text m="0" fontWeight="700">
                //         {link.title}
                //       </Text>
                //       <Text
                //         fontSize="0.8rem"
                //         fontWeight="300"
                //         wordBreak="break-word"
                //         color="grey"
                //       >
                //         {link.subTitle}
                //       </Text>
                //     </Stack>
                //   </Grid>
                // </Link>
              ))}
            </TabPanel>
            <TabPanel>
              {embeds.map((embed: any) => (
                <AspectRatio
                  key={embed.id}
                  ratio={16 / 9}
                  // w={{base: "calc(100% - -6rem);", xl: "95%"}}
                  w="95%"
                  // m={{ base: "0 -4rem", xl: "0"}}
                  m="1rem auto"
                  overflow="hidden"
                  zIndex="10000"
                  bg="mainGradient"
                  borderRadius="0 2rem"
                >
                  <iframe src={`${embed.embedLink}`} allowFullScreen></iframe>
                </AspectRatio>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Box id="contact" mt="2rem" mb="2rem" p="2rem" borderRadius="0 2rem" boxShadow="bsBoldWhite"> */}
        {/* <SectionTitle headingTitle="Contact Me" /> */}
        <Contact />
        {/* <Text textAlign="center">🚧 Section Is Currently Under Construction 🚧</Text> */}
        {/* </Box> */}
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const aboutData = await prisma.about.findMany({});

  const linkData = await prisma.links.findMany({
    orderBy: { orderNumber: "asc" },
  });

  const primaryLinkData = await prisma.primaryLinks.findMany({
    orderBy: { orderNumber: "asc" },
  });

  const embedData = await prisma.embed.findMany({
    orderBy: { orderNumber: "asc" },
  });

  const source = aboutData?.[0].bio as any;

  const mdxSource = await serialize(source);

  return {
    props: {
      aboutData: JSON.parse(JSON.stringify(aboutData)),
      linkData: JSON.parse(JSON.stringify(linkData)),
      primaryLinkData: JSON.parse(JSON.stringify(primaryLinkData)),
      embedData: JSON.parse(JSON.stringify(embedData)),
      source: mdxSource,
    },
  };
}
