'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, useSteps } from "@chakra-ui/react"
import FileUploader from "../../../(Components)/FileUploader"
import cuid from "cuid"
import { useEffect, useState } from "react"

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useRouter } from "next/navigation"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import supabase from "@/lib/supabase"
import moment from "moment"
import VideoInformation from "./VideoInformation"
import ManualVideo from "./ManualVideo"
import { BsCloudPlus, BsPencilSquare, BsPlay, BsTrash2 } from "react-icons/bs"
    

export default function VideoUploader({currentStep, categoryData}: {currentStep: number, categoryData:any}) {
    const id = cuid()

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
        { title: 'Start', description: 'Start the video upload process' },
        { title: 'Video FIle', description: 'Upload the video file' },
        { title: 'Thumbnail File', description: 'Upload the thumbnail file' },
        { title: 'Information', description: 'Add the video information' },
    ]

     const { activeStep } = useSteps({
        index: currentStep ? currentStep - 1 : 0,
        count: steps.length,
    })


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
    }
    
    async function refreshUploader() {
        destroyCookie({}, 'videoID', {path: '/'})
        router.push('/admin/videography/upload?step=1')
        currentStep === 1 && window.location.reload()
        // window.location.reload();
    }

    useEffect(() => {
      if (currentStep && currentStep != activeStep + 1) window.location.reload();
    })

    return (<>
        <BreadCrumb breads={breadCrumbs} />
        <Stepper index={activeStep} colorScheme="purple" mb="1rem">
            {steps.map((step, index) => (
                <Step key={index}>
                <StepIndicator>
                    <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                    />
                </StepIndicator>

                <Box flexShrink='0'>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
                </Step>
            ))}
        </Stepper>
        <Box hidden={activeStep != 0} m="2rem" color="white">
            <SectionCard styleType="primaryCard" id="start">
                <SectionTitle headingTitle="Before you start the video upload process" />
                <Text m="2rem 0 1rem">Please note that before you start the video upload process, you will only have 30 minutes to complete the video and thumbnail upload steps (steps 2 and 3). It is ideal for videos to be in a .mp4 format and for the thumbnail in a .jpg/jpeg or .png file format. Once you are ready click the below button to start the process 🎉</Text>
            </SectionCard>
            <Stack direction="row" my="2rem" gap="2rem">
                <Button type="button" variant="newFormButton" color="tertiary" leftIcon={<BsPlay />} onClick={startUploader} >Start The Upload Process</Button>
                <Button type="button" variant="newFormButton" color="red" leftIcon={<BsTrash2 />} onClick={refreshUploader}>Refresh ID and Start Over</Button>
            </Stack>
        </Box>
        <Box hidden={activeStep != 1} m="2rem" color="white">
            <FileUploader mediaType="videography" uploadTitle="Upload Video" helperText="For the best video player experience across all devices and browsers, the file format .mp4 is highly recommended video file." id={videoID}/>
            <ManualVideo id={videoID} />
        </Box>
        <Box hidden={activeStep != 2} m="2rem" color="white">
            <FileUploader mediaType="thumbnail" uploadTitle="Upload Thumbnail" helperText="For the best video player experience across all devices and browsers, the file format .jpg/jpeg or .png is highly recommended for the thumbnail file." id={videoID} />
        </Box>
        <Box hidden={activeStep != 3} m="2rem" color="white">
            <VideoInformation videoID={videoID} categoryData={categoryData} />
        </Box>
        <Box hidden={activeStep != 4} m="2rem" color="white">
            <SectionCard styleType="primaryCard" id="start">
                <SectionTitle headingTitle="Your video is uploaded!" />
                <Text m="2rem 0 1rem" textAlign="center">You have successfully uploaded your video!</Text>
            </SectionCard>
            <Stack direction="row" my="2rem" gap="2rem">
                <Button as="a" variant="newFormButton" color="tertiary" leftIcon={<BsPlay />} href={`/video/${videoID}`} >Watch Video</Button>
                <Button as="a" variant="newFormButton" color="yellow" leftIcon={<BsPencilSquare />} >Edit Video</Button>
                <Button type="button" variant="newFormButton" leftIcon={<BsCloudPlus />} onClick={refreshUploader}>Start A New Upload</Button>
            </Stack>
        </Box>
    </>)
}