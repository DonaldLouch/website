import React from "react";

import {
  AspectRatio,
  Box,
  Image,
  Text,
  Heading,
  Grid,
  Link,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import { Metadata } from "../components/Metadata";

import prisma from "../lib/prisma";

import { SectionCard } from "../components/Cards/SectionCard";
import { SectionTitle } from "../components/SectionTitle";
import HeroPage from "../components/HeroPage";

import Pagination from "../components/Pagination";
import useSWR from "swr";

import { ChevronDownIcon } from "@chakra-ui/icons";
import PinnedPostsCard from "../components/Cards/PinnedPostsCard";

export default function Blog({ postData, pagination }: any) {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBIE8D9of" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  const posts = postData;

  const boxShadow = useColorModeValue("bsBoldOrange", "bsBoldWhite");
  const boxBigShadow = useColorModeValue("bsBigBoldBlue", "bsBigBoldWhite");
  const whiteBlack = useColorModeValue("white", "black");
  const blackWhite = useColorModeValue("black", "white");

  const pageLinks = [
    {
      linkTitle: "Photography",
      linkUrl: "/C/photography",
    },
    {
      linkTitle: "Videography",
      linkUrl: "/C/videography",
    },
    {
      linkTitle: "Audio",
      linkUrl: "/C/audio",
    },
    {
      linkTitle: "Graphic Design",
      linkUrl: "/C/design",
    },
    {
      linkTitle: "General",
      linkUrl: "/C/general",
    },
    {
      linkTitle: "Education",
      linkUrl: "/C/education",
    },
  ];

  return (
    <>
      <Metadata
        title={`${process.env.WEBSITE_NAME} Blog Post's`}
        keywords={`${process.env.KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`}
        description={`${process.env.DESCRIPTION}`}
      />

      <HeroPage
        name="Donald Louch"
        tagLine="and, I'm a Web Developer and Digital Content Creator"
        links={pageLinks}
        cta={["About Me", "about"]}
        imageLink="https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
      />
      <Tooltip label="View Blog Posts">
        <Box
          position="absolute"
          top="93vh"
          left="50vw"
          zIndex="overlay"
          color="white"
          fontSize="1.5rem"
          _hover={{ color: "secondary" }}
        >
          <Link href="#posts">
            <ChevronDownIcon color="currentColor" w="4rem" h="4rem" />
          </Link>
        </Box>
      </Tooltip>

      <Box as="main" color={useColorModeValue("black", "white")} mt="93vh">
      {/* <Box as="main" color={useColorModeValue("black", "white")}> */}
        <SectionCard id="posts" styleType="primaryCard">
          <SectionTitle headingTitle="Blog Posts" />
          {posts.map((post: any) => (
            <Box key={post.id} mt="2rem">
              {post.pinned && (
                <PinnedPostsCard {...post} />
              )}
            </Box>
          ))}
          <Grid
            templateColumns={{ base: "100%", md: "50% 50%", lg: "33% 33% 33%" }}
            gap={{ base: 0, md: "1rem", xl: "2rem" }}
            mt="3rem"
            pr={{ base: "initial", lg: "3rem" }}
            w="100%"
          >
            {posts?.map((post: any) => (
              <Box
                key={post.id}
                id={post.id}
                as="article"
                filter="opacity(98%)"
                p="2rem"
                borderRadius="0 3rem"
                w="100%"
                mb="2rem"
                bg={whiteBlack}
                boxShadow={boxShadow}
                _hover={{ boxShadow: boxBigShadow }}
                color={blackWhite}
              >
                <Link
                  href={`/post/${post.slug}`}
                  variant="unstyled"
                  _hover={{ textDecoration: "none" }}
                >
                  <AspectRatio
                    ratio={16 / 9}
                    w="calc(100% + 4rem) "
                    m="-2rem"
                    mb="1rem"
                    overflow="hidden"
                    bg="mainGradient"
                    borderRadius="0 3rem 0 0"
                  >
                    <Image src={post.thumbnail} alt={post.title} />
                  </AspectRatio>
                  <Heading
                    as="h2"
                    size="md"
                    fontWeight="bold"
                    mt="2rem"
                    textTransform="uppercase"
                    color="primary"
                  >
                    {post?.categories.split(",").length >= 1
                      ? post.categories.replace(",", ", ")
                      : post.categories}
                  </Heading>
                  <Heading as="h2" size="3xl" fontWeight="bold" mb="1.5rem">
                    {post.title}
                  </Heading>
                  <Text>{post.excerpt}</Text>
                </Link>
              </Box>
            ))}
          </Grid>
            <Pagination {...pagination} />
        </SectionCard>
      </Box>
    </>
  );
}

export async function getServerSideProps(router: any) {
  const page = router.query.pg as number;
  let currentPage = ((page - 1) as number) || 0;

  const postLimit = 12 as number;
  // const postLimit = 6 as number;

  const postLength = (await prisma.blogPost.count({
    where: {
      postStatus: "Public",
    },
  })) as number;
  let numberOfPages = (postLength / postLimit) as number;

  if (!Number.isInteger(numberOfPages)) {
    numberOfPages = Math.floor(numberOfPages) + 1;
  }

  if (numberOfPages < page) {
    currentPage = numberOfPages;
  }

  const pagination = new Array();
  pagination.push(numberOfPages, currentPage);

  const postData = await prisma.blogPost.findMany({
    where: {
      postStatus: "Public",
    },
    orderBy: {
      postedOn: "desc",
    },
    skip: currentPage * postLimit,
    take: postLimit,
  });

  return {
    props: {
      postData: JSON.parse(JSON.stringify(postData)),
      pagination,
    },
  };
}
