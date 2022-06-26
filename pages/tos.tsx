import React from "react";

import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import { Metadata } from "../components/Metadata";

import { SectionCard } from "../components/Cards/SectionCard";
import { SectionTitle } from "../components/SectionTitle";

export default function TOS() {
  // const pageID = "pageL4UBK5TVb2y" as string
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
        title={`${process.env.WEBSITE_NAME} | Terms of Service`}
        keywords={`${process.env.KEYWORDS}`}
        description={`${process.env.DESCRIPTION}`}
      />
      <Box as="main" color={useColorModeValue("black", "white")}>
        <SectionCard id="signup" styleType="primaryCard">
          <Box>
            <SectionTitle headingTitle="Terms of Service" />
            <Text textAlign="center">
              🚧 This page is currently under construction, please check back at
              a later time! 🚧
            </Text>
          </Box>
        </SectionCard>
      </Box>
    </>
  );
}
