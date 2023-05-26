import {
  Stack,
  useToast,
  Box,
  useColorModeValue,
  IconButton,
  Divider,
  // Link,
  Button,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";

import prisma from "../../lib/prisma";

import { Metadata } from "../../components/Metadata";

import PortalLayout from "../../components/Portal/PortalLayout";

import * as React from "react";
import * as Yup from "yup";

import { FormInput } from "../../components/Form/FormInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/fontAwesome";

export default function PrimaryLinksPortal({ linkData }: any) {
  const links = linkData;

  const toast = useToast();

  const primeWhite = useColorModeValue("primary", "white");

  const onSubmit = async (values: any, actions: any) => {
    const updateLinksPrimaryData = {
      FacebookSubTitle: values.FacebookSubTitle,
      TwitterSubTitle: values.TwitterSubTitle,
      InstagramSubTitle: values.InstagramSubTitle,
      TikTokSubTitle: values.TikTokSubTitle,
      YouTubeSubTitle: values.YouTubeSubTitle,
      LinkedinSubTitle: values.LinkedinSubTitle,
      GitHubSubTitle: values.GitHubSubTitle,

      FacebookLink: values.FacebookLink,
      TwitterLink: values.TwitterLink,
      InstagramLink: values.InstagramLink,
      TikTokLink: values.TikTokLink,
      YouTubeLink: values.YouTubeLink,
      LinkedinLink: values.LinkedinLink,
      GitHubLink: values.GitHubLink,

      lastUpdatedOn: new Date(),
    };
    await updateLink(updateLinksPrimaryData);

    actions.setSubmitting(false);
  };

  const onSubmitNew = async (values: any, actions: any) => {
    const addLinksPrimaryData = {
      icon: values.icon,
      title: values.title,
      subTitle: values.subTitle,
      link: values.link,
    };
    await addLink(addLinksPrimaryData);

    actions.setSubmitting(false);
  };

  async function addLink(addLinksPrimaryData: any) {
    const response = await fetch("/api/links/addNewPrimaryLink", {
      method: "POST",
      body: JSON.stringify(addLinksPrimaryData),
    });

    if (response.ok) {
      toast({
        title: "Primary Link Added 🎉",
        description: `You've successfully added a new primary link!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description:
          "It seems like an error occurred while trying to add a new primary link. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function updateLink(updateLinksPrimaryData: any) {
    const response = await fetch("/api/links/updatePrimaryLinks", {
      method: "POST",
      body: JSON.stringify(updateLinksPrimaryData),
    });

    if (response.ok) {
      toast({
        title: "Primary Links Updated 🎉",
        description: `You've successfully updated the primary links!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description:
          "It seems like an error occurred while trying to update the primary links. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const initialValues = {
    FacebookSubTitle: links?.[0].subTitle,
    TwitterSubTitle: links?.[1].subTitle,
    InstagramSubTitle: links?.[2].subTitle,
    TikTokSubTitle: links?.[3].subTitle,
    YouTubeSubTitle: links?.[4].subTitle,
    LinkedinSubTitle: links?.[5].subTitle,
    GitHubSubTitle: links?.[6].subTitle,

    FacebookLink: links?.[0].link,
    TwitterLink: links?.[1].link,
    InstagramLink: links?.[2].link,
    TikTokLink: links?.[3].link,
    YouTubeLink: links?.[4].link,
    LinkedinLink: links?.[5].link,
    GitHubLink: links?.[6].link,
  };

  const initialValuesNew = {};

  const validationSchema = Yup.object({});

  const validationSchemaNew = Yup.object({});

  return (
    <>
      <PortalLayout pageTitle={`Edit: Primary Links`}>
        <Metadata
          title={`Edit: Primary Links | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" id="editAbout" color="black">
          <Button as="a" variant="primary" href="pagesLinks" background="primary" color="white" my="1rem !important">
            &larr; Go Back To Links
          </Button>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                {links.map((link: any) => (
                  <>
                    <Stack
                      key={link.index}
                      direction="row"
                      my="2rem"
                      alignItems="center"
                      justify="center"
                      spacing="2rem"
                    >
                      <IconButton
                        aria-label={`Edit ${link.title} Link`}
                        w="2%"
                        variant="unstyled"
                        pt="0.5rem"
                        color={primeWhite}
                        icon={<FontAwesomeIcon icon={["fab", link.icon]} />}
                      />
                      <FormInput
                        inputID={`${link.title}SubTitle`}
                        inputLabel="Account Name"
                        inputType="text"
                      />
                      <FormInput
                        inputID={`${link.title}Link`}
                        inputLabel="Link"
                        inputType="text"
                      />
                    </Stack>
                  </>
                ))}
                <SubmitButton variant="blackFormButton">
                  Update Primary Links
                </SubmitButton>
              </Stack>
            )}
          </Formik>

          <Divider borderColor="primary" m="2rem" />

          <Formik
            initialValues={initialValuesNew}
            onSubmit={onSubmitNew}
            validationSchema={validationSchemaNew}
          >
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                <FormInput
                  inputID="icon"
                  inputLabel="icon Name"
                  inputType="text"
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing="2rem"
                >
                  <FormInput
                    inputID="title"
                    inputLabel="Title"
                    inputType="text"
                  />
                  <FormInput
                    inputID="subTitle"
                    inputLabel="Sub Title"
                    inputType="text"
                  />
                </Stack>

                <FormInput inputID="link" inputLabel="Link" inputType="text" />

                <SubmitButton variant="blackFormButton">
                  Add New Primary Link
                </SubmitButton>
              </Stack>
            )}
          </Formik>
        </Box>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps() {
  const linkData = await prisma.primaryLinks.findMany({});

  return {
    props: {
      linkData: JSON.parse(JSON.stringify(linkData)),
    },
  };
}
