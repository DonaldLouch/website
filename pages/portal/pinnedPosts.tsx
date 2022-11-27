import {
  Stack,
  // HStack,
  useToast,
  Box,
  Link,
  useColorModeValue,
  // Button,
  // AspectRatio,
  // Image,
  // Heading,
  // Text,
  // Heading,
  // Text,
  // useColorModeValue,
  // IconButton
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton, SwitchControl } from "formik-chakra-ui";

// import prisma from '../../config/prisma'

import { Metadata } from "../../components/Metadata";

import PortalLayout from "../../components/Portal/PortalLayout";

import prisma from '../../lib/prisma'
// import { SectionTitle } from "../../../components/SectionTitle"

import * as React from "react";
import * as Yup from "yup";
// import { FormInputReadOnly } from "../../components/Form/FormInputReadOnly";

// import { FormInput } from "../../components/Form/FormInput";
// import { FormTextArea } from "../../components/Form/FormTextArea";
// import { FormSwitch } from "../../components/Form/FormSwitch";
// import Pagination from "../../components/Pagination";
// import { FormCheckGroup } from "../../components/Form/FormCheckGroup";
// import { FormInputReadOnly } from '../../components/Form/FormInputReadOnly'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../../config/fontAwesome'

export default function ManagerPinnedPostsPortal({ postData }: any) {
  const toast = useToast();
  const posts = postData

  // const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  // const primeWhite = useColorModeValue('primary', 'white')

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

  // const boxShadow = useColorModeValue("bsBoldOrange", "bsBoldWhite")
  // const boxBigShadow = useColorModeValue("bsBigBoldBlue", "bsBigBoldWhite")
  // const whiteBlack = useColorModeValue('white', 'black')
  // const blackWhite = useColorModeValue('black', 'white')


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
  // const page = router.query.pg as number
  // let currentPage = page - 1 as number || 0

  // const postLimit = 10 as number
  
  // // console.log(currentPage)
  // const postLength = await prisma.blogPost.count() as number
  // let numberOfPages = postLength / postLimit as number


  // if (!Number.isInteger(numberOfPages)) {
  //   numberOfPages = Math.floor(numberOfPages) + 1
  // }

  // if (numberOfPages < page) {
  //   currentPage = numberOfPages
  // }
  // // if (currentPage > numberOfPages) {
  // //   // currentPage = 0
  // // }

  // const pagination = new Array
  // pagination.push(numberOfPages, currentPage)

  const postData = await prisma.blogPost.findMany({
    orderBy: {
      postedOn: 'desc'
    },
    // skip: currentPage * postLimit,
    // take: postLimit,
  })
  return { 
      props: { 
          postData: JSON.parse(JSON.stringify(postData)),
          // pagination
      } 
  }
}
