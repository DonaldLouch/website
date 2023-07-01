'use client'

import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
// import supabase from "@/lib/supabase";
import {
  Stack,
  useToast,
} from "@chakra-ui/react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { SwitchControl } from "formik-chakra-ui";
// import { useRouter } from "next/navigation";

import * as Yup from 'yup'

// TODO: Fix type safety for iconPrefix and iconName

export const PinnedPostsManager = (props: any) => {
  const post = props
  // const toast = useToast();
  // const toastID = "toastID"

  const onSubmit =  async () => {
  // const onSubmit =  async (values: any, actions: any) => {
  //   const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").update({ 
  //       link: values.link,
  //       subTitle: values.subTitle,
  //       lastUpdatedOn: new Date()
  //   }).match({ id: values.id })
  //   // await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
  //   supabaseStatus && !toast.isActive(toastID) &&
  //       toast({
  //           id: toastID,
  //           title: `${supabaseStatus === 204 ? "Updated Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
  //           description: `${supabaseStatus === 204 ? `You have successfully updated the ${link.title} link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
  //           status: `${supabaseStatus === 204 ? "success" : "error"}`,
  //           duration: 9000,
  //           isClosable: true,
  //       })
  //       actions.setSubmitting()
  }
  const initialValues = {
    id: post.id,
    // link: link.link,
    // subTitle: link.subTitle
  }
  const validationSchema = Yup.object({})

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }: any) => (
          <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
            <FormInputReadOnly inputID="id" inputType="hidden" />
            <SwitchControl 
                key={post.id}
                name={`${post.id}`}
                label={post.title}
                p="1.5rem 2rem"
                color="white"
                boxShadow="bsBoldWhite'"
                borderRadius="0 2rem 0 2rem"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                switchProps={{
                  colorScheme: "purple",
                  defaultChecked: post.pinned ? true : false,
                }}
                labelProps={{color: 'white'}}
              />
            {/* <SubmitButton variant="unstyled">
            <IconButton
              aria-label={`${link.title} Link`}
              h="auto"
              w="auto"
              fontSize="4xl"
              mt="3.5rem"
              variant="unstyled"
              color="white"
              icon={<FontAwesomeIcon icon={["fal", "save"]} />}
            /></SubmitButton> */}
          </Stack>
        )}
      </Formik>
    </>
  )
}
