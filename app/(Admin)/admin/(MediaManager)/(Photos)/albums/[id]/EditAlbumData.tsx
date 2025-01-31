'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Divider, Group, Loader, Paper, SimpleGrid, Stack, Title, Text, Anchor } from "@mantine/core";

// import moment from "moment";
import ViewPhotoEditAlbum from "./ViewPhotoEditAlbum";
import { useEffect, useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
import { useInView } from "react-intersection-observer";
// import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
// ;
// import ViewPhotoEditAlbum from "./ViewPhotoEditAlbum";
// import Masonry from "react-masonry-css";
// import { BsEye, BsLink45Deg, BsPencilSquare, BsPlusLg, BsTrash2 } from "react-icons/bs";
async function fetchPhotos(nextPage: number, photoLimit: number, albumID: string) {
  const from = nextPage * photoLimit
  const to = from + photoLimit - 1

  const { data } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).range(from, to).order('uploadedOn', { ascending: false }).match({ isPublic: true, isSetup: true, album: albumID })

  return data
}

export default function EditAlbumData({albumData, locations, photoData, photosCount}: any) {
    const { id, albumName } = albumData
    // albumCaption, albumLinks, uploadedOn
    // const [opened, { open, close }] = useDisclosure(false)
    const photoLimit = 15 as number
    // const initialRender = useRef(true)
    const [loadedPhotos, setLoadedPhotos] = useState(photoData)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)
    // const router = useRouter()

    const [ref, inView] = useInView()

    // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    async function loadMorePhotos() {
        // setIsLoading(true)
        const nextPage = page + 1
        const newPhotos = await fetchPhotos(nextPage, photoLimit, albumData.id) as any
        setIsLastPage(nextPage <= Math.ceil(photosCount / photoLimit) - 1 ? false : true)

        if (!isLastPage) {
            setPage(nextPage)
            setLoadedPhotos((prevPhotos: any) => [
            ...(prevPhotos?.length ? prevPhotos : []),
            ...newPhotos
            ])
        }
        // setIsLoading(false)
    }

    useEffect(() => {
        inView && loadMorePhotos()
    }, [inView])

    // const breakpointColumnsObj = {
    //     default: 5,
    //     1500: 4,
    //     800: 3,
    // }
  

//   const [ search, setSearch ] = useState(searchValue)
//   const [ focused, setFocused] = useState(false)
//   const [ completed, setCompleted] = useState(false)
//   const [ prevSearch ] = useState(searchValue)
  
//   const [debounced] = useDebouncedValue(search, 1000);

//   useEffect(() => {
//     if (initialRender.current) {
//       initialRender.current = false
//       return
//     }
//     focused && completed && router.push(`/feed/photography?search=keyword&value=${debounced}`)
//   }, [focused, completed, debounced]);

//   useEffect(() => {
//     if (prevSearch != search && window && window.location) window.location.reload();
//   }, [photos])

    const breadCrumbs = [
        {"pageLink": "/admin/photography", "pageName": "Photography Manager"},
        {"pageLink": "/admin/albums", "pageName": "Photography Album Manager"},
        {"pageLink": `/admin/albums/${id}`, "pageName": `Edit Album: ${albumName}`},
    ]

//   async function deletePhoto() {

//     const id = fileID.replace("_", "/");
//     const formData = new FormData()
//     formData.append("fileKey", fileKey)
//     formData.append("versionID", fileVersionID)
//     const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
//     // console.log(deleteFile)

    
    
