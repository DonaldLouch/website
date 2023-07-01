'use client'

import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea";
import supabase from "@/lib/supabase";
import {
  Text,
  Link,
  Flex,
  IconButton,
  Stack,
  Tooltip,
  useToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import { useRouter } from "next/navigation";

import * as Yup from 'yup'

// TODO: Fix type safety for iconPrefix and iconName

export const PrimaryLinkManager = (props: any) => {
  const link = props
  const toast = useToast();
  const toastID = "toastID"
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteLink = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("PrimaryLinks").delete().eq('id', link.id);
        deleteStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${deleteStatus === 204 ? `${link.title} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
            description: `${deleteStatus === 204 ? `You have successfully deleted ${link.title}!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
            status: `${deleteStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        deleteStatus === 204 && router.refresh()
    }

  const onSubmit =  async (values: any, actions: any) => {
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").update({ 
        link: values.link,
        subTitle: values.subTitle,
        lastUpdatedOn: new Date()
    }).match({ id: values.id })
    // await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
    supabaseStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${supabaseStatus === 204 ? "Updated Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            description: `${supabaseStatus === 204 ? `You have successfully updated the ${link.title} link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            status: `${supabaseStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        actions.setSubmitting()
  }
  const initialValues = {
    id: link.id,
    link: link.link,
    subTitle: link.subTitle
  }
  const validationSchema = Yup.object({})

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                <FormInputReadOnly
                  inputID="id"
                  inputLabel=""
                  inputType="hidden"
                />
               <Stack
                      key={link.id}
                      direction="row"
                      // my="2rem"
                      px="1rem"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      spacing="2rem"
                    >
                      <IconButton
                        aria-label={`${link.title} Link`}
                        h="auto"
                        w="auto"
                        fontSize="4xl"
                        mt="3.5rem"
                        variant="unstyled"
                        color="white"
                        icon={<FontAwesomeIcon icon={["fab", link.icon]} />}
                      />
                      <FormInputRow
                        inputID={`subTitle`}
                        inputLabel="Account Name"
                        inputType="text"
                      />
                      <FormInputRow
                        inputID={`link`}
                        inputLabel="Link"
                        inputType="text"
                      />
                    <SubmitButton variant="unstyled">
                      <IconButton
                        aria-label={`${link.title} Link`}
                        h="auto"
                        w="auto"
                        fontSize="4xl"
                        mt="3.5rem"
                        variant="unstyled"
                        color="white"
                        icon={<FontAwesomeIcon icon={["fal", "save"]} />}
                    /></SubmitButton> 
                    <IconButton
                      aria-label={`${link.title} Link`}
                      h="auto"
                      w="auto"
                      fontSize="4xl"
                      mt="3.5rem"
                      variant="unstyled"
                      onClick={deleteLink}
                      color="red"
                      icon={<FontAwesomeIcon icon={["fal", "trash"]} />}
                    />
                    </Stack>
              </Stack>
            )}
          </Formik>
   
    {/* <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
      <ModalContent background="blurredPurple">
        <ModalHeader>Edit Link: {link.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                <FormInputReadOnly
                  inputID="id"
                  inputLabel=""
                  inputType="text"
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing="2rem"
                >
                  <FormInputRow
                    inputID="iconPrefix"
                    inputLabel="Icon Prefix"
                    inputType="text"
                  />
                  <FormInputRow
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
                  <FormInputRow
                    inputID="title"
                    inputLabel="Title"
                    inputType="text"
                  />
                  <FormInputRow
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

                <SubmitButton variant="blackFormButton" my="1rem !important">Edit: {link.title}</SubmitButton> 
              </Stack>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal> */}
    </>
  )
};
