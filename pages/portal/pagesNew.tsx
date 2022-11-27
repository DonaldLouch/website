import {
  Stack,
  HStack,
  useToast,
  Box,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";

import PortalLayout from "../../components/Portal/PortalLayout";
import { Metadata } from "../../components/Metadata";

import * as React from "react";
import * as Yup from "yup";

import { FormInput } from "../../components/Form/FormInput";
import { FormTextArea } from "../../components/Form/FormTextArea";

export default function NewPage() {
  const toast = useToast();

  const onSubmit = async (values: any, actions: any) => {
    let updatePostedOn = new Date();
    if (values.postedOn) {
      updatePostedOn = new Date(values.postedOn);
    }

    const submitBlogPostData = {
      id:
        "page" +
        Date.now().toString(36).toUpperCase() +
        Math.random().toString(36).substring(2, 5).toLowerCase(),
      title: values.title,
      slug: values.slug,
      body: values.body,
      excerpt: values.excerpt,
      tags: values.tags,
      postStatus: "Public",
      postedOn: updatePostedOn,
    };

    await addPost(submitBlogPostData);

    actions.setSubmitting(false);
  };

  async function addPost(submitBlogPostData: any) {
    const response = await fetch("/api/pages/addNewPage", {
      method: "POST",
      body: JSON.stringify(submitBlogPostData),
    });

    if (response.ok) {
      toast({
        title: "Page Created 🎉",
        description: "You've successfully created a page created!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (response.status === 400) {
      toast({
        title: "Error Creating Page",
        description:
          "The slug already exists, please try another slug. Or an internal error occurred, please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const initialValues = {
    // title: 'Test',
    // slug: 'testSlug',
    // blogType: 'Gallery',
    // media: "LINKTOIMAGE;;LINKTOIMAGE;;galleryPic OR singlePic;;IMAGEDESCRIPTION || ",
    // mediaCredit: "LINKTOVIDEO;;VIDEOTITLE;;LINKTOCREATOR;;CREATORNAME;;LINKTOWEBSITE;;NAMEOFWEBSITE",
    // headingText: "TEST TAG LINE",
    // sections: "HEADING#id,HEADING#id,HEADING#id",
    // body: "# Test\n## TEst\n### TESt\n\nTesting!",
    // // thumbnail: "https://res.cloudinary.com/donaldlouch/image/upload/v1643758495/donaldlouch/yadltrwusgtxwz23r6kc.jpg",
    // excerpt: 'Test',
    // category: 'Audio',
    // tags: 'test, test2',
    // sidebar: true
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("This field is required."),
    slug: Yup.string().required("This field is required."),
    // blogType: Yup.string().required('This field is required.'),
    // headingText: Yup.string().required('This field is required.'),
    // body: Yup.string().required('This field is required.'),
    // excerpt: Yup.string().max(300, 'The excerpt must not be more than 300 characters long.').required('This field is required.'),
    // category: Yup.boolean().required('This field is required.'),
    // tags: Yup.string().required('This field is required.'),
    // thumbnail: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').required('This field is required.'),
    // sidebar: Yup.string().required('This field is required.')
  });

  return (
    <>
      <PortalLayout pageTitle="Create New Page">
        <Metadata
          title={`New Page | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}, portal, new, admin`}
          description={`Add a new page to Donald Louch`}
        />
        <Box as="main" id="newPage" color="black">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any}>
                <HStack spacing="2rem">
                  <FormInput
                    inputID="title"
                    inputLabel="Title"
                    inputType="text"
                  />
                  <FormInput
                    inputID="slug"
                    inputLabel="Slug"
                    inputType="text"
                  />
                </HStack>

                <FormTextArea inputID="body" inputLabel="Body" textRows={10} />

                <FormTextArea
                  inputID="excerpt"
                  inputLabel="Excerpt"
                  textRows={4}
                />

                <FormTextArea inputID="tags" inputLabel="Tags" textRows={3} />

                <FormInput
                  inputID="postedOn"
                  inputLabel="Custom Post Date"
                  inputType="datetime-local"
                />
                <SubmitButton variant="blackFormButton">Publish</SubmitButton>
              </Stack>
            )}
          </Formik>
        </Box>
      </PortalLayout>
    </>
  );
}
