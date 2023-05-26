import {
  Box,
  Button,
  // Link,
  Stack,
} from "@chakra-ui/react";

import prisma from "../../lib/prisma";

import { Metadata } from "../../components/Metadata";

import PortalLayout from "../../components/Portal/PortalLayout";
import { LinkCardAdmin } from "../../components/Cards/LinkCardAdmin";

export default function LinksPortal({ linkData }: any) {
  const links = linkData;
  return (
    <>
      <PortalLayout pageTitle={`Edit: Links`}>
        <Metadata
          title={`Edit: Links | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" id="editAbout" color="black">
          <Stack
            direction="row"
            spacing={8}
            align="center"
            justify="center"
            p={8}
          >
            <Button as="a" variant="primary" href="linkNew" background="primary" color="white" my="1rem !important">
              Add New Link
            </Button>
            <Button as="a" variant="primary" href="embedNew" background="primary" color="white" my="1rem !important">
              Add New Embed
            </Button>
            <Button as="a" variant="primary" href="pinnedPosts" background="primary" color="white" my="1rem !important">
              Manage Pinned Post
            </Button>
            <Button as="a" variant="primary" href="pagesLinksPrimary" background="primary" color="white" my="1rem !important">
              Edit Primary Links
            </Button>
          </Stack>
          <Stack>
            {links.map((link: any) => (
              <LinkCardAdmin {...link} />
            ))}
          </Stack>
        </Box>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps() {
  const linkData = await prisma.links.findMany({
    orderBy: { orderNumber: "asc" },
  });

  return {
    props: {
      linkData: JSON.parse(JSON.stringify(linkData)),
    },
  };
}
