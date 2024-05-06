'use client'

import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
import {
  Icon,
  IconButton,
  Stack,
  useToast
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import { useRouter } from "next/navigation";
import { BsFacebook, BsTwitterX, BsLinkedin, BsYoutube, BsThreads, BsInstagram, BsTiktok, BsGithub, BsLink45Deg, BsFloppy, BsFloppy2, BsTrash2 } from "react-icons/bs";

import * as Yup from 'yup'

export const PrimaryLinkManager = (props: any) => {
  const link = props
  const toast = useToast();
  const toastID = "toastID"
  const router = useRouter();

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
   const theIcon = 
    link.icon === "BsFacebook" ? BsFacebook :
    link.icon === "BsTwitterX" ? BsTwitterX :
    link.icon === "BsLinkedin" ? BsLinkedin :
    link.icon === "BsYoutube" ? BsYoutube :
    link.icon === "BsThreads" ? BsThreads :
    link.icon === "BsInstagram" ? BsInstagram :
    link.icon === "BsTiktok" ? BsTiktok :
    link.icon === "BsGithub" ? BsGithub :
    BsLink45Deg

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
                      px="1rem"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      spacing="2rem"
                    >
                      {/* <IconButton
                        aria-label={`${link.title} Link`}
                        h="auto"
                        w="auto"
                        fontSize="4xl"
                        mt="3.5rem"
                        variant="unstyled"
                        color="white"
                        icon={<FontAwesomeIcon icon={["fab", link.icon]} />}
                      /> */}
                      <Icon as={theIcon} boxSize="3rem" mt="3.5rem" />
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
                        icon={<BsFloppy2 />}
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
                      icon={<BsTrash2 />}
                    />
                    </Stack>
              </Stack>
            )}
          </Formik>
    </>
  )
};
