import {
  Stack,
  useToast,
  Box,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton, SwitchControl } from "formik-chakra-ui";
import { Metadata } from "../../components/Metadata";

import PortalLayout from "../../components/Portal/PortalLayout";

import prisma from '../../lib/prisma'

import * as React from "react";
import * as Yup from "yup";

export default function ManagerPinnedPostsPortal({ postData }: any) {
  const toast = useToast();
  const posts = postData

  const onSubmit = async (values: any, actions: any) => {
    const postArray = new Array() as any

    for (const [key, value] of Object.entries(values)) {
      postArray.push({'postID': key, 'pinned': value})
    }
    console.log(postArray)
    await updatePinnedPosts(postArray);

    actions.setSubmitting(false);
  }

  async function updatePinnedPosts(postArray: any) {
    const response = await fetch("/api/posts/updatePinned", {
      method: "POST",
      body: JSON.stringify(postArray),
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

  const initialValues = {}

  const validationSchema = Yup.object({});

  return (
    <>
      <PortalLayout pageTitle="Manager: Pinned Posts">
        <Metadata
          title={`Manager: Pinned Posts | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}, embed, portal, new, admin`}
          description={`Manage Pinned Posts for Donald Louch`}
        />
        <Box as="main" id="editAbout" color="black">
          <Link variant="primary" href="pagesLinks">
            &larr; Go Back To Links
          </Link>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any}>
                <Stack gap="1rem" m="1rem">
                  {posts.map((post: any) => (
                    <SwitchControl 
                      key={post.id}
                      name={`${post.id}`}
                      label={post.title}
                      p="1.5rem 2rem"
                      color={useColorModeValue('primary', 'white')}
                      boxShadow={useColorModeValue('bsBoldBlue', 'bsBoldWhite')}
                      borderRadius="0 2rem 0 2rem"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      switchProps={{
                        colorScheme: "purple",
                        defaultChecked: post.pinned ? true : false,
                      }}
                      labelProps={{color: useColorModeValue('primary', 'white')}}
                    />
                  ))}
                </Stack> 
                <SubmitButton variant="blackFormButton">Update Pinned Posts</SubmitButton>
              </Stack>
            )}
          </Formik>
        </Box>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps() {
  
  const postData = await prisma.blogPost.findMany({
    orderBy: {
      postedOn: 'desc'
    },
  })
  return { 
      props: { 
          postData: JSON.parse(JSON.stringify(postData)),
      } 
  }
}
