import React from "react";

import {
  Box,
} from "@chakra-ui/react";

import { Metadata } from "../components/Metadata";
import Hire from "../components/Hire";
import useSWR from "swr";

export default function Jobs() {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBJ0QWcyw" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return (
    <>
      <Metadata
        title={`Request Freelance Job From Donald Louch`}
        keywords={`${process.env.KEYWORDS}`}
        description={`${process.env.DESCRIPTION}`}
      />
      <Box as="main" color="black">
        <Box>
          <Hire />
        </Box>
      </Box>
    </>
  );
}
