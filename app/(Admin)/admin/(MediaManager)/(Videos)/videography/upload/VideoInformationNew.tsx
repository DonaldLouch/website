'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Button, Code, Stack, Anchor, Group, ActionIcon, Text, Flex, Title, Badge, Image, Tooltip, Box, AspectRatio, SimpleGrid, Grid} from "@mantine/core"


import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';

import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import moment from "moment";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import { AlertDiamondIcon, Calendar03Icon, Delete02Icon, DragDropIcon, GridIcon, Image02Icon, Link04Icon, PencilEdit01Icon, PlayIcon, PlusSignIcon } from "@hugeicons/react";
import { randomId } from "@mantine/hooks";
import { use, useEffect, useState } from "react";
import DisplayDate from "@/lib/DisplayDate";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import FormTags from "@/app/(Components)/(Form)/FormTags";
import FormButton from "@/app/(Components)/(Form)/FormButton";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import { notifications } from "@mantine/notifications";
import { getVideoData } from "@/app/actions/video";

// import notificationClasses from '@/app/(Config)/Notifications.module.css'

export default function VideoInformationNew({videoID, categoryData, tagsData}: any) {

    // categoryData

    // const toast = useToast()
    // const toastID = "toastID"
    const router = useRouter()
    const [video, setVideoData] = useState() as any
    // const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getTheVideoData = async () => {
            const data = await getVideoData(videoID)
            setVideoData(data)
        }
        getTheVideoData()
  },[videoID])

    // async () => {
        // const { data: videoData } = await getVideoData(videoID)
        // const video = videoData
        // console.log(video)
    // }


    // const [videoData, setVideoData] = useState()
    // useEffect(() => {
    //     async () => {
            // const videoData = await getVideoData(videoID)
            // setVideoData(data)
    //     }
    // })
    // const { data: videoData } = await getVideoData(videoID)
    // const video = videoData
    console.log(video)

    const [chaptersOption, setChaptersOption] = useState(false)
    const [musicCOption, setMusicCOption] = useState(false)
    const [videoCOption, setVideoCOption] = useState(false)
    const [starringCOption, setStarringCOption] = useState(false)
    const [linkOption, setLinkOption] = useState(false)
    const [isPinnedOption, setIsPinnedOption] = useState(false)

    // const breadCrumbs = [
    //     {"pageLink": "/admin/videography", "pageName": "Videography Manager"},
    //     {"pageLink": `/admin/videography/${video.id}`, "pageName": `Edit Video: ${video.title}`},
    // ]

    // async function deleteVideo() {
    //     const { status: privacyUpdate } = await supabase.from("Videography").update({ videoPrivacy: "DELETING" }).eq('id', video.id)
    //     if (privacyUpdate === 204) {
    //         const videoFIleID = video.videoFileID.fileID.replace("_", "/");
    //         const thumbnailFIleID = video.thumbnailFileID.fileID.replace("_", "/");
            
    //         const formDataVideo = new FormData()
    //         const formDataThumbnail = new FormData()
            
    //         formDataVideo.append("fileKey", video.videoFileID.fileKey)
    //         formDataVideo.append("versionID", video.videoFileID.fileVersionID)
            
    //         formDataThumbnail.append("fileKey", video.thumbnailFileID.fileKey)
    //         formDataThumbnail.append("versionID", video.thumbnailFileID.fileVersionID)

    //         const deleteVideoFile = await fetch(`/api/media/delete/${video.videoFileID.fileID}`, {method: "POST", body: formDataVideo}).then(response => response.json())
    //         const deleteThumbnailFile = await fetch(`/api/media/delete/${video.thumbnailFileID.fileID}`, {method: "POST", body: formDataThumbnail}).then(response => response.json())
    //         // // console.log(deleteVideoFile.response.$metadata.httpStatusCode, deleteThumbnailFile.response.$metadata.httpStatusCode)
    //         if (deleteVideoFile.response.$metadata.httpStatusCode === 200, deleteThumbnailFile.response.$metadata.httpStatusCode === 200) {
    //             const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("Videography").delete().eq('id', video.id)
    //             // mediaDeleteStatus &&
    //             //     toast({
    //             //         // id: toastID,
    //             //         title: `${mediaDeleteStatus === 204 ? "Video Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
    //             //         description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${video.title}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
    //             //         status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
    //             //         duration: 9000,
    //             //         isClosable: true,
    //             //     })
    //             // mediaDeleteStatus === 204 && router.back()
    //         }
    //     }
    // }

    const onSubmit = async (values: any) => {
        // classNames: {root: notificationClasses.errorNotification}
        // notifications.show({ 
        //     title: 'Hello World!', 
        //     message: 'CONTENT', 
        //     icon: <Delete02Icon /> 
        // })
        // // console.log("Values", values)

        const subChapterValue = new Array()
            values.chaptersRow.forEach((chapter: any) => subChapterValue.push(
                {
                    title: chapter.title,
                    timeCode: chapter.timeCode
                }
            ))
        const chaptersSorted = subChapterValue.sort((a: any,b: any)=> (a.timeCode > b.timeCode ? 1 : -1))
            
        const subMusicCreditValue = new Array()
            values.musicCreditsRow.forEach((mCredit: any) => subMusicCreditValue.push(
                {
                    title: mCredit.title,
                    artist: mCredit.artist,
                    timeCode: mCredit.timeCode ? mCredit.timeCode.includes(";;") ? mCredit.timeCode.split(";;").sort() : mCredit.timeCode : null,
                    link: mCredit.link,
                    info: mCredit.info
                }
            ))
            
        const subVideoCreditValue = new Array()
            values.videoCreditsRow.forEach((videoC: any) => subVideoCreditValue.push(
                {
                    title: videoC.title,
                    value: videoC.value
                }
            ))
        
        const subStarringCreditValue = new Array()
            values.starringCreditsRow.forEach((starringC: any) => subStarringCreditValue.push(
                {
                    timeCode: starringC.timeCode ? starringC.timeCode.includes(";;") ? starringC.timeCode.split(";;").sort() : starringC.timeCode : null,
                    displayName: starringC.displayName,
                    link: starringC.link,
                }
            ))

        const subLinkValue = new Array()
            values.linksRow.forEach((link: any) => subLinkValue.push(
                {
                    timeCode: link.timeCode ? link.timeCode.includes(";;") ? link.timeCode.split(";;").sort() : link.timeCode : null,
                    linkType: link.linkType, 
                    icon: link.icon, 
                    link: link.link, 
                    name: link.name
                }
            ))
            
        if (values.capturedOn != video.videoFileID.capturedOn || values.uploadedOn != video.videoFileID.uploadedOn) {
            await supabase.from("VideographyMedia").update({ 
                capturedOn: moment(values.capturedOn).utc(),
                uploadedOn: moment(values.uploadedOn).utc()
            }).eq('fileID', video.videoFileID.fileID)
        }
        if (values.capturedOn != video.thumbnailFileID.capturedOn || values.uploadedOn != video.thumbnailFileID.uploadedOn) {
            await supabase.from("ThumbnailMedia").update({ 
                capturedOn: moment(values.capturedOn).utc(),
                uploadedOn: moment(values.uploadedOn).utc()
            }).eq('fileID', video.thumbnailFileID.fileID)
        }

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Videography").update({ 
            title: values.title,
            excerpt: values.excerpt,
            description: values.description,
            category: values.category,
            videoPrivacy: values.videoPrivacy,
            videoType: values.videoType,

            tags: values.tags,
            chapters: chaptersSorted,
            musicCredits: subMusicCreditValue,
            videoCredits: subVideoCreditValue,
            starring: subStarringCreditValue,
            links: subLinkValue,

            uploadedOn: moment(values.uploadedOn).utc(),
            lastUpdatedOn: moment().utc(),

            isPortfolio: values.isPortfolio,
            isPinned: values.isPinned
        }).eq('id', values.id)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `Video "${values.title}" Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully uploaded your video!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
        })
        // actions.setSubmitting(false)
        supabaseStatus === 204 && router.refresh()
    }

    const initialChaptersValues = new Array({ 
        key: randomId(),
        title: null, 
        timeCode: null
    })
    
    const initialMusicCValues = new Array({ 
        key: randomId(),
        timeCode: null,
        title: null,
        artist: null,
        link: null,
        info: null
    })
    
    const initialVideoCValues = new Array({ 
        key: randomId(),
        title: null,
        value: null,
    })
    
    const initialStarringCValues = new Array({ 
        key: randomId(),
        timeCode: null,
        displayName: null,
        link: null,
    })

    const initialLinkValues = new Array({ 
        key: randomId(),
        timeCode: null, 
        linkType: null, 
        icon: null, 
        link: null, 
        name: null
    })
   

    const initialValues = { 
        id: videoID,
        title: null,
        excerpt: null,
        description: null,
        videoType: "Horizontal",
        category: null,

        tags: [],

        videoPrivacy: "Private",
        isPinned: false,
        isPortfolio: false,
        

        capturedOn: new Date(video.videoFileID?.capturedOn),
        uploadedOn: new Date(video.videoFileID?.uploadedOn),

        chaptersRow: initialChaptersValues,
        musicCreditsRow: initialMusicCValues,
        videoCreditsRow: initialVideoCValues,
        starringCreditsRow: initialStarringCValues,
        linksRow: initialLinkValues,
    }

    const schema = yup.object().shape({
        // title: yup.string().required('A title is required'),
        // excerpt: yup.string().required('An excerpt is required'),
        // description: yup.string().required('A description is required'),
        // category: yup.string().required('A category is required'),
        // tags: yup.string().required('Tag(s) is(are) required'),
        // videoPrivacy: yup.string().required('A set video privacy is required'),
    })

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    }) as any

    const chaptersFields = form.getValues().chaptersRow?.map((item: any, index: any) => (
        <Draggable key={item.key} index={index} draggableId={item.key}>
            {(provided: any) => (
                <Grid key={item.key}
                    align="center"
                    gutter="2rem"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
                        <DragDropIcon />
                    </Box></Grid.Col>
                    <Grid.Col span={5.25}><FormInput inputID={`chaptersRow.${index}.title`}  {...form.getInputProps(`chaptersRow.${index}.title`)} key={form.key(`chaptersRow.${index}.title`)} /></Grid.Col>
                    <Grid.Col span={5.25}><FormInput inputID={`chaptersRow.${index}.timeCode`} {...form.getInputProps(`chaptersRow.${index}.timeCode`)} key={form.key(`chaptersRow.${index}.timeCode`)} /></Grid.Col>
                    <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('chaptersRow', index)}>
                        <Delete02Icon size="1rem" />
                    </ActionIcon></Grid.Col>
                </Grid>
            )}
        </Draggable>
    ))
    
    const musicCFields = form.getValues().musicCreditsRow?.map((item: any, index: any) => (
        // <Stack key={item.key} style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} p="2rem">
            <Draggable key={item.key} index={index} draggableId={item.key}>
                {(provided: any) => (
                    <Stack key={item.key} justify="center"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                    style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} p="2rem" my="1rem"
                    >
                        <Group>
                            <Box {...provided.dragHandleProps} mt="1rem">
                                <DragDropIcon />
                            </Box>
                            <ActionIcon color="red" onClick={() => form.removeListItem('musicCreditsRow', index)}>
                                <Delete02Icon size="1rem" />
                            </ActionIcon> 
                        </Group>
                        <SimpleGrid cols={2}>
                            <FormInput inputID={`musicCreditsRow.${index}.title`} inputLabel="Music Title" {...form.getInputProps(`musicCreditsRow.${index}.title`)} key={form.key(`musicCreditsRow.${index}.title`)} />
                            <FormInput inputID={`musicCreditsRow.${index}.artist`} inputLabel="By" {...form.getInputProps(`musicCreditsRow.${index}.artist`)} key={form.key(`musicCreditsRow.${index}.artist`)} />
                        </SimpleGrid>
                        <SimpleGrid cols={2}>
                            <FormInput inputID={`musicCreditsRow.${index}.timeCode`} inputLabel="Music Time Code" {...form.getInputProps(`musicCreditsRow.${index}.timeCode`)} key={form.key(`musicCreditsRow.${index}.timeCode`)} />
                            <FormInput inputID={`musicCreditsRow.${index}.link`} inputLabel="Link to Song" {...form.getInputProps(`musicCreditsRow.${index}.link`)} key={form.key(`musicCreditsRow.${index}.link`)} />
                        </SimpleGrid>
                        <FormTextArea inputID={`musicCreditsRow.${index}.info`} inputLabel="Information" textRows={4}  {...form.getInputProps(`musicCreditsRow.${index}.info`)} key={form.key(`musicCreditsRow.${index}.info`)} />
                    </Stack>
                )}
            </Draggable>
        // </Stack>
    ))

    const videoCreditsFields = form.getValues().videoCreditsRow?.map((item: any, index: any) => (
        <Draggable key={item.key} index={index} draggableId={item.key}>
            {(provided: any) => (
                <Grid key={item.key}
                    align="center"
                    gutter="2rem"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
                        <DragDropIcon />
                    </Box></Grid.Col>
                    <Grid.Col span={5.25}><FormInput inputID={`videoCreditsRow.${index}.title`}  {...form.getInputProps(`videoCreditsRow.${index}.title`)} key={form.key(`videoCreditsRow.${index}.title`)} /></Grid.Col>
                    <Grid.Col span={5.25}><FormInput inputID={`videoCreditsRow.${index}.value`} {...form.getInputProps(`videoCreditsRow.${index}.value`)} key={form.key(`videoCreditsRow.${index}.value`)} /></Grid.Col>
                    <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('videoCreditsRow', index)}>
                        <Delete02Icon size="1rem" />
                    </ActionIcon></Grid.Col>
                </Grid>
            )}
        </Draggable>
    ))
    
    const starringCreditsFields = form.getValues().starringCreditsRow?.map((item: any, index: any) => (
        <Draggable key={item.key} index={index} draggableId={item.key}>
            {(provided: any) => (
                <Grid key={item.key}
                    align="center"
                    gutter="2rem"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
                        <DragDropIcon />
                    </Box></Grid.Col>
                    <Grid.Col span={3.5}><FormInput inputID={`starringCreditsRow.${index}.timeCode`}  {...form.getInputProps(`starringCreditsRow.${index}.timeCode`)} key={form.key(`starringCreditsRow.${index}.timeCode`)} /></Grid.Col>
                    <Grid.Col span={3.5}><FormInput inputID={`starringCreditsRow.${index}.displayName`}  {...form.getInputProps(`starringCreditsRow.${index}.displayName`)} key={form.key(`starringCreditsRow.${index}.displayName`)} /></Grid.Col>
                    <Grid.Col span={3.5}><FormInput inputID={`starringCreditsRow.${index}.link`}  {...form.getInputProps(`starringCreditsRow.${index}.link`)} key={form.key(`starringCreditsRow.${index}.link`)} /></Grid.Col>
                    <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('starringCreditsRow', index)}>
                        <Delete02Icon size="1rem" />
                    </ActionIcon></Grid.Col>
                </Grid>
            )}
        </Draggable>
    ))

    const videoTypeOptions = [
        {
            value: "Horizontal",
            label: "Horizontal (Best for Desktop)"
        },
        {
            value: "Vertical",
            label: "Vertical (Best for Mobile)"
        }
    ]

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
        <Draggable key={item.key} index={index} draggableId={item.key}>
            {(provided: any) => (
                <Grid key={item.key}
                    align="center"
                    gutter="2rem"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
                        <DragDropIcon />
                    </Box></Grid.Col>
                    <Grid.Col span={2.1}><FormInput inputID={`linksRow.${index}.timeCode`}  {...form.getInputProps(`linksRow.${index}.timeCode`)} key={form.key(`linksRow.${index}.timeCode`)} /></Grid.Col>
                    <Grid.Col span={2.1}> <FormSelect inputID={`linksRow.${index}.linkType`} inputData={linkTypeOptions} key={form.key(`linksRow.${index}.linkType`)} {...form.getInputProps(`linksRow.${index}.linkType`)} /></Grid.Col>
                    <Grid.Col span={2.1}><FormInput inputID={`linksRow.${index}.icon`}  {...form.getInputProps(`linksRow.${index}.icon`)} key={form.key(`linksRow.${index}.icon`)} /></Grid.Col>
                    <Grid.Col span={2.1}><FormInput inputID={`linksRow.${index}.link`}  {...form.getInputProps(`linksRow.${index}.link`)} key={form.key(`linksRow.${index}.link`)} /></Grid.Col>
                    <Grid.Col span={2.1}><FormInput inputID={`linksRow.${index}.name`}  {...form.getInputProps(`linksRow.${index}.name`)} key={form.key(`linksRow.${index}.name`)} /></Grid.Col>
                    <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('linksRow', index)}>
                        <Delete02Icon size="1rem" />
                    </ActionIcon></Grid.Col>
                </Grid>
            )}
        </Draggable>
    ))
    
    const categories = new Array({value: "divider", label: "---", disabled: true}) as any
    categoryData.forEach((category: any) => {
        categories.push({
            value: category.catName,
            label: category.catName
        })
    })

    const privacyOptions = new Array(
        {value: "divider", label: "---", disabled: true},
        {value: "Public", label: "Public"},
        {value: "Unlisted", label: "Unlisted"},
        {value: "Private", label: "Private"},
    ) as any

    return (
        <>
            {/* <Flex
                direction={{base: "column", sm: "row"}}
                gap={{base: "0.5rem", sm: "2rem"}}
                justify="flex-start"
                align="center"
                style={{
                    boxShadow: "var(--mantine-shadow-bsBoldPrimary)",
                    borderRadius: "var(--mantine-radius-md)"
                }}
            >
                <AspectRatio ratio={16 / 9} w="50%">
                <Image src={video.thumbnailFileID.filePath} />
                </AspectRatio>
                <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
                    <Stack gap="0">
                        <Tooltip label={video.title}>
                            <Title
                                order={1}
                                style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                                fz="3rem"
                                td="underline 0.4rem var(--primary)"
                                lineClamp={1}
                            >
                                {video.title}
                            </Title>
                        </Tooltip>
                    </Stack>
                    <Stack gap="1rem" my="1rem">
                        <Group>
                            <Badge color="var(--primary)" leftSection={<GridIcon />}>
                                {video.id}
                            </Badge>
                            <Badge color="red" leftSection={<Calendar03Icon />}>
                                <DisplayDate source={video.videoFileID.capturedOn} />
                            </Badge>
                            <Anchor href={video.videoFileID.filePath} target="_blank"><Badge leftSection={<Link04Icon />} color="blue" tt="lowercase">{video.videoFileID.filePath}</Badge></Anchor> 
                            <Anchor href={`/video/${video.id}`} target="_blank"><Badge leftSection={<PlayIcon />} color="var(--secondary)">Watch the Video</Badge></Anchor> 
                        </Group>
                    </Stack>
                </Flex>
            </Flex> */}
            <Box p="2rem" component="form" onSubmit={form.onSubmit(onSubmit)}>
                {/* {...form.getInputProps('FIELDNAME')} */}
                <FormInput inputID="title" inputLabel="Video Title" inputType="text" inputDescription="Providing is a mandatory field so that it will help people see what they'll be watching before clicking play on the video." {...form.getInputProps('title')}  />
                <FormTextArea inputID="excerpt" inputLabel="Excerpt" textRows={4} {...form.getInputProps('excerpt')}  />
                <FormTextArea inputID="description" inputLabel="Description" textRows={10} helperText={`You may use markdown language on this field. For examples of Markdown please open this page from`} {...form.getInputProps('description')} />

                <SimpleGrid cols={2} spacing="2rem">
                    <FormSelect inputID="videoType" inputData={videoTypeOptions} inputLabel="Video Type" inputHelperText="Please select the video type" {...form.getInputProps('videoType')} />
                    <FormSelect inputID="category" inputData={categories} inputLabel="Category" inputHelperText="Please select the category" {...form.getInputProps('category')} />
                </SimpleGrid>

                <FormTags searchValues={tagsData} {...form.getInputProps('tags')} />

                <FormSwitch 
                    inputID="chaptersOption" 
                    helperText="Toggle on if there are any chapter(s) associated with this video"
                    onClick={(e: any) => setChaptersOption(e.target.checked)} 
                    checked={chaptersOption}
                />
                {chaptersOption && (
                      <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Chapters" />
                        <Code p={3} color="white" ta="center" m="0">For proper formatting and to make sure chapters work properly please make sure to add a proper time format of 0:00 or 00:00. For example 0:20 or 01:30.</Code>
                        {chaptersFields.length > 0 ? (
                            <Grid gutter="2rem">
                                <Grid.Col span={0.5}></Grid.Col>
                                <Grid.Col span={5.25}><Text ta="center">Title</Text></Grid.Col>
                                <Grid.Col span={5.25}><Text ta="center">Time Code</Text></Grid.Col>
                                <Grid.Col span={0.5}></Grid.Col>
                            </Grid>
                        ) : <Text ta="center">There is Currently No Chapters For This Video! You can add one though!</Text>}

                        <DragDropContext
                            onDragEnd={({ destination, source }: any) =>
                                destination?.index !== undefined && form.reorderListItem('chaptersRow', { from: source.index, to: destination.index })
                            }
                        >
                            <Droppable droppableId="chaptersDnD" direction="vertical">
                                {(provided: any) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {chaptersFields}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('chaptersRow', { 
                            key: randomId(),
                            title: null, 
                            timeCode: null, 
                        })}>Add More Chapter(s)</FormButton>
                    </Stack>
                )}
                
                <FormSwitch 
                    inputID="musicCOption" 
                    helperText="Toggle on if there are any music credit(s) associated with this video"
                    onClick={(e: any) => setMusicCOption(e.target.checked)} 
                    checked={musicCOption}
                />
                {musicCOption && (
                    <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Music Credits" />
                        {musicCFields.length === 0 && <Text ta="center">There is Currently No Chapters For This Video! You can add one though!</Text>}
                        <DragDropContext
                            onDragEnd={({ destination, source }: any) =>
                                destination?.index !== undefined && form.reorderListItem('musicCreditsRow', { from: source.index, to: destination.index })
                            }
                        >
                            <Droppable droppableId="musicCDnD" direction="vertical">
                                {(provided: any) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef} w="100%">
                                        <Code p="0.5rem" color="white" ta="center">For proper formatting and to make sure chapters work properly please make sure to add a proper time format of 0:00 or 00:00. For example 0:20 or 01:30.</Code>
                                        {musicCFields}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('musicCreditsRow', { 
                            key: randomId(),
                            title: null,
                            artist: null,
                            timeCode: null,
                            link: null,
                            info: null
                        })}>Add More Music Credit(s)</FormButton>
                    </Stack>
                )}

                <FormSwitch 
                    inputID="videoCOption" 
                    helperText="Toggle on if there are any credit(s) associated with this video"
                    onClick={(e: any) => setVideoCOption(e.target.checked)} 
                    checked={videoCOption}
                />
                {videoCOption && (
                      <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Video Credits" />
                        {videoCreditsFields.length > 0 ? (
                            <Grid gutter="2rem">
                                <Grid.Col span={0.5}></Grid.Col>
                                <Grid.Col span={5.25}><Text ta="center">Title</Text></Grid.Col>
                                <Grid.Col span={5.25}><Text ta="center">Value</Text></Grid.Col>
                                <Grid.Col span={0.5}></Grid.Col>
                            </Grid>
                        ) : <Text ta="center">There is Currently No Credits For This Video! You can add one though!</Text>}

                        <DragDropContext
                            onDragEnd={({ destination, source }: any) =>
                                destination?.index !== undefined && form.reorderListItem('videoCreditsRow', { from: source.index, to: destination.index })
                            }
                        >
                            <Droppable droppableId="videoCreditsDnD" direction="vertical">
                                {(provided: any) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {videoCreditsFields}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('videoCreditsRow', { 
                            key: randomId(),
                            title: null, 
                            value: null, 
                        })}>Add More Video Credit(s)</FormButton>
                    </Stack>
                )}
                
                <FormSwitch 
                    inputID="starringCOption" 
                    helperText="Toggle on if there are any people that are starring in this video"
                    onClick={(e: any) => setStarringCOption(e.target.checked)} 
                    checked={starringCOption}
                />
                {starringCOption && (
                      <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Starring Credits" />
                        {starringCreditsFields.length > 0 ? (
                            <Grid gutter="2rem">
                                <Grid.Col span={0.5}></Grid.Col>
                                <Grid.Col span={3.5}><Text ta="center">Time Code</Text></Grid.Col>
                                <Grid.Col span={3.5}><Text ta="center">Display Name</Text></Grid.Col>
                                <Grid.Col span={3.5}><Text ta="center">Link</Text></Grid.Col>
                                <Grid.Col span={0.5}></Grid.Col>
                            </Grid>
                        ) : <Text ta="center">There is Currently No Starring Credits For This Video! You can add one though!</Text>}

                        <DragDropContext
                            onDragEnd={({ destination, source }: any) =>
                                destination?.index !== undefined && form.reorderListItem('starringCreditsRow', { from: source.index, to: destination.index })
                            }
                        >
                            <Droppable droppableId="starringCreditsDnD" direction="vertical">
                                {(provided: any) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {starringCreditsFields}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('starringCreditsRow', { 
                            key: randomId(),
                            timeCode: null, 
                            displayName: null, 
                            link: null, 
                        })}>Add More Starring Credit(s)</FormButton>
                    </Stack>
                )}
                
                <FormSwitch 
                    inputID="linkOption" 
                    helperText="Toggle on if there are any link(s) associated with this video"
                    onClick={(e: any) => setLinkOption(e.target.checked)} 
                    checked={linkOption}
                />
                {linkOption && (
                      <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Links" />
                        {linkFields.length > 0 ? (
                            <Grid gutter="2rem">
                                <Grid.Col span={0.5}></Grid.Col>
                                <Grid.Col span={2.1}><Text ta="center">Time Code</Text></Grid.Col>
                                <Grid.Col span={2.1}><Text ta="center">Link Type</Text></Grid.Col>
                                <Grid.Col span={2.1}><Text ta="center">Icon</Text></Grid.Col>
                                <Grid.Col span={2.1}><Text ta="center">Link</Text></Grid.Col>
                                <Grid.Col span={2.1}><Text ta="center">Name</Text></Grid.Col>
                                <Grid.Col span={0.5}></Grid.Col>
                            </Grid>
                        ) : <Text ta="center">There is Currently No Links For This Video! You can add one though!</Text>}

                        <DragDropContext
                            onDragEnd={({ destination, source }: any) =>
                                destination?.index !== undefined && form.reorderListItem('linksRow', { from: source.index, to: destination.index })
                            }
                        >
                            <Droppable droppableId="linksDnD" direction="vertical">
                                {(provided: any) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {linkFields}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('linksRow', { 
                            key: randomId(),
                            linkType: "exLink", 
                            icon: null, 
                            link: null, 
                            name: null
                        })}>Add More Link(s)</FormButton>
                    </Stack>
                )}
                
                <SimpleGrid cols={2} my="1rem">
                    <FormDatePicker dateLabel="Captured On" datePlaceholder="When was this captured?" {...form.getInputProps('capturedOn')}/>
                    <FormDatePicker dateLabel="Uploaded On" datePlaceholder="When was this uploaded?" {...form.getInputProps('uploadedOn')}/>
                </SimpleGrid>
                <FormSelect inputID="videoPrivacy" inputLabel="Video Privacy" inputData={privacyOptions} {...form.getInputProps(`videoPrivacy`)} />
                <FormSwitch 
                    inputID="isPinned" 
                    helperText="Toggle on if you want this post to be pinned"
                    {...form.getInputProps('isPinned')}
                    onClick={(e: any) => setIsPinnedOption(e.target.checked)} 
                    checked={isPinnedOption}
                />
                <FormSubmitButton icon={<PencilEdit01Icon />}>Edit Video</FormSubmitButton>
            </Box>
        </>
    )
}
