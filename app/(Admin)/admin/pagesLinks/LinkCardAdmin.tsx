'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
// imp
import { MailAtSign02Icon, NewTwitterIcon, Chatting01Icon, GameController01Icon, WifiConnected02Icon, SpotifyIcon, VimeoIcon, YoutubeIcon, MusicNoteSquare02Icon, Shirt01Icon, SoundcloudIcon, Home01Icon } from "@hugeicons/react";

import { useRouter } from "next/navigation";
// import { BsLink45Deg } from "react-icons/bs";
// import { BsEnvelopeAt, BsTwitterX, BsChat, BsXbox, BsBarChart, BsSpotify, BsVimeo, BsYoutube, BsLink45Deg } from "react-icons/bs";
// import { IoShirtOutline, IoLogoSoundcloud } from "react-icons/io5";
// import { SiApplemusic } from "react-icons/si";

import * as Yup from 'yup'

export const LinkCardAdmin = (link: {
  id: string;
  link: string;
  title: string;
  iconPrefix: any;
  iconName: any;
  subTitle: string | null | undefined;
}) => {
  // const toast = useToast();
  // const toastID = "toastID"
  const router = useRouter();
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteLink = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("Links").delete().eq('id', link.id);
        // deleteStatus && !toast.isActive(toastID) &&
        // toast({
        //     id: toastID,
        //     title: `${deleteStatus === 204 ? `${link.title} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
        //     description: `${deleteStatus === 204 ? `You have successfully deleted ${link.title}!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
        //     status: `${deleteStatus === 204 ? "success" : "error"}`,
        //     duration: 9000,
        //     isClosable: true,
        // })
        deleteStatus === 204 && router.refresh()
    }

  const onSubmit =  async (values: any, actions: any) => {
    const submitData = {
        id: values.id,
        iconPrefix: values.iconPrefix,
        iconName: values.iconName,
        title: values.title,
        subTitle: values.subTitle,
        link: values.linkForm,
        }
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Links").update({ 
        iconPrefix: submitData.iconPrefix,
        iconName: submitData.iconName,
        title: submitData.title,
        subTitle: submitData.subTitle,
        link: submitData.link,
        lastUpdatedOn: new Date()
    }).match({ id: submitData.id })
    // supabaseStatus && !toast.isActive(toastID) &&
    //     toast({
    //         id: toastID,
    //         title: `${supabaseStatus === 204 ? "Updated Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
    //         description: `${supabaseStatus === 204 ? `You have successfully updated the ${link.title} link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
    //         status: `${supabaseStatus === 204 ? "success" : "error"}`,
    //         duration: 9000,
    //         isClosable: true,
    //     })
        actions.setSubmitting()
  }
  const initialValues = {
    id: link.id,
    iconPrefix: link.iconPrefix,
    iconName: link.iconName,
    title: link.title,
    subTitle: link.subTitle,
    linkForm: link.link,
  }
  const validationSchema = Yup.object({
    id: Yup.string().required("ID is required"),
    iconPrefix: Yup.string().required("Icon Prefix is required"),
    iconName: Yup.string().required("Icon Name is required"),
    title: Yup.string().required("Link Title is required"),
    linkForm: Yup.string().required("The Link is required"),
  })
  const icon = 
  link.iconName === "mail-at-sign-02" ? <MailAtSign02Icon variant="twotone" size="3rem" /> : 
  link.iconName === "new-twitter" ? <NewTwitterIcon variant="twotone" size="3rem" /> : 
  link.iconName === "chatting-01" ? <Chatting01Icon variant="twotone" size="3rem" /> : 
  link.iconName === "game-controller-01" ? <GameController01Icon variant="twotone" size="3rem" /> : 
  link.iconName === "wifi-connect-02" ? <WifiConnected02Icon variant="twotone" size="3rem" /> : 
  link.iconName === "spotify" ? <SpotifyIcon variant="twotone" size="3rem" /> : 
  link.iconName === "vimeo" ? <VimeoIcon variant="twotone" size="3rem" /> : 
  link.iconName === "youtube" ? <YoutubeIcon variant="twotone" size="3rem" /> : 
  link.iconName === "music-note-square-02" ? <MusicNoteSquare02Icon variant="twotone" size="3rem" /> : 
  link.iconName === "shirt-01" ? <Shirt01Icon variant="twotone" size="3rem" /> : 
  link.iconName === "soundcloud" ? <SoundcloudIcon variant="twotone" size="3rem" /> : 
  <Home01Icon /> as any
  
  return (
    <>
    <div><h1>Page is being refactored.</h1></div>
    {/* <Flex gap="1.3rem" key={link.id}>
      <Link
        variant="unstyled"
        _hover={{ textDecoration: "none" }}
        flex="auto"
        onClick={onOpen}
      >
        <Tooltip label={link.link}>
          <Flex
            color="white"
            boxShadow="bsPrimary"
            my="0.8rem"
            p="1.2rem 2rem"
            borderRadius="0 2rem"
            whiteSpace="nowrap"
            overflowX="scroll"
            alignItems="center"
            justifyContent="start"
            gap="1.3rem"
            _hover={{
              boxShadow: "none",
              bg: "backgroundGradient",
              color: "white",
            }}
          >
            {/* <IconButton
              aria-label={`${link.title} Link`}
              h="auto"
              w="auto"
              fontSize="3xl"
              variant="unstyled"
              icon={<FontAwesomeIcon icon={[link.iconPrefix, link.iconName]} />}
            /> 
            <Icon as={icon} boxSize="2.3rem" mr="0.5rem" />
            <Stack>
              <Text
                m="0"
                fontWeight="300"
                fontSize={{ base: "2rem", xl: "1.8rem" }}
                lineHeight="0.6"
              >
                {link.title}
              </Text>
              <Text
                fontSize="0.8rem"
                fontWeight="300"
                wordBreak="break-word"
                color="grey"
              >
                {link.subTitle}
              </Text>
            </Stack>
          </Flex>
        </Tooltip>
      </Link>
      {/* <IconButton
          aria-label={`${link.title} Link`}
          h="auto"
          w="auto"
          fontSize="3xl"
          variant="unstyled"
          onClick={deleteLink}
          color="red"
          // icon={<FontAwesomeIcon icon={["fas", "trash"]} />}
        /> 
    </Flex>
    <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
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
