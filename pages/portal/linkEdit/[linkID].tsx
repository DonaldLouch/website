import {
  Stack,
  useToast,
  Box,
  Link,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";

import prisma from "../../../lib/prisma";

import { Metadata } from "../../../components/Metadata";

import PortalLayout from "../../../components/Portal/PortalLayout";

import * as React from "react";
import * as Yup from "yup";

import { FormInput } from "../../../components/Form/FormInput";
import { FormInputReadOnly } from "../../../components/Form/FormInputReadOnly";

export default function EditLinkPortal({ linkData }: any) {
  const link = linkData;

  const toast = useToast();

  const onSubmit = async (values: any, actions: any) => {
    console.log(values);

    const updateLink = {
      id: values.id,
      iconPrefix: values.iconPrefix,
      iconName: values.iconName,
      title: values.title,
      subTitle: values.subTitle,
      link: values.linkForm,
    };

    await updateLinkData(updateLink);

    actions.setSubmitting(false);
  };

  async function updateLinkData(updateLink: any) {
    const response = await fetch("/api/links/updateLink", {
      method: "POST",
      body: JSON.stringify(updateLink),
    });

    if (response.ok) {
      toast({
        title: "Link Updated 🎉",
        description: `You've successfully updated link ID ${link.id}!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description:
          "It seems like an error occurred while trying to update the blog post. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const initialValues = {
    id: link.id,
    iconPrefix: link.iconPrefix,
    iconName: link.iconName,
    title: link.title,
    subTitle: link.subTitle,
    linkForm: link.link,
  };

  const validationSchema = Yup.object({
    id: Yup.string().required("ID is required"),
    iconPrefix: Yup.string().required("Icon Prefix is required"),
    iconName: Yup.string().required("Icon Name is required"),
    title: Yup.string().required("Link Title is required"),
    linkForm: Yup.string().required("The Link is required"),
  });

  return (
    <>
      <PortalLayout pageTitle={`Edit: Link ${link.id}`}>
        <Metadata
          title={`Edit: Link ${link.id} | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}, portal, edit, new, admin`}
          description={`Edit Link ${link.id} for ${link.title}.`}
        />
        <Box as="main" id="editLink" color="black">
          <Link variant="primary" href="../pagesLinks">
            &larr; Go Back To Links
          </Link>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any}>
                <FormInputReadOnly
                  inputID="id"
                  inputLabel=""
                  inputType="hidden"
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing="2rem"
                >
                  <FormInput
                    inputID="iconPrefix"
                    inputLabel="Icon Prefix"
                    inputType="text"
                  />
                  <FormInput
                    inputID="iconName"
                    inputLabel="Icon Name"
                    inputType="text"
                  />
                </Stack>
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

                <FormInput
                  inputID="linkForm"
                  inputLabel="Link"
                  inputType="text"
                />

                <SubmitButton variant="blackFormButton">
                  Update Link {link.id}
                </SubmitButton>
              </Stack>
            )}
          </Formik>
        </Box>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps(router: any) {
  const { linkID } = router.query;

  const linkData = await prisma.links.findUnique({
    where: {
      id: linkID,
    },
  });

  return {
    props: {
      linkData: JSON.parse(JSON.stringify(linkData)),
    },
  };
}
