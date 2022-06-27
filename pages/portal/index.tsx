import { Box, Heading, Stack, Link, Divider } from "@chakra-ui/react";

// import { PortalStats } from '../../components/Cards/PortalStats'
import { StatsCard } from "../../components/Cards/StatsCard";

import PortalLayout from "../../components/Portal/PortalLayout";
import { Metadata } from "../../components/Metadata";

import prisma from "../../config/prisma";

type StatProps = {
  numberOfPosts: number;
  numberOfPages: number;
  postViews: number;
  pageViews: number;
};

export default function PortalHome({
  numberOfPosts,
  numberOfPages,
  postViews,
  pageViews,
}: StatProps) {
  const portalStats = [
    {
      label: "Number of Posts",
      value: `${numberOfPosts} Posts`,
    },
    {
      label: "Number of Pages",
      value: `${numberOfPages}+ Pages`,
    },
    {
      label: "Total of Post Views",
      value: `${postViews} Views`,
    },
    {
      label: "Total of Page Views",
      value: `${pageViews} Views`,
    },
  ];
  console.log(postViews);
  return (
    <>
      <PortalLayout pageTitle="Portal Home">
        <Metadata
          title={`Donald Louch Portal`}
          keywords={`${process.env.KEYWORDS}, portal`}
          description={`The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!`}
        />
        <Box as="main" id="homeWrapper" color="white">
          <Heading as="h3" variant="sectionTitle" size="2xl">
            Quick Actions
          </Heading>
          <Divider />
          <Stack
            direction="row"
            spacing={8}
            align="center"
            justify="center"
            p={8}
            color="black"
          >
            <Link variant="primary" href="portal/blog">
              Manage Posts
            </Link>
            <Link variant="primary" href="portal/media">
              Manage Media
            </Link>
            <Link variant="primary" href="portal/pages">
              Manage Pages
            </Link>
          </Stack>
          <Divider />
          <Box>
            <Heading as="h2" variant="sectionTitle" size="2xl">
              Current Status
            </Heading>
            <Stack
              direction="row"
              spacing={8}
              align="center"
              justify="center"
              p={8}
              color="black"
            >
              {portalStats?.map((media: any) => (
                <>
                  <StatsCard
                    startsTitle={media.label}
                    startsDescription={media.value}
                  />
                </>
              ))}
            </Stack>
          </Box>
        </Box>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps() {
  const numberOfPosts = (await prisma.blogPost.count({})) as number;
  const numberOfPages = (await prisma.page.count({})) as number;

  const postViews = await prisma.blogPost.aggregate({ _sum: { views: true } });
  const pageViews = await prisma.page.aggregate({ _sum: { views: true } });

  return {
    props: {
      // postViews: JSON.parse(JSON.stringify(postViews)),
      numberOfPosts,
      numberOfPages,
      postViews: postViews._sum.views,
      pageViews: pageViews._sum.views,
    },
  };
}
