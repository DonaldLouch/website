'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Text, Image, Anchor, Stepper, Box, Group, Code } from "@mantine/core"
import FileUploader from "../../../(Components)/FileUploader"
// import cuid from "cuid"
import { use, useEffect, useState } from "react"

// import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useRouter, useSearchParams } from "next/navigation"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { SectionTitle } from "@/app/(Components)/SectionTitle"

import supabase from "@/lib/supabase"
import moment from "moment"
import VideoInformation from "./VideoInformation"
import ManualVideo from "./ManualVideo"
import { CameraVideoIcon, CloudSavingDone01Icon, CloudUploadIcon, Delete02Icon, Delete03Icon, Edit02Icon, Home01Icon, Image02Icon, ImageUpload01Icon, ImageUploadIcon, InformationCircleIcon, PlayIcon, RefreshIcon } from "@hugeicons/react"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
// import { BsCloudPlus, BsPencilSquare, BsPlay, BsTrash2 } from "react-icons/bs"

import classes from "@/app/(Components)/Components.module.css"
import EditVideoData from "../[id]/EditVideoData"
import VideoInformationNew from "./VideoInformationNew"
import ResumeUpload from "./ResumeUpload"
import InlineCode from "@/app/(Components)/(MarkdownCode)/InlineCode"

