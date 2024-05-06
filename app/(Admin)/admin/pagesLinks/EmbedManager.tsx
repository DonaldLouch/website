'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
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
  AspectRatio,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import { useRouter } from "next/navigation";

import * as Yup from 'yup'

export const EmbedManager = (props: any) => {
  const embed = props
  const toast = useToast();
  const toastID = "toastID"
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteLink = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("Embed").delete().eq('id', embed.id);
        deleteStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${deleteStatus === 204 ? `${embed.title} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
            description: `${deleteStatus === 204 ? `You have successfully deleted ${embed.title}!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
            status: `${deleteStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        deleteStatus === 204 && router.refresh()
    }

  const onSubmit =  async (values: any, actions: any) => {
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Embed").update({ 
      link: values.link,
      title: values.title,
      embedLink: values.embedLink,
      lastUpdatedOn: new Date()
    }).match({ id: values.id })
    supabaseStatus && !toast.isActive(toastID) &&
      toast({
        id: toastID,
        title: `${supabaseStatus === 204 ? "Updated Embed 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
        description: `${supabaseStatus === 204 ? `You have successfully updated the ${embed.title} embed!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        status: `${supabaseStatus === 204 ? "success" : "error"}`,
        duration: 9000,
        isClosable: true,
      })
    actions.setSubmitting()
  }
  const initialValues = {
    id: embed.id,
    embedLink: embed.embedLink,
    link: embed.link,
    title: embed.title,
  }
  const validationSchema = Yup.object({
    embedLink: Yup.string().required("The Embed Link is Required"),
    link: Yup.string().required("The Link is Required"),
    title: Yup.string().required("The Title is Required"),
    id: Yup.string().required("The ID is Required"),
  })

  return (
    <>
    <Button variant="primary" onClick={onOpen} background="black"color="white" my="1rem !important" w="100%" py="2rem !important">{embed.title}</Button> 
      <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
        <ModalContent background="blurredPurple">
          <ModalHeader>Embed</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio
                ratio={16 / 9}
                w="95%"
                m="1rem auto"
                overflow="hidden"
                zIndex="10000"
                bg="mainGradient"
                borderRadius="0 2rem"
            >
                <iframe src={`${embed.embedLink}`} allowFullScreen></iframe> 
            </AspectRatio>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {({ handleSubmit }: any) => (
                <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                  <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
                  <FormInput inputID="title"  inputLabel="Title" inputType="text" />
                  <Stack direction="row" alignItems="center" justify="center" spacing="2rem">
                    <FormInputRow inputID="embedLink"  inputLabel="Embed Link"  inputType="text"  />
                    <FormInputRow inputID="link" inputLabel="Link" inputType="text" />
                  </Stack>
                  <SubmitButton variant="blackFormButton" my="1rem !important">Edit: {embed.title}</SubmitButton> 
                </Stack>
              )}
            </Formik> 
            <Button onClick={deleteLink} variant="primary" background="red" justifyContent="left" fontSize="1.2rem" fontWeight="500" w="100%" py="2rem">DELETE: {embed.title}</Button> 
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};
