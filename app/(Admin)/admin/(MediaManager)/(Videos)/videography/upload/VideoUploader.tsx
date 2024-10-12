'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
// import { Box, Button, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, useSteps } from "@chakra-ui/react"
import { Text, Image, Anchor, Stepper, Box, Group } from "@mantine/core"
import FileUploader from "../../../(Components)/FileUploader"
// import cuid from "cuid"
import { useEffect, useState } from "react"

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useRouter } from "next/navigation"
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

export default function VideoUploader({currentStep, categoryData, tagsData}: {currentStep: number, categoryData: any, tagsData: any}) {
    const id = "video"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
// categoryData
    const cookies = parseCookies() as any
    const videoID = cookies.videoID as string
    const router = useRouter()

    !videoID && setCookie({}, 'videoID', id, {
        maxAge: 30 * 60 * 1000, // 30 minutes
        path: '/',
    })

    const breadCrumbs = [
        {"pageLink": "/admin/videography", "pageName": "Videography Manager"},
        {"pageLink": "/admin/videography/upload", "pageName": `Videography Upload: ${videoID}`},
    ]

    const steps = [
        { title: 'Start', description: 'Start the video upload process', icon: <CloudUploadIcon />, content: <>
            <SectionCard styleType="primaryCard" id="start">
                <SectionTitle headingTitle="Before you start the video upload process" />
                <Text>Please note that before you start the video upload process, you will only have 30 minutes to complete the video and thumbnail upload steps (steps 2 and 3). It is ideal for videos to be in a .mp4 format and for the thumbnail in a .jpg/jpeg or .png file format. Once you are ready click the below button to start the process 🎉</Text>
            </SectionCard>
            <Group m="3rem 0 0" gap="2rem" justify="center">
                <PrimaryButton colour="green.0" icon={<CloudUploadIcon />} action={startUploader} c="black">Start The Upload Process</PrimaryButton>
                <PrimaryButton colour="red" icon={<Delete02Icon />} action={refreshUploader}>Refresh ID and Start Over</PrimaryButton>
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
            <VideoInformation videoID={videoID} categoryData={categoryData} tagsData={tagsData} />
        </>},
        { title: 'Done!', description: 'Your video is uploaded!', icon: <CloudSavingDone01Icon />, content: <>
            <SectionCard styleType="primaryCard" id="start">
                <SectionTitle headingTitle="Your video is uploaded!" />
                <Text ta="center">You have successfully uploaded your video!</Text>
            </SectionCard>
            <Group m="3rem 0 0" gap="2rem" justify="center">
                <PrimaryLinkedButton link={`/video/${videoID}`} icon={<PlayIcon />} colour="green.0" fontColour="black">Watch Video</PrimaryLinkedButton>
                <PrimaryLinkedButton link={`/admin/videography/${videoID}`} icon={<Edit02Icon />} colour="var(--secondary)" fontColour="black">Edit Video</PrimaryLinkedButton>
                <PrimaryButton colour="red" icon={<CloudUploadIcon />} action={refreshUploader}>Start A New Upload</PrimaryButton>
            </Group>
        </>, isDisabled: false },
    ]

    const [active, setActive] = useState(currentStep ? currentStep - 1 : 0) as any


    async function startUploader() {
        const {status} = await supabase.from("Videography").insert({
            id: videoID,
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
        status === 201 && router.push('/admin/videography/upload?step=2')
        router.refresh()
    }
    
    async function refreshUploader() {
        const { status } = await supabase.from("Videography").delete().eq('id', videoID)
        status === 204 && destroyCookie({}, 'videoID', {path: '/'}); (router.push('/admin/videography/upload?step=1')); router.refresh()
    }

    useEffect(() => {
        const selectedStep = active + 1
        currentStep != selectedStep && router.push(`/admin/videography/upload?step=${selectedStep}`)
        console.log(currentStep, active + 1)
        active + 1 === currentStep && router.refresh()
    }, [active])

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