'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Stack , Text, Anchor, Box, Group, ActionIcon, Flex, Badge, Title} from "@mantine/core"

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import FormInput from '@/app/(Components)/(Form)/FormInput';
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'


import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import moment from "moment";
import ViewFullPhoto from "@/app/(Components)/ViewFullPhoto";
import FormTags from "@/app/(Components)/(Form)/FormTags";
import { useState } from "react";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { randomId } from "@mantine/hooks";

import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import FormButton from "@/app/(Components)/(Form)/FormButton";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import { notifications } from "@mantine/notifications";
import DisplayDate from "@/lib/DisplayDate";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function EditPhotoData({photoData, photographyAlbum, locations, tagsData}: any) {
    const {fileID, fileTitle, filePath, capturedOn, uploadedOn, fileKey, fileVersionID } = photoData.fileID
    const { photoName, caption, tags, links, album, location, id: photoID, isPublic, isPortfolio, isPinned } = photoData as any

    const [linksOption, setLinksOption] = useState(links ? true : false)
    const [albumOption, setAlbumOption] = useState(album ? true : false)
    const [isPublicOption, setIsPublicOption] = useState(isPublic ? true : false)
    const [isPortfolioOption, setIsPortfolioOption] = useState(isPortfolio ? true : false)
    const [isPinnedOption, setIsPinnedOption] = useState(isPinned ? true : false)

    const router = useRouter()

    const breadCrumbs = [
        {"pageLink": "/admin/photography", "pageName": "Photography Manager"},
        {"pageLink": `/admin/photography/${photoID}`, "pageName": `Edit Photo: ${photoName}`},
    ]

  async function deletePhoto() {
    const id = fileID.replace("_", "/");
    const formData = new FormData()
    formData.append("fileKey", fileKey)
    formData.append("versionID", fileVersionID)
    const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
    // console.log(deleteFile)

    // const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
    // mediaDeleteStatus &&
    //     toast({
    //         title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
    //         description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
    //         status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
    //         duration: 9000,
    //         isClosable: true,
    //     })
    // mediaDeleteStatus === 204 && 
    // router.back()
//     const { error: deletePostError, status: deletePostStatus } = await supabase.from("BlogPost").delete().eq('id', post.id);
//         deletePostStatus && !toast.isActive(toastID) &&
//         toast({
//             id: toastID,
//             title: `${deletePostStatus === 204 ? "Post ID Deleted  🗑️" : `Error #${deletePostError?.code} has Occurred`}`,
//             description: `${deletePostStatus === 204 ? `You have successfully deleted the post "${post.title}"!` : `An error has occurred: ${deletePostError?.message}. ${deletePostError?.hint && `${deletePostError?.hint}.`}`}`,
//             status: `${deletePostStatus === 204 ? "success" : "error"}`,
//             duration: 9000,
//             isClosable: true,
//         })
//         deletePostStatus === 204 && router.push("/admin/blog?message=deletedPost")
  }

    const initialLinkValues = new Array()
    links && links.forEach((link: any) => {
        initialLinkValues.push(
            { 
                key: randomId(),
                linkType: link.linkType, 
                icon: link.icon, 
                link: link.link, 
                name: link.name
            }
        )
    })

    const initialValues = { 
        fileID: fileID, 
        photoID: photoID, 
        photoName: photoName,
        // links: links ? false : true,
        linksRow: initialLinkValues,
        // album: album ? true: false,
        isPublic: isPublic ? true : false,
        isPortfolio: isPortfolio ? true : false,
        isPinned: isPinned ? true : false,
        capturedOn: new Date(capturedOn),
        uploadedOn: new Date(uploadedOn),
        caption: caption,
        tags: tags ? tags : [],
        albumSelect: album ? album : null,
        locationSelect: location ? location : "noLocation",
        newAlbumName: "",
        newAlbumSlug: ""
    }
    const schema = yup.object().shape({
        // caption: Yup.string().required('Caption is required'),
        // tags: Yup.string().required('Tag(s) is(are) required'),
        // startDate: Yup.string().required('Start Date is required'),
        // description: Yup.string().required('Description is required'),
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    }) as any

    const linkTypeOptions = [
        {
            value: "exLink",
            label: "External Link"
        },
        {
            value: "exEmbed",
            label: "External Embed"
        },
        {
            value: "inLink",
            label: "Internal Link"
        },
        {
            value: "inEmbed",
            label: "Internal Embed"
        },
        {
            value: "nonLink",
            label: "Non-Link"
        },
    ]
    const linkFields = form.getValues().linksRow?.map((item: any, index: any) => (
        <Group key={item.key} justify="center">
            <FormSelect inputID={`linksRow.${index}.linkType`} inputData={linkTypeOptions} inputLabel="Link Type" inputHelperText="Please select link type" key={form.key(`links.${index}.linkType`)} {...form.getInputProps(`linksRow.${index}.linkType`)} />
            <FormInput inputID={`linksRow.${index}.icon`} inputLabel="Link Icon" {...form.getInputProps(`linksRow.${index}.icon`)} key={form.key(`links.${index}.icon`)} />
            <FormInput inputID={`linksRow.${index}.link`} inputLabel="Link URL" {...form.getInputProps(`linksRow.${index}.link`)} key={form.key(`links.${index}.link`)} />
            <FormInput inputID={`linksRow.${index}.name`} inputLabel="Link Title" {...form.getInputProps(`linksRow.${index}.name`)} key={form.key(`links.${index}.name`)} />
            <ActionIcon color="red" onClick={() => form.removeListItem('linksRow', index)}>
                <HugeIcon name="delete-02" size="1rem" />
            </ActionIcon>
        </Group>
    ));

    const albumOptions = new Array({value: "newAlbum", label: "Create New Album"}, {value: "divider", label: "---", disabled: true})
    photographyAlbum.forEach((album: any) => {
        albumOptions.push({value: album.id, label: album.albumName})
    })
    const locationOptions = new Array({value: "noLocation", label: "No Location Specified!"}, {value: "newLocation", label: "Create a New Location"}, {value: "divider", label: "---", disabled: true})
    locations.forEach((location: any) => {
        locationOptions.push({value: location, label: location})
    })

    const onSubmit =  async (values: any) => {    
        const subLinkValue = new Array()
            values.linksRow.forEach((link: any) => subLinkValue.push(
                {
                    linkType: link.linkType, 
                    icon: link.icon, 
                    link: link.link, 
                    name: link.name
                }
            ))
        
        const locationName = values.locationSelect === "noLocation" ? null : values.locationSelect === "newLocation" ? values.location : values.locationSelect
        
        const albumID = values.albumSelect && values.albumSelect != "newAlbum" ? values.albumSelect 
        : values.albumSelect && values.albumSelect === "newAlbum" 
        ? "album"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        : !values.albumSelect && null

        if (values.albumSelect === "newAlbum") { //Add new album
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").insert({
            id: albumID,
            albumName: values.newAlbumName,
            slug: values.newAlbumSlug,
            createdOn: moment(),
            lastUpdatedOn: moment(),
        })
        } 
        if (values.albumSelect != "newAlbum") { //Update album
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
            lastUpdatedOn: moment()
        }).eq('id', values.albumSelect)
        }

        if (values.capturedOn || values.uploadedOn) {
            const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyMedia").update({ 
                capturedOn: new Date(values.capturedOn),
                uploadedOn: new Date(values.uploadedOn)
            }).eq('fileID', fileID)
        }

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ 
            photoName: values.photoName,
            caption: values.caption,
            tags: values.tags,
            album: albumID,
            location: locationName,
            links: subLinkValue,
            capturedOn: new Date(values.capturedOn),
            uploadedOn: new Date(values.uploadedOn),
            isPublic: values.isPublic,
            isSetup: values.capturedOn && values.uploadedOn && values.caption && values.tags ? true : false,
            isPortfolio: values.isPortfolio,
            isPinned: values.isPinned
        }).eq('id', photoID)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `Photo ${photoName} Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 204 ? `You have successfully edited the selected photos!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red",
            icon: supabaseStatus === 204 ? <HugeIcon name="file-edit" variant="twotone" /> : <HugeIcon name="alert-diamond" variant="twotone" />
        })
        supabaseStatus === 204 && router.refresh()
        // supabaseStatus && !toast.isActive(toastID) &&
        //     toast({
        //         id: toastID,
        //         title: `${supabaseStatus === 204 ? `Photo ${photoName} Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
        //         description: `${supabaseStatus === 204 ? `You have successfully edited the selected photos!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        //         status: `${supabaseStatus === 204 ? "success" : "error"}`,
        //         duration: 9000,
        //         isClosable: true,
        //     })
            // router.refresh()
    } 
    return ( <>
        <BreadCrumb breads={breadCrumbs} />
        {/* <PrimaryLinkedButton link="/admin/bulkEdit" icon={<PencilEdit02Icon />}>Bulk Edit</PrimaryLinkedButton> */}
        <SectionTitle headingTitle={`Edit Photo: ${photoID}`} />
        <Text ta="center"></Text>
        <Flex
            direction={{base: "column", sm: "row"}}
            gap={{base: "0.5rem", sm: "2rem"}}
            justify="flex-start"
            align="center"
            style={{
                boxShadow: "var(--mantine-shadow-bsBoldPrimary)",
                borderRadius: "var(--mantine-radius-md)"
            }}
        >
                {/* <AspectRatio ratio={16/9} 
                    w="50%"
                >
                    <Image src={filePath} alt={fileID} />
                </AspectRatio>                */}
                <ViewFullPhoto photoData={photoData} />
                <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
                    <Stack gap="0">
                        <Title
                            order={1}
                            style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                            fz="3rem"
                            td="underline 0.4rem var(--primary)"
                        >
                            {fileTitle}
                        </Title>
                        {/* <Text fz="1.3rem">
                            {post.excerpt}
                        </Text> */}
                    </Stack>
                    <Stack gap="1rem" my="1rem">
                        <Group>
                            <Badge color="var(--primary)" leftSection={<HugeIcon name="grid" />}>
                                {fileID}
                            </Badge>
                            <Badge color="red" leftSection={<HugeIcon name="calendar-03" />}>
                                <DisplayDate source={capturedOn} />
                            </Badge>
                            <Anchor href={filePath} target="_blank"><Badge leftSection={<HugeIcon name="link-04" />} color="blue" tt="lowercase">{filePath}</Badge></Anchor>
                        </Group>
                    </Stack>
                </Flex>
            </Flex>
        <Box p="2rem" component="form" onSubmit={form.onSubmit(onSubmit)}>
            <FormInput inputID="photoName" inputLabel="Photo Title" inputDescription="If you would like the title of the photo to be a different title than what was uploaded; you can change that here." {...form.getInputProps('photoName')} />
            <FormTextArea inputID="caption" inputLabel="Caption" textRows={4} {...form.getInputProps('caption')} />
            <FormTags searchValues={tagsData} {...form.getInputProps('tags')} />
            
            <FormSwitch 
                inputID="linksOption" 
                helperText="Toggle on if there are any link(s) associated with this photo"
                onClick={(e: any) => setLinksOption(e.target.checked)} 
                checked={linksOption}
            />
            {linksOption && (
                <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                    <SectionTitle headingTitle="Links" />
                        {linkFields.length > 0 ? (
                        <Group justify="center">
                            <Text>Link Type</Text>
                            <Text>Link Icon</Text>
                            <Text>Link URL</Text>
                            <Text>Link Name</Text>
                        </Group>
                        ) : <Text ta="center">There is Currently No Links! You can add one though!</Text>}
                    {linkFields}
                    <FormButton icon={<HugeIcon name="plus-sign" />} onClick={() => form.insertListItem('linksRow', {
                        key: randomId(),
                        linkType: "exLink", 
                        icon: null, 
                        link: null, 
                        name: null
                    })}>Add More Link(s)</FormButton>
                </Stack>
            )}  
            <FormSwitch 
                inputID="albumOption" 
                helperText="Toggle on if this photo is apart of an album"
                onClick={(e: any) => setAlbumOption(e.target.checked)} 
                checked={albumOption}
            />
            {albumOption && (
                <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem">
                    <SectionTitle headingTitle="Album" />
                    
                    {form.values.albumSelect === "newAlbum" ? 
                        (<Group gap="0">
                            <FormInput inputID="newAlbumName" inputLabel="Album Name" {...form.getInputProps('newAlbumName')} />
                            <FormInput inputID="newAlbumSlug" inputLabel="Album Slug" {...form.getInputProps('newAlbumSlug')} />
                        </Group>) 
                        : form.values.albumSelect ? <Text ta="center">You have selected the photo album: ({form.values.albumSelect}) "{photographyAlbum.find(({ id }: any) => id === form.values.albumSelect).albumName}"</Text>
                        : <Text ta="center">Please Select an Album or Create a New Album!</Text>
                    }
                    <FormSelect inputID="albumSelect" inputData={albumOptions} {...form.getInputProps(`albumSelect`)} />
                </Stack>
            )}
            <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem" my="1rem">
                <SectionTitle headingTitle="Location" />
                {form.values.locationSelect === "newLocation" ? 
                    (
                         <FormInput inputID="location" inputLabel="Location" {...form.getInputProps('location')} inputDescription="If you would like you can add a general location chip to the photo; you can add that here" />
                    ) 
                    // TODO: Add locations
                    : form.values.locationSelect ? <Text ta="center">You have selected the location: "LOCATION OPTION COMING SOON!"</Text> 
                    : <Text ta="center">Optional: Please select a location from an excising photo or Create a New Location!</Text>
                }
               <FormSelect inputID="locationSelect" inputData={locationOptions} {...form.getInputProps(`locationSelect`)} />
            </Stack>

            <Group w="100%" wrap="nowrap">
                <FormDatePicker dateLabel="Taken On" {...form.getInputProps('capturedOn')} isJustRead/>
                <FormDatePicker dateLabel="Uploaded On" datePlaceholder="When was this uploaded?" isClearable {...form.getInputProps('uploadedOn')}/>
            </Group>
            <FormSwitch 
                inputID="isPublic" 
                helperText="Toggle on if you want this photo to be seen publicly"
                {...form.getInputProps('isPublic')}
                onClick={(e: any) => setIsPublicOption(e.target.checked)} 
                checked={isPublicOption}
            />
            <FormSwitch 
                inputID="isPortfolio" 
                helperText="Toggle on if you want this photo to be a portfolio photo"
                {...form.getInputProps('isPortfolio')}
                onClick={(e: any) => setIsPortfolioOption(e.target.checked)} 
                checked={isPortfolioOption}
            />
            <FormSwitch 
                inputID="isPinned" 
                helperText="Toggle on if you want this photo to be pinned"
                {...form.getInputProps('isPinned')}
                onClick={(e: any) => setIsPinnedOption(e.target.checked)} 
                checked={isPinnedOption}
            />

            <FormSubmitButton icon={<HugeIcon name="pencil-edit-01" />}>Edit Photo</FormSubmitButton>
        </Box>
        {/*                 
                    

                    <FormInputCard id="isSections">
                        <Stack direction="row" gap="2rem">
                            <FormSwitch 
                                inputID="isPublic" 
                                helperText="Toggle on if you want this photo to be seen publicly" 
                            />
                            <FormSwitch 
                                inputID="isPortfolio" 
                                helperText="Toggle on if you want this photo to be a portfolio photo" 
                            />
                            <FormSwitch 
                                inputID="isPinned" 
                                helperText="Toggle on if you want this photo to be pinned" 
                            />
                        </Stack>
                    </FormInputCard>
                    
                    <Stack direction="row" gap="2rem">
                        <SubmitButton variant="blackFormButton" my="1rem !important" leftIcon={<BsPencilSquare/>}>Edit Photo: {photoName}</SubmitButton> 
                        <Button variant="blackFormButton" my="1rem !important" onClick={deletePhoto} background="red" leftIcon={<BsTrash2 />}>Delete Photo</Button> 
                    </Stack>
                </Stack>
            )}
        </Formik> */}
    </>)
}
