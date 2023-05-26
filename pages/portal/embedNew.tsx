import {
  Stack,
  useToast,
  Box,
  // Link,
  Button,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";

import { Metadata } from "../../components/Metadata";

import PortalLayout from "../../components/Portal/PortalLayout";

import * as React from "react";
import * as Yup from "yup";

import { FormInput } from "../../components/Form/FormInput";
import { FormTextArea } from "../../components/Form/FormTextArea";

export default function NewEmbedPortal() {
  const toast = useToast();

  const onSubmit = async (values: any, actions: any) => {
    const addEmbedData = {
      title: values.title,
      link: values.link,
      embed: values.embed,
      options: values.options,
      note: values.note,
    };
    await addEmbed(addEmbedData);

    actions.setSubmitting(false);
  };

  async function addEmbed(addEmbedData: any) {
    const response = await fetch("/api/links/addNewEmbed", {
      method: "POST",
      body: JSON.stringify(addEmbedData),
    });

    if (response.ok) {
      toast({
        title: "Added New Embed 🎉",
        description: `You've successfully added a new embed!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description:
          "It seems like an error occurred while trying to add a new embed. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const initialValues = {};

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    link: Yup.string().required("Link is required."),
    embed: Yup.string().required("Embed is required."),
  });

  return (
    <>
      <PortalLayout pageTitle="Edit: A New Embed">
        <Metadata
          title={`Add New Embed | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}, embed, portal, new, admin`}
          description={`Add new embed's to Donald Louch`}
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
                    inputID="link"
                    inputLabel="Link"
                    inputType="text"
                  />
                </Stack>

                <FormTextArea
                  inputID="embed"
                  inputLabel="Embed Link"
                  textRows={4}
                />

                <FormTextArea
                  inputID="options"
                  inputLabel="Options"
                  textRows={4}
                />

                <FormTextArea inputID="note" inputLabel="Notes" textRows={4} />

                <SubmitButton variant="blackFormButton">
                  Add New Embed
                </SubmitButton>
              </Stack>
            )}
          </Formik>
        </Box>
      </PortalLayout>
    </>
  );
}
