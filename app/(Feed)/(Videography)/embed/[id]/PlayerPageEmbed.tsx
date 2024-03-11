'use client'

import { Link, Accordion, AccordionButton, AccordionItem, AccordionPanel, AspectRatio, Box, Button, Divider, Grid, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Tag, Text, useDisclosure, TagLabel, Avatar, Tabs, TabList, Tab, TabPanels, TabPanel, useClipboard } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton"
import PostContent from "@/app/post/(Components)/PostContent"
import DisplayDate from "@/lib/DisplayDate"

import Image from "next/image"

export default function PlayerPageEmbed({ videoData }: any) {
   const video = videoData
   
   const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter() as any
    
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(false)
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [isFullscreenMode, setIsFullscreenMode] = useState(false)
    const [videoProgress, setVideoProgress] = useState(0)
    const [theVideoElement, setVideoElement] = useState() as any
    const [timeLeft, setTimeLeft] = useState("0:00") as any
    const [hide, setHide] = useState(false)
    // const [hideTimeLeft, setHideTimeLeft] = useState(false)
    useEffect(() => {
        const videoElement = document.querySelector("#videoElement") as any
        setVideoElement(videoElement)
    }, [])
    
    useEffect(() => {
        theVideoElement?.addEventListener("timeupdate", (e:any) => {
            const theCurrentTime = e.target.currentTime

            const timeCalc = e.target.duration - e.target.currentTime
            const timeLeftHours = Math.floor(timeCalc / 60 / 60) as number;
            const timeLeftMinutes = Math.floor(timeCalc / 60 - timeLeftHours * 60 ) as number;
            const timeLeftTotal = Math.floor(timeCalc / 60) as number;
            const timeLeftSeconds = Math.floor(timeCalc - timeLeftTotal * 60) as number;

            const timeLeftTextString = `${timeLeftHours >= 1 ? `${timeLeftHours}:` : ""}${timeLeftMinutes < 10 ? `0${timeLeftMinutes}` : timeLeftMinutes}:${timeLeftSeconds < 10 ? `0${timeLeftSeconds}` : timeLeftSeconds}` as string
        
            const timePercent = Math.floor((theCurrentTime / e.target.duration) * 100)
            setVideoProgress(timePercent)
            setTimeLeft(timeLeftTextString)
        })

        theVideoElement?.addEventListener("mouseover", () => {setHide(false)})
        theVideoElement?.addEventListener("mouseout", () => {
            !theVideoElement.paused || theVideoElement.currentTIme < 0 ? (setHide(true)) : (setHide(false))
        })

        const controls = document.querySelector('#videoControls')
        controls?.addEventListener("mouseover", () => { setHide(false) })
        controls?.addEventListener("mouseout", () => { setHide(true) })
    }, [theVideoElement])

    useEffect(() => {
        theVideoElement?.addEventListener("play", () => {
            if (playing != true) {
                setPlaying(false)
            }
        })
        theVideoElement?.addEventListener("pause", () => {
            if (playing != false) {
                setPlaying(true)
            }
        })
    })

    useEffect(() => {
        document.addEventListener('fullscreenchange', () => {
            setIsFullscreenMode(Boolean(document.fullscreenElement))
        })
    }, [])

   
    function skipBack() {
        theVideoElement.currentTime -= 10;
    }

    function playClick() {
        if (theVideoElement.paused) {
            theVideoElement.play()
            setPlaying(false)
            console.log("You played the video");
        } else {
            theVideoElement.pause(); // Once button is clicked it will pause the video
            setPlaying(true)
            // playBTNImage.data = vectorPath + "playButton.svg"; // Changes the button to the "play" image
            console.log("You paused the video");
        }
    }

    function skipAhead() {
        theVideoElement.currentTime += 10;
    }

    function videoMute() {
        if (theVideoElement.muted) {
            theVideoElement.muted = false; // Video audio is NOT muted
            setMuted(false)
            console.log("You unmuted the video");
          } else {
            theVideoElement.muted = true; // Video audio IS muted
            setMuted(true)
            console.log("You muted the video");
          }
    }

    function fullscreenMode () {
        document.body.requestFullscreen()
        setIsFullscreenMode(true)
    }
    
    function exitFullscreenMode() {
        document.exitFullscreen()
        setIsFullscreenMode(false)
    }
    

    function seekVideo (e: any) {
        const seekTo = theVideoElement.duration * (e / 100)
        theVideoElement.currentTime = seekTo
    }

    function shareVideo () {
        onOpen()
    }

    function changeChapter(e:any) {
        const chapterTimeCode = e.target.value
        const chapterTimeExplode = chapterTimeCode.split(':')
       
        if(chapterTimeExplode.length >= 3) { // Time split of an hour or more
            const chapterHour = chapterTimeExplode[0] as number
            const chapterMinutes = chapterTimeExplode[1] as number
            const chapterSeconds = chapterTimeExplode[2] as number
            const chapterMinutesCalc = Number(chapterHour * 60) + Number(chapterMinutes) as number
            const chapterTime = Number(chapterMinutesCalc*60) + Number(chapterSeconds) as number
            theVideoElement.currentTime = chapterTime
        } else {
            const chapterMinutes = chapterTimeExplode[0]*60 as number
            const chapterSeconds = chapterTimeExplode[1] as number
            const chapterTime = Number(chapterMinutes) + Number(chapterSeconds) as number
            theVideoElement.currentTime = chapterTime
        }
    }

    // console.log(theVideoElement.currentTime)

    // function changeChapter(time:any) {
    //     // theVideoElement.currentTime = time;
    //     console.log(time);
    //   }

    const leftButtons = [
        {
            buttonIcon: "rotate-left",
            buttonID: "skipBackButton",
            buttonFunction: skipBack
        },
        {
            buttonIcon: playing == true ? ('play') : ('pause'),
            buttonID: "playButton",
            buttonFunction: playClick
        },
        {
            buttonIcon: "rotate-right",
            buttonID: "skipAheadButton",
            buttonFunction: skipAhead
        },
    ] as any
    
    const rightButtons = [
        {
            buttonIcon: muted == false ? ('volume-high') : ('volume-xmark'),
            buttonID: "muteButton",
            buttonFunction: videoMute
        },
        {
            buttonIcon: isFullscreenMode == false ? "arrow-up-right-and-arrow-down-left-from-center" : "arrow-down-left-and-arrow-up-right-to-center",
            buttonID: "fullscreenButton",
            buttonFunction: isFullscreenMode == false ? fullscreenMode : exitFullscreenMode,
            hidden: video.videoType != "Vertical" ? false : true,
        },
        {
            buttonIcon: "share-from-square",
            buttonID: "shareButton",
            buttonFunction: shareVideo
        },
        {
            buttonIcon: "book",
            buttonID: "chapters",
            buttonFunction: shareVideo
        },
        {
            buttonIcon: "info",
            buttonID: "description",
            buttonFunction: shareVideo
        },
    ] as any

    return (<>
        <Box background="blurredPurple" w="100vw" h="100vh" position="fixed" top="0" left="0" zIndex="banner" boxShadow="bsSecondary" color="white" overflowY="hidden">
            {/* <Grid
                gridTemplateColumns={{
                    base: "100%", 
                    md: isFullscreenMode || isTheaterMode ?"100%" : "50% 50%", 
                    lg: isFullscreenMode || isTheaterMode ? "100%" : "60% 40%", 
                    xl: isFullscreenMode || isTheaterMode ? "100%" : "70% 30%"
                }}
                color="black" 
                justifyContent="center"
                alignItems="center" 
                height="100%" 
                gap="1.5rem"
                // maxH={isFullscreenMode ? "100% !important" : "auto"}
                
                // pr={{base: "0"}}
             > */}
                <Stack w="100%" background="black" backdropBlur="60px" h="100%" alignItems="center" justifyContent="center">
                    <Stack position="relative" 
                        w={{
                            base: video.videoType === "Vertical" ? "100vw" : "100%",
                            sm: video.videoType === "Vertical" ? "75vw" : "100%",
                            md: video.videoType === "Vertical" ? "90%" : "100%",
                            lg: video.videoType === "Vertical" ? "73%" : "100%",
                            xl: video.videoType === "Vertical" ? "55%" : "100%",
                            "2xl": video.videoType === "Vertical" ? "42%" : "100%",
                        }} 
                        p="0"
                    >
                        <Stack hidden={hide} direction="row" position="absolute" zIndex="overlay" background="none" backdropFilter="blur(3rem)" color="white" p="1rem" borderRadius="0 1rem" pointerEvents="none" gap="0.5rem" alignItems="center"
                            top="3.5%"
                            left={{
                                base: video.videoType === "Vertical" ? "5%" : "0",
                                md: video.videoType === "Vertical" ? "5%" : "2%"
                            }}
                        >
                            <Text fontSize="1rem" fontWeight="900">{timeLeft}</Text>
                            <Text fontSize="1rem" fontWeight="900">|</Text>
                            <Heading as="h2" textAlign="center" fontSize="1rem" fontWeight="300" overflowX="scroll" wordBreak="keep-all" whiteSpace="nowrap" hidden={hide}>{video.title}</Heading>
                        </Stack>
                        <AspectRatio 
                            ratio={video.videoType === "Vertical" ? 9/16: 16/9} 
                            w="100%"
                            // m={{ base: "0 -4rem", xl: "0"}}
                            overflow="hidden"
                            zIndex="banner"
                            bg="mainGradient"
                            borderRadius="0"
                            boxShadow="bsBoldWhite"
                        >
                            <video src={video.videoFileID.filePath} poster={video.thumbnailFileID.filePath} id="videoElement" />
                        </AspectRatio>

                        <Stack direction="row" color="white" w={{base: "85%", lg: "90%"}} p="0.5rem 1rem" alignItems="center" borderRadius="0 1rem" justifyContent="space-between" backdropFilter="blur(3rem)" zIndex="banner" hidden={hide} id="videoControls"
                            position="absolute" 
                            bottom="calc(1.5% + (0.5rem * 2))"
                            left={{base: "7%", lg: "5%"}}
                            background="blurredPurple"
                            // top="82%" left="5%"
                        >
                            <Stack direction="row">
                                {leftButtons.map((button: any) => (
                                    <Button key={button.index} variant="unstyled" size="sm" _hover={{color: "secondary"}} >
                                        <FontAwesomeIcon icon={['fal', button.buttonIcon]} width="100%" color="currentColor" id="skipBackButton" onClick={button.buttonFunction}/>
                                    </Button>
                                ))}
                            </Stack>

                            <Slider aria-label='scrubber' value={videoProgress} width="70%" onChange={seekVideo}>
                                <SliderTrack bg='secondary'>
                                    <SliderFilledTrack bg='primary' />
                                </SliderTrack>
                                <SliderThumb boxSize={6} color="white">
                                    <IconButton color='primary' variant="unstyled" icon={<FontAwesomeIcon icon={["fas", "timer"]} height="100%" width="100%" color='currentColor' />} aria-label={"Time Icon"} />
                                </SliderThumb>
                            </Slider>
                            <Stack w="7%">
                                <Link href={`/video/${video.id}`}><Image src="/titleLogoWhite.svg" alt="Link to video" width="5000" height="5000"/></Link>
                            </Stack>

                            <Stack direction="row">
                                {rightButtons.map((button: any) => (
                                    <Button key={button.index} variant="unstyled" size="sm" _hover={{color: "secondary"}} hidden={button.hidden ? true : false}>
                                        <FontAwesomeIcon icon={['fal', button.buttonIcon]} width="100%" color="currentColor" id="skipBackButton" onClick={button.buttonFunction}/>
                                    </Button>
                                ))}
                            </Stack>
                            <Modal onClose={onClose} isOpen={isOpen} size="3xl" isCentered>
                                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
                                <ModalContent background="blurredPurple" mx="2rem" pb="2rem">
                                    <ModalHeader>Share &#34;{video.title}&#34;</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text fontWeight="600">Share via Link</Text>
                                            <Input 
                                                value={`${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}`} 
                                                isReadOnly
                                                mt="0.5rem"
                                                variant="unstyled"
                                                boxShadow='bsBoldRed'
                                                p="1.5rem 2rem"
                                                color='yellow'
                                                borderRadius="0 2rem 0 2rem"
                                                type="url"
                                                fontStyle="italic"
                                                fontWeight={300}
                                            />


                                        <Text fontWeight="600" mt="2rem">Share via Embed</Text>
                                            <Input 
                                                value={`<iframe style="aspect-ratio: 16 / 9; width: 100%; overflow: hidden; z-index: 10000;" src="${process.env.NEXT_PUBLIC_SITE_URL}/embed/${video.id}" allowfullscreen></iframe>`} 
                                                isReadOnly
                                                mt="0.5rem"
                                                variant="unstyled"
                                                boxShadow='bsBoldRed'
                                                p="1.5rem 2rem"
                                                color='yellow'
                                                borderRadius="0 2rem 0 2rem"
                                                type="url"
                                                fontStyle="italic"
                                                fontWeight={300}
                                            />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </Stack>
                    </Stack>
                </Stack>
        </Box>
    </>)
}
