import React from "react";

import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Heading,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";

import prisma from "../lib/prisma";

import { Metadata } from "../components/Metadata";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { SectionCard } from "../components/Cards/SectionCard";
import { LinkCard } from "../components/Cards/LinkCard";
import { SectionTitle } from "../components/SectionTitle";
import { LinkedButton } from "../components/LinkedButton";

import Contact from "../components/Contact";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../lib/fontAwesome";
import useSWR from "swr";
import PinnedPostsCard from "../components/Cards/PinnedPostsCard";

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
  postData
}: any) {
  const about = aboutData?.[0];

  const links = linkData;
  const primaryLinks = primaryLinkData;
  const embeds = embedData;
  const posts = postData;

  const components = {
    p: paragraph,
  };

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBFE8Gz45" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return (
    <>
      <Metadata
        title={`About ${about.firstName} ${about.lastName}`}
        keywords={`${process.env.KEYWORDS}, ${about.firstName} ${about.lastName}, ${about.firstName}, ${about.lastName}, ${about.middleName}, about me, ${about.firstName} ${about.middleName} ${about.lastName}, canada, Canadian, photographer, videographer, web developer, devop`}
        description={`${about.bioExcerpt}`}
      />

      <Box
        position="absolute"
        top={{ base: "1.4%", md: "1%" }}
        left={{ base: "4%", md: "1%" }}
        zIndex="overlay"
        color={useColorModeValue("primary", "white")}
      >
        <Link href="../" variant="unstyled" _hover={{ textDecoration: "none" }}>
          <Tooltip label="Go Back Home">
            <IconButton
              aria-label="Go Back Home"
              variant="unstyled"
              _hover={{ color: "secondary" }}
              h="auto"
              icon={<FontAwesomeIcon icon={["fal", "house"]} />}
            />
          </Tooltip>
        </Link>
      </Box>
      <Box
        as="section"
        color={useColorModeValue("black", "white")}
        padding={{ base: "0.5rem", md: "2rem 5rem" }}
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
          justifyContent={{ base: "flex-start", xl: "center" }}
          m="1.5rem"
          fontSize="2rem"
          color={useColorModeValue("black", "white")}
          gap="2rem"
          alignItems="center"
          overflowX="scroll"
          overflowY="hidden"
          whiteSpace="nowrap"
        >
          {primaryLinks.map((buttonLink: any) => (
            <LinkedButton {...buttonLink} />
          ))}
          <Link href="#contact" variant="primary" pt="0.5rem">
            Contact Me
          </Link>
          <Link href={`mailto:${about.email}`} variant="primary" pt="0.5rem">
            Direct Email Me
          </Link>
        </Stack>

        <Tabs
          p="1rem"
          borderRadius="0 2rem"
          isFitted
        >
          <TabList display="flex" justifyContent="center">
            <Tab>All</Tab>
            <Tab>Posts</Tab>
            <Tab>Links</Tab>
            <Tab>Embed Content</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box my="2rem">
                {posts.map((post: any) => ( 
                  <PinnedPostsCard {...post} />
                ))}
              </Box>
              {embeds.map((embed: any) => (
                <AspectRatio
                  key={embed.id}
                  ratio={16 / 9}
                  w="95%"
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
              ))}
            </TabPanel>
            <TabPanel>        
              <Box my="2rem">
                {posts.map((post: any) => (  
                  <PinnedPostsCard {...post} />
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              {links.map((link: any) => (
                <LinkCard {...link} />
              ))}
            </TabPanel>
            <TabPanel>
              {embeds.map((embed: any) => (
                  <AspectRatio
                    key={embed.id}
                    ratio={16 / 9}
                    w="95%"
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
        <Contact />
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

  const postData = await prisma.blogPost.findMany({
    where: { pinned: true },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      postedOn: true,
    },
    orderBy: { postedOn: "desc" },
  })

  const source = aboutData?.[0].bio as any;

  const mdxSource = await serialize(source);

  return {
    props: {
      aboutData: JSON.parse(JSON.stringify(aboutData)),
      linkData: JSON.parse(JSON.stringify(linkData)),
      primaryLinkData: JSON.parse(JSON.stringify(primaryLinkData)),
      embedData: JSON.parse(JSON.stringify(embedData)),
      postData: JSON.parse(JSON.stringify(postData)),
      source: mdxSource,
    },
  };
}
