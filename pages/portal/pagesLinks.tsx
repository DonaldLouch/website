import {
  Box,
  Link,
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
            <Link variant="primary" href="linkNew">
              Add New Link
            </Link>
            <Link variant="primary" href="embedNew">
              Add New Embed
            </Link>
            <Link variant="primary" href="pinnedPosts">
              Manage Pinned Post
            </Link>
            <Link variant="primary" href="pagesLinksPrimary">
              Edit Primary Links
            </Link>
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
