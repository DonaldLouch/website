'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Button, Code, Stack, Anchor, Group, ActionIcon, Text, Flex, Title, Badge, Image, Tooltip, Box, AspectRatio} from "@mantine/core"

// import { Field, FieldArray, Formik } from "formik";
// import * as Yup from 'yup'

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';

// import FormInput from "@/app/(Components)/(Form)/FormInput";
// import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import { FormInputCard } from "@/app/(Components)/(Form)/FormInputCard";
import moment from "moment";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import { Calendar03Icon, Delete02Icon, GridIcon, Link04Icon, PlayIcon, PlusSignIcon } from "@hugeicons/react";
import { randomId } from "@mantine/hooks";
import { useState } from "react";
import DisplayDate from "@/lib/DisplayDate";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import FormTags from "@/app/(Components)/(Form)/FormTags";
import FormButton from "@/app/(Components)/(Form)/FormButton";

export default function EditVideoData({videoData, categoryData, tagsData}: any) {
    const video = videoData

    // categoryData

    // const toast = useToast()
    // const toastID = "toastID"
    const router = useRouter()

    const [linksOption, setLinksOption] = useState(videoData.links ? true : false)
    const [chaptersOption, setChaptersOption] = useState(videoData.chapters ? true : false)
    const [musicCOption, setMusicCOption] = useState(videoData.musicCredits ? true : false)

    const breadCrumbs = [
        {"pageLink": "/admin/videography", "pageName": "Videography Manager"},
        {"pageLink": `/admin/videography/${video.id}`, "pageName": `Edit Video: ${video.title}`},
    ]

    async function deleteVideo() {
        const { status: privacyUpdate } = await supabase.from("Videography").update({ videoPrivacy: "DELETING" }).eq('id', video.id)
        if (privacyUpdate === 204) {
            const videoFIleID = video.videoFileID.fileID.replace("_", "/");
            const thumbnailFIleID = video.thumbnailFileID.fileID.replace("_", "/");
            
            const formDataVideo = new FormData()
            const formDataThumbnail = new FormData()
            
            formDataVideo.append("fileKey", video.videoFileID.fileKey)
            formDataVideo.append("versionID", video.videoFileID.fileVersionID)
            
            formDataThumbnail.append("fileKey", video.thumbnailFileID.fileKey)
            formDataThumbnail.append("versionID", video.thumbnailFileID.fileVersionID)

            const deleteVideoFile = await fetch(`/api/media/delete/${video.videoFileID.fileID}`, {method: "POST", body: formDataVideo}).then(response => response.json())
            const deleteThumbnailFile = await fetch(`/api/media/delete/${video.thumbnailFileID.fileID}`, {method: "POST", body: formDataThumbnail}).then(response => response.json())
            // console.log(deleteVideoFile.response.$metadata.httpStatusCode, deleteThumbnailFile.response.$metadata.httpStatusCode)
            if (deleteVideoFile.response.$metadata.httpStatusCode === 200, deleteThumbnailFile.response.$metadata.httpStatusCode === 200) {
                const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("Videography").delete().eq('id', video.id)
                // mediaDeleteStatus &&
                //     toast({
                //         // id: toastID,
                //         title: `${mediaDeleteStatus === 204 ? "Video Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
                //         description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${video.title}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
                //         status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
                //         duration: 9000,
                //         isClosable: true,
                //     })
                // mediaDeleteStatus === 204 && router.back()
            }
        }
    }

    const onSubmit =  async (values: any, actions: any) => {
        const tagArray =  values.tags.split(',')

        const chapterArray = values.chaptersOption? values.chaptersRow.sort((a: any,b: any)=> (a.timeCode > b.timeCode ? 1 : -1)) : null
        
        const musicArray = new Array()
        if(values.musicCreditOption) {
            values.musicRow.forEach((music: any) => {
                const musicTimeCode = music.timeCode && 
                    music?.timeCode.includes(",") ? music?.timeCode.split(",").sort() 
                    : music?.timeCode.includes(";;") ? music?.timeCode.split(";;").sort() 
                    : music.timeCode ? music.timeCode 
                    : null
                musicArray.push({"timeCode":  musicTimeCode, "title": music.title ? music.title : null, "artist": music.artist ? music.artist : null, "link": music.link ? music.link : null, "info": music.info ? music.info : null})
            })
        }
        
        const creditArray = values.videoRow ? values.videoRow : null
        
        const starringArray = new Array()
        if(values.starringOption) {
            values.starringRow.forEach((starring: any) => {
                const starringTimeCode = starring.timeCode && 
                    starring?.timeCode.includes(",") ? starring?.timeCode.split(",").sort() 
                    : starring?.timeCode.includes(";;") ? starring?.timeCode.split(";;").sort() 
                    : starring.timeCode ? starring.timeCode 
                    : null
                // const timeCode = timeCodeConvert.split(";;").sort() ? timeCodeConvert.split(";;").sort() : starring.timeCode as any
                starringArray.push({"timeCode": starringTimeCode, "displayName": starring.displayName ? starring.displayName : null, "link": starring.link ? starring.link : null})
            })
        }

        const linkArray = values.linksRow ? values.linksRow : null

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

            tags: tagArray,
            chapters: chapterArray,
            musicCredits: musicArray,
            videoCredits: creditArray,
            starring: starringArray,
            links: linkArray,

            uploadedOn: moment(values.uploadedOn).utc(),
            lastUpdatedOn: moment().utc(),

            isPortfolio: values.isPortfolio,
            isPinned: values.isPinned
        }).eq('id', values.id)
        // supabaseStatus && !toast.isActive(toastID) &&
        //     toast({
        //         id: toastID,
        //         title: `${supabaseStatus === 204 ? `Video "${values.title}" Uploaded 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
        //         description: `${supabaseStatus === 204 ? `You have successfully uploaded your video!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        //         status: `${supabaseStatus === 204 ? "success" : "error"}`,
        //         duration: 9000,
        //         isClosable: true,
        //     })
        actions.setSubmitting(false)
        router.refresh()
    }

    const initialLinkValues = new Array()
    videoData.links && videoData.links.forEach((link: any) => {
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

    const initialChaptersValues = new Array()
    videoData.chapters && videoData.chapters.forEach((chapter: any) => {
        initialChaptersValues.push(
            { 
                key: randomId(),
                title: chapter.title, 
                timeCode: chapter.timeCode
            }
        )
    })
    
    const initialMusicCValues = new Array()
    videoData.musicCredits && videoData.musicCredits.forEach((musicC: any) => {
        initialMusicCValues.push(
            { 
                key: randomId(),
                timeCode: musicC.timeCode,
                title: musicC.title,
                link: musicC.link,
                info: musicC.info
            }
        )
    })

    console.log(initialMusicCValues)


    const initialValues = { 
        id: video.id,
        title: video.title,
        excerpt: video.excerpt,
        description: video.description,
        videoType: video.videoType ? video.videoType : "Horizontal",
        category: video.category.catName,

        tags: video.tags ? video.tags : [],

        videoPrivacy: video.videoPrivacy ? video.videoPrivacy : "Private",
        isPinned: video.isPinned ? video.isPinned : false,
        isPortfolio: video.isPortfolio ? video.isPortfolio : false,
        capturedOn: moment(video.videoFileID.capturedOn).format("YYYY-MM-DDThh:mm"),
        uploadedOn: moment(video.uploadedOn).format("YYYY-MM-DDThh:mm"),

        // chaptersOption: video.chapters && video.chapters.length > 0 ? true : false,
        // musicCreditOption: video.musicCredits && video.musicCredits.length > 0 ? true : false,
        // videoCreditOption: video.videoCredits && video.videoCredits.length > 0 ? true : false,
        // starringOptions: video.starring && video.starring.length > 0 ? true : false,
        // linksOptions: video.links && video.links.length > 0 ? true : false,
       
        // chaptersRow: video.chapters,
        // musicRow: video.musicCredits,
        // videoRow: video.videoCredits,
        // starringRow: video.starring,
        linksRow: initialLinkValues,
        chaptersRow: initialChaptersValues,
        // linksRow: video.links
    }

    const schema = yup.object().shape({
        title: yup.string().required('A title is required'),
        excerpt: yup.string().required('An excerpt is required'),
        description: yup.string().required('A description is required'),
        category: yup.string().required('A category is required'),
        tags: yup.string().required('Tag(s) is(are) required'),
        videoPrivacy: yup.string().required('A set video privacy is required'),
    })

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

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
                <Delete02Icon size="1rem" />
            </ActionIcon>
        </Group>
    ));
    
    const chaptersFields = form.getValues().chaptersRow?.map((item: any, index: any) => (
        <Group key={item.key} justify="center">
            <FormInput inputID={`chaptersRow.${index}.title`} inputLabel="Chapter Title" {...form.getInputProps(`chaptersRow.${index}.title`)} key={form.key(`links.${index}.title`)} />
            <FormInput inputID={`chaptersRow.${index}.timeCode`} inputLabel="Chapter Time Code" {...form.getInputProps(`chaptersRow.${index}.timeCode`)} key={form.key(`links.${index}.timeCode`)} />
            <ActionIcon color="red" onClick={() => form.removeListItem('chaptersRow', index)}>
                <Delete02Icon size="1rem" />
            </ActionIcon>
        </Group>
    ));

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
    
    const categories = new Array({value: "divider", label: "---", disabled: true}) as any
    categoryData.forEach((category: any) => {
        categories.push({
            value: category.catName,
            label: category.catName
        })
    })
    
    return (
        <>
            <BreadCrumb breads={breadCrumbs} />
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
                        {/* <Text fz="1.3rem">
                            {post.excerpt}
                        </Text> */}
                    </Stack>
                    <Stack gap="1rem" my="1rem">
                        <Group>
                            <Badge color="var(--primary)" leftSection={<GridIcon />}>
                                {video.id}
                            </Badge>
                            <Badge color="red" leftSection={<Calendar03Icon />}>
                                <DisplayDate source={video.videoFileID.capturedOn} />
                            </Badge>
                            <Anchor href={videoData.videoFileID.filePath} target="_blank"><Badge leftSection={<Link04Icon />} color="blue" tt="lowercase">{video.videoFileID.filePath}</Badge></Anchor> 
                            <Anchor href={`/video/${video.id}`} target="_blank"><Badge leftSection={<PlayIcon />} color="var(--secondary)">Watch the Video</Badge></Anchor> 
                        </Group>
                    </Stack>
                </Flex>
            </Flex>
            <Box p="2rem" component="form" onSubmit={form.onSubmit(onSubmit)}>
                {/* {...form.getInputProps('FIELDNAME')} */}
                <FormInput inputID="title" inputLabel="Video Title" inputType="text" inputDescription="Providing is a mandatory field so that it will help people see what they'll be watching before clicking play on the video." {...form.getInputProps('title')}  />
                <FormTextArea inputID="excerpt" inputLabel="Excerpt" textRows={4} {...form.getInputProps('excerpt')}  />
                <FormTextArea inputID="description" inputLabel="Description" textRows={10} helperText={`You may use markdown language on this field. For examples of Markdown please open this page from`} {...form.getInputProps('description')} />
                <FormSelect inputID="videoType" inputData={videoTypeOptions} inputLabel="Video Type" inputHelperText="Please select the video type" {...form.getInputProps('videoType')} />
                <FormSelect inputID="category" inputData={categories} inputLabel="Category" inputHelperText="Please select the category" {...form.getInputProps('category')} />
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
                            <Group justify="center">
                                <Text>Title</Text>
                                <Text>Time Code</Text>
                            </Group>
                            ) : <Text ta="center">There is Currently No Chapters For This Video! You can add one though!</Text>}
                        {chaptersFields}
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
                        <SectionTitle headingTitle="Chapters" />
                        <Code p={3} color="white" ta="center" m="0">For proper formatting and to make sure chapters work properly please make sure to add a proper time format of 0:00 or 00:00. For example 0:20 or 01:30.</Code>
                            {chaptersFields.length > 0 ? (
                            <Group justify="center">
                                <Text>Title</Text>
                                <Text>Time Code</Text>
                            </Group>
                            ) : <Text ta="center">There is Currently No Chapters For This Video! You can add one though!</Text>}
                        {chaptersFields}
                        <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('chaptersRow', { 
                            key: randomId(),
                            title: null, 
                            timeCode: null, 
                        })}>Add More Chapter(s)</FormButton>
                    </Stack>
                )}
            </Box>
            {/* 
                        
                        <FormSwitch 
                            inputID="musicCreditOption" 
                            helperText={values.musicCreditOption ? "This video does not have any music credits" : "Does this video have music credits?"} 
                        />
                        {values.musicCreditOption === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Music Credits" />

                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, if you have a song playing multiple times and you would like to credit the song each time, please add double ";;" and space at the start and finish. As an example: &#34;0:00;;2:09;;8:10&#34;. For the links please format as LINK;;NAME. If there is more than one link please septate with double pipe "||" As an example: &#34;https://google.ca;;Google||https://donaldlouch.ca;;Donald Louch&#34;. </Code>
                                <Stack id="theMusicSection">
                                    <FieldArray
                                        name="musicRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.musicRow && values.musicRow.length > 0 ? (
                                                    values.musicRow.map((music: any, index: number) => (
                                                        <FormInputCard key={index} id={`${music.name}_${index}`}>
                                                            <FormInputRow inputID={`musicRow.${index}.timeCode`} inputLabel="Time Code" inputType="text"/>
                                                            <FormInputRow inputID={`musicRow.${index}.title`} inputLabel="Title" inputType="text" />
                                                            <FormInputRow inputID={`musicRow.${index}.artist`} inputLabel="Artist" inputType="text" />
                                                            <FormInputRow inputID={`musicRow.${index}.link`} inputLabel="Link To Song" inputType="text" />
                                                            <FormInputRow inputID={`musicRow.${index}.info`} inputLabel="description" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Music Credit"
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
                                                                aria-label="Add Music Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { timeCode: '', title: '', artist: '', link: '', info: '' })}
                                                            ><BsPlusLg /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Music Credit"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsMusicNoteList} />}
                                                        >Add a Music Credit</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}
                        
                        <FormSwitch 
                            inputID="videoCreditOption" 
                            helperText={values.videoCreditOption ? "This video does not have any additional video credits" : "Does this video have additional video credits?"} 
                        />
                        {values.videoCreditOption === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Video Credits" />
                                <Stack id="theVideoSection">
                                    <FieldArray
                                        name="videoRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.videoRow && values.videoRow.length > 0 ? (
                                                    values.videoRow.map((video: any, index: number) => (
                                                        <FormInputCard key={index} id={`${video.name}_${index}`}>
                                                            <FormInputRow inputID={`videoRow.${index}.title`} inputLabel="Credit Title" inputType="text"/>
                                                            <FormInputRow inputID={`videoRow.${index}.value`} inputLabel="Credit Value" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Music Credit"
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
                                                                aria-label="Add Video Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { title: '', value: '' })}
                                                            ><BsPlusLg /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Video Credit"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsCameraReels} />}
                                                        >Add a Video Credit</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}
                        
                        <FormSwitch 
                            inputID="starringOptions" 
                            helperText={values.starringOptions ? "This video does not have anyone that is starring in it" : "Does this video have anyone that is starring in it?"} 
                        />
                        {values.starringOptions === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Starring Credits" />
                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, if you have a song playing multiple times and you would like to credit the song each time, please add double ";;" and space at the start and finish. As an example: &#34;0:00;;2:09;;8:10&#34;. For the link please format as just as a single link, as an example: &#34;https://donaldlouch.ca/about&#34;. </Code>
                                <Stack id="theStarringSection">
                                    <FieldArray
                                        name="starringRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.starringRow && values.starringRow.length > 0 ? (
                                                    values.starringRow.map((star: any, index: number) => (
                                                        <FormInputCard key={index} id={`${star.name}_${index}`}>
                                                            <FormInputRow inputID={`starringRow.${index}.timeCode`} inputLabel="Time Code" inputType="text"/>
                                                            <FormInputRow inputID={`starringRow.${index}.displayName`} inputLabel="Display Name" inputType="text" />
                                                            <FormInputRow inputID={`starringRow.${index}.link`} inputLabel="Profile Link" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Starring Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><BsPersonDash /></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Starring Credit"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { timeCode: '', displayName: '', link: '' })}
                                                            ><BsPersonPlus /></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Starring Credit"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsPeople} />}
                                                        >Add a Starring Credit</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )}

                        <FormSwitch 
                            inputID="linksOptions" 
                            helperText={values.linksOptions ? "This video does not have any link(s) associated with it" : "Does this video have any link(s) associated with it?"} 
                        />
                        {values.linksOptions === true && (
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

                         <Stack direction="row" gap="2rem"  boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem">
                            <FormInputRow inputID="capturedOn" inputLabel="Captured On" inputType="datetime-local" inputDescription={video.videoFileID.capturedOn} />
                            <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" inputDescription={video.uploadedOn} />
                        </Stack>
                        
                        <FormSelect selectLabel="Video Privacy" selectID="videoPrivacy" selectPlaceholder="Select A Video Privacy">
                            <option value="Public">Public</option>
                            <option value="Unlisted">Unlisted</option>
                            <option value="Private">Private</option>
                        </FormSelect>
                        <Stack direction="row" gap="2rem">
                            <FormSwitch 
                                inputID="isPinned" 
                                helperText={values.isPinned ? "This video is pinned" : "Is this video pinned?"} 
                            />

                            <FormSwitch 
                                inputID="isPortfolio" 
                                helperText={values.isPortfolio ? "This video is apart of the portfolio" : "Is this video apart of the portfolio?"} 
                            />
                        </Stack>
                        <Stack direction="row" my="2rem">
                            <Button type="submit" variant="blackFormButton" leftIcon={<BsPencilSquare/>}>Edit Video: {video.title}</Button> 
                            <Button variant="blackFormButton" onClick={deleteVideo} background="red" leftIcon={<BsTrash2/>}>Delete Video</Button> 
                        </Stack>
                    </Stack>
                )}
            </Formik> */}
        </>
    )
}