export default function VideoUploader({currentStep, categoryData, tagsData, videoData}: any) {
// categoryData
    // const cookies = parseCookies() as any
    // const videoID = cookies.videoID as string
    // const videoID = id ? id : "videoID_"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
    // const videoID = id
    const searchParams = useSearchParams()
 
    const id = searchParams.get('id')
    // const videoID = id ? id : "videoID_"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
    // const cookies = parseCookies()
    const router = useRouter()

    // useEffect(() => {
    //     const newID = id ? id : "videoID_"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
    //     id && id != cookies.videoID && destroyCookie({}, 'videoID', {path: '/'}); setCookie({}, 'videoID', newID, {
    //         maxAge: 30 * 60 * 1000, // 30 minutes
    //         path: '/',
    //     })
    //     currentStep === 1 && newID != cookies.videoID && destroyCookie({}, 'videoID', {path: '/'}); setCookie({}, 'videoID', newID, {
    //         maxAge: 30 * 60 * 1000, // 30 minutes
    //         path: '/',
    //     })
    // }, [])
    
    // const videoID = cookies.videoID as string
    const [videoID, setVideoID] = useState(id)

    // !videoID && setCookie({}, 'videoID', id, {
    //     maxAge: 30 * 60 * 1000, // 30 minutes
    //     path: '/',
    // })

    async function startUploader() {
        const newID = id ? id : "videoID_"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        setVideoID(newID)
        // id && id != cookies.videoID && destroyCookie({}, 'videoID', {path: '/'}); setCookie({}, 'videoID', newID, {
        //     maxAge: 30 * 60 * 1000, // 30 minutes
        //     path: '/',
        // })
        // currentStep === 1 && newID != cookies.videoID && destroyCookie({}, 'videoID', {path: '/'}); setCookie({}, 'videoID', newID, {
        //     maxAge: 30 * 60 * 1000, // 30 minutes
        //     path: '/',
        // })

        const {status} = await supabase.from("Videography").insert({
            id: newID,
            videoFileID: null,
            thumbnailFileID: null,
            lastUpdatedOn: moment(),
            title: null,
            uploadedOn: moment(),
            videoPrivacy: "Private",
            isSetup: false,
            isPortfolio: false,
            isPinned: false,
        })
        status === 201 && router.push(`/admin/videography/upload?step=2&id=${newID}`)
        // router.refresh()
    }
    
    async function refreshUploader() {
        const { status } = await supabase.from("Videography").delete().eq('id', videoID)
        status === 204 && router.push('/admin/videography/upload?step=1')
    }
    async function newUpload() {
        router.push('/admin/videography/upload?step=1')
    }

    const breadCrumbs = [
        {"pageLink": "/admin/videography", "pageName": "Videography Manager"},
        {"pageLink": "/admin/videography/upload", "pageName": `Videography Upload: ${videoID}`},
    ]

    const steps = [
        { title: 'Start', description: 'Start the video upload process', icon: <CloudUploadIcon />, content: <>
            <SectionCard styleType="primaryCard" id="start">
                <SectionTitle headingTitle="Before you start the video upload process" />
                <Text>For the best video player experience across all devices and browsers, the file format <InlineCode code=".mp4" /> is highly recommended for the video file; while for the thumbnail a <InlineCode code=".jpg" />/<InlineCode code=".jpeg" /> or <InlineCode code=".png" /> file format is recommended. Once you are ready click the below button to start the process 🎉 you may also resume an upload by clicking the "Resume Upload" button; just as long as you know the ID of the video you are uploading.</Text>
            </SectionCard>
            <Group m="3rem 0 0" gap="2rem" justify="center">
                <PrimaryButton colour="green.0" icon={<CloudUploadIcon />} action={startUploader} c="black">Start The Upload Process</PrimaryButton>
                <PrimaryButton colour="red" icon={<Delete02Icon />} action={refreshUploader}>Start Over</PrimaryButton>
                <ResumeUpload />
            </Group>
        </>},
        { title: 'Video FIle', description: 'Upload the video file', icon: <CameraVideoIcon />, content: <>
            <FileUploader mediaType="videography" uploadTitle="Upload Video" helperText="For the best video player experience across all devices and browsers, the file format .mp4 is highly recommended video file." id={videoID}/>
            <ManualVideo id={videoID} />
        </>},
        { title: 'Thumbnail File', description: 'Upload the thumbnail file', icon: <Image02Icon />, content: <>
            <FileUploader mediaType="thumbnail" uploadTitle="Upload Thumbnail" helperText="For the best video player experience across all devices and browsers, the file format .jpg/jpeg or .png is highly recommended for the thumbnail file." id={videoID} />
        </>},
        { title: 'Information', description: 'Add the video information', icon: <InformationCircleIcon />, content: <>
            {/* categoryData={categoryData} */}
            <VideoInformationNew videoID={videoID} categoryData={categoryData} tagsData={tagsData} videoData={videoData} />
            {/* <EditVideoData videoData={{ id: videoID }} categoryData={categoryData} tagsData={tagsData} /> */}
        </>},
        { title: 'Done!', description: 'Your video is uploaded!', icon: <CloudSavingDone01Icon />, content: <>
            <SectionCard styleType="primaryCard" id="start">
                <SectionTitle headingTitle="Your video is uploaded!" />
                <Text ta="center">You have successfully uploaded your video!</Text>
            </SectionCard>
            <Group m="3rem 0 0" gap="2rem" justify="center">
                <PrimaryLinkedButton link={`/video/${videoID}`} primNewIcon={{name: "play", variant: "duotone"}} colour="green.0" fontColour="black">Watch Video</PrimaryLinkedButton>
                <PrimaryLinkedButton link={`/admin/videography/${videoID}`} primNewIcon={{name: "edit-02", variant: "duotone"}} colour="var(--secondary)" fontColour="black">Edit Video</PrimaryLinkedButton>
                <PrimaryButton colour="red" primNewIcon={{name: "cloud-upload", variant: "duotone"}} action={newUpload}>Start A New Upload</PrimaryButton>
            </Group>
        </>, isDisabled: false },
    ]

    const [active, setActive] = useState(currentStep ? currentStep - 1 : 0) as any

    // useEffect(() => {
    //     const selectedStep = active + 1
    //     currentStep != selectedStep && router.push(`/admin/videography/upload?step=${selectedStep}${id && `&id=${id}`}`)
    //     console.log(currentStep, selectedStep)
    //     // active + 1 === currentStep && window.location.reload()
    //     // currentStep != selectedStep && window.location.reload()
    // console.log("hello")
    //     // window.location.reload()
    // }, [active, currentStep])

    useEffect(() => {
        const selectedStep = active + 1
        // !currentStep && router.push(`/admin/videography/upload?step=1${id && `&id=${id}`}`)
        currentStep != 2 &&router.push(`/admin/videography/upload?step=${selectedStep}${videoID ? `&id=${videoID}`: ""}`)
    }, [active])

    useEffect(() => {
        // currentStep == 4 && window.location.assign(`/admin/videography/upload?step=4id=${videoID}`)
        const selectedStep = active + 1
        !currentStep && router.push(`/admin/videography/upload?step=1${videoID ? `&id=${videoID}` : ""}`)
        console.log(currentStep, selectedStep)
        currentStep && selectedStep != currentStep && window.location.reload()
    }, [currentStep])

    return (<>
        <BreadCrumb breads={breadCrumbs} />
        <Stepper active={active} onStepClick={setActive} color="var(--primary)" m="3rem 1rem 2rem" size="sm" radius="sm" completedIcon={<CloudSavingDone01Icon variant="twotone" />}>
            {steps.map((step, index) => (
                <Stepper.Step key={index} label={step.title} description={step.description} icon={step.icon} classNames={{ stepIcon: classes.stepIcon}} styles={{ stepDescription: {fontWeight: 300 } }} disabled={step.isDisabled ? step.isDisabled : false}>
                    <Box mx="3rem">
                        {step.content}
                    </Box>
                </Stepper.Step>
            ))}
        </Stepper>
    </>)
}