//     const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
//     mediaDeleteStatus &&
//     toast({
//         // id: toastID,
//         // title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
//         description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
//         status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
//         duration: 9000,
//         isClosable: true,
//     })
//     mediaDeleteStatus === 204 && router.back()
// //     const { error: deletePostError, status: deletePostStatus } = await supabase.from("BlogPost").delete().eq('id', post.id);
// //         deletePostStatus && !toast.isActive(toastID) &&
// //         toast({
// //             id: toastID,
// //             title: `${deletePostStatus === 204 ? "Post ID Deleted  🗑️" : `Error #${deletePostError?.code} has Occurred`}`,
// //             description: `${deletePostStatus === 204 ? `You have successfully deleted the post "${post.title}"!` : `An error has occurred: ${deletePostError?.message}. ${deletePostError?.hint && `${deletePostError?.hint}.`}`}`,
// //             status: `${deletePostStatus === 204 ? "success" : "error"}`,
// //             duration: 9000,
// //             isClosable: true,
// //         })
// //         deletePostStatus === 204 && router.push("/admin/blog?message=deletedPost")
//   }

    // const onSubmit =  async (values: any, actions: any) => {
    //     const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
    //         albumName: values.albumName,
    //         albumCaption: values.albumCaption ? values.albumCaption : photoData.albumCaption,
    //         uploadedOn: moment(values.uploadedOn),
    //         lastUpdatedOn: moment()
    //     }).eq('id', id)
    //     // console.log(supabaseStatus, supabaseError)
    //     supabaseStatus && !toast.isActive(toastID) &&
    //         toast({
    //             id: toastID,
    //             title: `${supabaseStatus === 204 ? `The Album ${albumName} Was Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
    //             description: `${supabaseStatus === 204 ? `You have successfully edited the selected album!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
    //             status: `${supabaseStatus === 204 ? "success" : "error"}`,
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //     actions.setSubmitting(false)
    //     router.refresh()
    // }

    // const initialValues = { 
    //     albumID: id,
    //     albumName,
    //     albumCaption,
    //     links: albumLinks ? true : false,
    //     hideForm: false,
    //     uploadedOn: moment(uploadedOn).format("yyyy-MM-DDTkk:mm"),
    //     linksRow: albumLinks
    // }

    // const validationSchema = Yup.object({})

  
    return (<>
        <BreadCrumb breads={breadCrumbs} />
        {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit, values }: any) => (
                <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                    <FormSwitch 
                        inputID="hideForm" 
                        helperText="Toggle off to hide the form if you're not editing the album information." 
                    />
                    {values.hideForm === true && (<>
                        <Grid gridTemplateColumns="20% 80%" gap="2rem" alignItems="baseline" width="calc(100% - (2rem * 2))">
                            <IconButton as="a" variant="portalButton" color="white" p="2rem" mb="1rem" href={`/album/${slug}`} icon={<BsEye />} aria-label={`view ${albumName}`}>Preview Photo</IconButton> 
                            <FormInputReadOnly inputID="albumID" inputLabel="" inputType="text" />
                        </Grid>
                        <FormInput inputID="albumName" inputLabel="Album Name" inputType="text" inputDescription="Please make sure to provide the name of the album" />
                        <FormTextArea inputID="albumCaption" inputLabel="Caption" textRows={4} />
                        <FormSwitch 
                            inputID="links" 
                            helperText="Toggle on if there are any link(s) associated with this photo" 
                        />
                        {values.links === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Links" />

                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, please include the &#34;http(s)://&#34; in the inputting of the link.</Code>
                                <Stack id="theLinksSection">
                                    <FieldArray
                                        name="linksRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.linksRow && values.linksRow.length > 0 ? (
                                                    values.linksRow.map((link: any, index: number) => (
                                                        <FormInputCard key={index} id={`${link.name}_${index}`}>
                                                            <FormInputRow inputID={`linksRow.${index}.link`} inputLabel="Link URL" inputType="text"/>
                                                            <FormInputRow inputID={`linksRow.${index}.name`} inputLabel="Link Title" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Link"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsTrash2 /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Link"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { link: '', name: '' })}
                                                            ><BsPlusLg /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Link"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsLink45Deg} />}
                                                        >Add a Link</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )} 
                        
                        <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                    
                        <SubmitButton variant="blackFormButton" my="1rem !important" leftIcon={<BsPencilSquare />}>Edit Album: {albumName}</SubmitButton> 
                        {/* <Button variant="blackFormButton" my="1rem !important" onClick={deletePhoto} background="red" leftIcon={<i className="fa-kit fa-light-image-slash"></i>}>Delete Photo</Button>  *
                    </>)}
                </Stack>
            )}
        </Formik> */}
        
        <Divider label="Photos in Album" labelPosition="center" mx="3rem" my="2rem" />

        {/* <Flex 
            as={Masonry}
            breakpointCols={breakpointColumnsObj}
            // p="4.5rem 1rem 1rem"
            m="2rem 1rem 1rem"
            gap="0.5rem"
        > */}
        {/* <Flex 
            // component={Masonry}
            // breakpointCols={breakpointColumnsObj}
            w="100%"
            // p="4.5rem 1rem 1rem"
            // m="4.5rem auto 0" w="95vw" 
            // m={{base: "0rem -1rem 2rem", sm: "0 -5rem 2rem"}} 
            // p={{base: "0.5rem", sm: "0 0.5rem"}}
            // p="1rem 1rem 1rem"
            gap="0.5rem"
        > */}
            <SimpleGrid cols={4} spacing="1rem">
                {loadedPhotos.map((photo: any) => (
                    <ViewPhotoEditAlbum key={photo.id} locations={locations} albumData={albumData} imageData={photo} />
                ))}
            </SimpleGrid>
        {/* </Flex> */}
        <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg">
            <Stack align="center">
            <Group gap="2rem" align="center">
                <Loader color="white" size="md" type="bars" />
                <Title fz={{base: "2rem", md: "3rem"}}>Loading More Photos</Title>
            </Group>
            <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
            </Stack>
        </Paper>
    </>)
}
