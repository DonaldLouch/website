'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
import {
  Stack,
  useToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import { useRouter } from "next/navigation";

import * as Yup from 'yup'

export const AddEmbed = () => {
  const toast = useToast();
  const toastID = "toastID"
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit =  async (values: any, actions: any) => {
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Embed").insert({ 
      id: "embed"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
      link: values.link,
      title: values.title,
      embedLink: values.embedLink,
      addedOn: new Date(),
      lastUpdatedOn: new Date()
    })
    // console.log(supabaseStatus, supabaseError)
    supabaseStatus && !toast.isActive(toastID) &&
       toast({
            id: toastID,
            title: `${supabaseStatus === 201 ? "Added New Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            description: `${supabaseStatus === 201 ? `You have successfully added a new link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            status: `${supabaseStatus === 201 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
    actions.setSubmitting()
  }
  const initialValues = {}
  const validationSchema = Yup.object({
    embedLink: Yup.string().required("The Embed Link is Required"),
    link: Yup.string().required("The Link is Required"),
    title: Yup.string().required("The Title is Required"),
  })

  return (
    <>
    <Button variant="primary" onClick={onOpen} background="primary" color="white" my="1rem !important" w="100%">Add New Embed</Button> 
      <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
        <ModalContent background="blurredPurple">
          <ModalHeader>Embed</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {({ handleSubmit }: any) => (
                <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                  <FormInput inputID="title"  inputLabel="Title" inputType="text" />
                  <Stack direction="row" alignItems="center" justify="center" spacing="2rem">
                    <FormInputRow inputID="embedLink"  inputLabel="Embed Link"  inputType="text"  />
                    <FormInputRow inputID="link" inputLabel="Link" inputType="text" />
                  </Stack>
                  <SubmitButton variant="blackFormButton" my="1rem !important">Add New Embed</SubmitButton> 
                </Stack>
              )}
            </Formik> 
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};
