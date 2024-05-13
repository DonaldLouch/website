'use client'

import { Anchor, Accordion, AspectRatio, Box, Button, Divider, Grid, Title, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Slider, Stack, Badge, Text, Avatar, Tabs, ActionIcon, Alert, Group, SimpleGrid, Center, Tooltip, Drawer, CopyButton, Flex, useMantineTheme } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton"
import PostContent from "@/app/(Root)/(Blog)/post/(Components)/PostContent"
import DisplayDate from "@/lib/DisplayDate"
import FullDescription from "./FullDescription"
import { useUser } from "@clerk/nextjs"
import { BsChevronDown, BsPlay, BsPause, BsSkipForward, BsSkipBackward, BsVolumeOff, BsVolumeMute, BsArrowsAngleExpand, BsArrowsAngleContract, BsShare, BsFullscreen, BsFullscreenExit, BsAspectRatio, BsBoxArrowUp, BsHourglass, BsCameraReels, BsFilm, BsCollectionPlay, BsTags, BsTag, BsPersonBoundingBox, BsArrowUpRightSquare, BsBoxArrowUpRight, BsArrowLeft } from "react-icons/bs"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { ArrowExpand01Icon, ArrowExpandIcon, ArrowHorizontalIcon, ArrowLeft01Icon, ArrowLeft02Icon, ArrowShrink01Icon, ArrowShrinkIcon, ArrowUpRight01Icon, ArrowUpRight02Icon, CameraVideoIcon, Copy01Icon, Database01Icon, Database02Icon, GoBackward10SecIcon, GoForward10SecIcon, LibraryIcon, LiverIcon, MaximizeScreenIcon, MinimizeScreenIcon, PauseIcon, PlayIcon, Share05Icon, Tag01Icon, TagsIcon, UserMultiple02Icon, VolumeMute01Icon, VolumeOffIcon } from "@hugeicons/react-pro"

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import SingleAccordion from "@/app/(Components)/(Accordion)/SingleAccording"


export default function PlayerPage({ videoData, mdxSource }: any) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

   const video = videoData
    const {user} = useUser()
   
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter() as any
    
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(false)
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [isFullscreenMode, setIsFullscreenMode] = useState(false)
    const [videoProgress, setVideoProgress] = useState(0)
    const [theVideoElement, setVideoElement] = useState() as any
    const [timeLeft, setTimeLeft] = useState("0:00") as any
    const [videoDuration, setVideoDuration] = useState("0:00") as any
    const [videoDurationNUMBER, setVideoDurationNUMBER] = useState(0) as any
    const [currentVideoTime, setCurrentVideoTime] = useState("0:00") as any
    const [hide, setHide] = useState(false)
    // const [hideTimeLeft, setHideTimeLeft] = useState(false)
    useEffect(() => {
        const videoElement = document.querySelector("#videoElement") as any
        setVideoElement(videoElement)
    }, [])
    
    useEffect(() => {

        theVideoElement?.addEventListener("timeupdate", (e:any) => {
            const theCurrentTime = e.target.currentTime
            const timeCurrentHours = Math.floor(theCurrentTime / 60 / 60) as number;
            const timeCurrentMinutes = Math.floor(theCurrentTime / 60 - timeCurrentHours * 60 ) as number;
            const timeCurrentTotal = Math.floor(theCurrentTime / 60) as number;
            const timeCurrentSeconds = Math.floor(theCurrentTime - timeCurrentTotal * 60) as number;
            const timeCurrentTextString = `${timeCurrentHours >= 1 ? `${timeCurrentHours}:` : ""}${timeCurrentMinutes < 10 ? `0${timeCurrentMinutes}` : timeCurrentMinutes}:${timeCurrentSeconds < 10 ? `0${timeCurrentSeconds}` : timeCurrentSeconds}` as string

            const timeCalc = e.target.duration - e.target.currentTime
            const timeLeftHours = Math.floor(timeCalc / 60 / 60) as number;
            const timeLeftMinutes = Math.floor(timeCalc / 60 - timeLeftHours * 60 ) as number;
            const timeLeftTotal = Math.floor(timeCalc / 60) as number;
            const timeLeftSeconds = Math.floor(timeCalc - timeLeftTotal * 60) as number;
            
            const timeDurationHours = Math.floor(e.target.duration / 60 / 60) as number;
            const timeDurationMinutes = Math.floor(e.target.duration / 60 - timeDurationHours * 60 ) as number;
            const timeDurationTotal = Math.floor(e.target.duration / 60) as number;
            const timeDurationSeconds = Math.floor(e.target.duration - timeDurationTotal * 60) as number;

            const timeLeftTextString = `${timeLeftHours >= 1 ? `${timeLeftHours}:` : ""}${timeLeftMinutes < 10 ? `0${timeLeftMinutes}` : timeLeftMinutes}:${timeLeftSeconds < 10 ? `0${timeLeftSeconds}` : timeLeftSeconds}` as string
            const timeDurationTextString = `${timeDurationHours >= 1 ? `${timeDurationHours}:` : ""}${timeDurationMinutes < 10 ? `0${timeDurationMinutes}` : timeDurationMinutes}:${timeDurationSeconds < 10 ? `0${timeDurationSeconds}` : timeDurationSeconds}` as string
        
            const timePercent = Math.floor((theCurrentTime / e.target.duration) * 100)
            setVideoProgress(timePercent)
            setTimeLeft(timeLeftTextString)
            setCurrentVideoTime(timeCurrentTextString)
            setVideoDuration(timeDurationTextString)
            setVideoDurationNUMBER(e.target.duration)
        })

        theVideoElement?.addEventListener("mouseover", () => {setHide(false)})
        theVideoElement?.addEventListener("mouseout", () => {
            !theVideoElement.paused || theVideoElement.currentTIme < 0 ? (setHide(true)) : (setHide(false))
        })
        theVideoElement?.addEventListener("touchstart", () => { // Video Player is Clicked
            setHide(false)
        })
        theVideoElement?.addEventListener("touchend", () => { // Video Player is Not Clicked
            !theVideoElement.paused || theVideoElement.currentTIme < 0 ? (setHide(true)) : (setHide(false))
        })
        
        // theVideoElement?.addEventListener("click", () => {setHide(false)})
        // theVideoElement?.addEventListener("click", () => {
        //     !theVideoElement.paused || theVideoElement.currentTIme < 0 ? (setHide(true)) : (setHide(false))
        // })

        const controls = document.querySelector('#videoControls')
        controls?.addEventListener("mouseover", () => { setHide(false) })
        controls?.addEventListener("mouseout", (theVideoElement: any) => {
            !theVideoElement.paused || theVideoElement.currentTIme < 0 ? (setHide(true)) : (setHide(false))
        })
        // controls?.addEventListener("keydown", (e: any) => { e.key === "ArrowRight" && skipAhead })
        // controls?.addEventListener("keydown", (e: any) => { e.key === "ArrowLeft" && skipBack })

        // function hide() {
        //     !theVideoElement.paused || theVideoElement.currentTIme < 0 ? setHideControls(true) : setHideControls(false)
        // }
        // function unHide() {
        //     setHideControls(false) 
        //     // setHideTimeLeft(true)
        // }
    }, [theVideoElement])

    useEffect(() => {
        theVideoElement?.addEventListener("play", () => {
            if (playing != true) {
                setPlaying(false)
                setHide(true)
            }
            setHide(false)
        })
        theVideoElement?.addEventListener("pause", () => {
            if (playing != false) {
                setPlaying(true)
                setHide(false)
            }
            setHide(true)
        })
        // document.addEventListener("keydown", (e: any) => { if(e.key === "ArrowRight") {theVideoElement.currentTime -= 10} })
        // document.addEventListener("keydown", (e: any) => { if(e.key === "ArrowLeft") {theVideoElement.currentTime += 10}  })
    })

    useEffect(() => {
        document.addEventListener('fullscreenchange', () => {
            // if (document.fullscreenElement) {}
            setIsFullscreenMode(Boolean(document.fullscreenElement))
        })
        document.addEventListener("keydown", keyPress)
        // document.addEventListener("keydown", (e: any) => { if(e.key === "ArrowLeft") {theVideoElement.currentTime += 10}  })
        // document?.addEventListener("keydown", (e: KeyboardEvent) => {
        //     e.key === "Escape" && setIsFullscreenMode(false)
        // }, true)
    }, [])

    function keyPress(e: KeyboardEvent) {
        console.log(e.key)
        if(e.key === "ArrowRight") {console.log(theVideoElement.currentTime)}
        // if(e.key === "ArrowLeft") {theVideoElement.currentTime -= 10}
    }
   
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

    function theaterMode () {
        setIsTheaterMode(true)
        console.log("Entering Theater Mode")
    }
    function exitTheaterMode() {
        setIsTheaterMode(false)
        console.log("Exiting Theater Mode")
    }

    function fullscreenMode () {
        // const elem = document.documentElement
        // if (elem.requestFullscreen) {
        document.body.requestFullscreen();
        // }
        // } else if (elem.webkitRequestFullscreen) {
        //     /* Safari */
        //     elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) {
        //     /* IE11 */
        //     elem.msRequestFullscreen();
        // }
        setIsFullscreenMode(true)

        // document.addEventListener("keydown", (e: any) => {
        //     e.key === "Escape" && setIsFullscreenMode(false)
        // })
        // console.log("Entering Fullscreen Mode")
    }
    
    function exitFullscreenMode() {
        // const elem = document.documentElement.
        // if (document.exitFullscreen) {
            document.exitFullscreen()
        // } else if (document.webkitExitFullscreen) {
        //     /* Safari */
        //     document.webkitExitFullscreen();
        // } else if (document.msExitFullscreen) {
        //     /* IE11 */
        //     document.msExitFullscreen();
        // }
        // document.addEventListener("keydown", (e: any) => {
        //     e.key === "Escape" && setIsFullscreenMode(false)
        // })
        setIsFullscreenMode(false)
        // console.log("Exiting Fullscreen Mode")
    }

    // useEffect(() => {
    // }, [document.exitFullscreen()])
    

    function seekVideo (e: any) {
        const seekTo = theVideoElement.duration * (e / 100)
        theVideoElement.currentTime = seekTo
    }

    function shareVideo () {
        open()
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

    const chaptersPercentArray = new Array()
    const chapterTimes = video?.chapters && video?.chapters.map((chapter: any) => {
        const timeCode = chapter.timeCode
        let chapterPercent = 0

        const chapterTimeExplode = timeCode.split(':')
       
        if(chapterTimeExplode.length >= 3) { // Time split of an hour or more
            const chapterHour = chapterTimeExplode[0] as number
            const chapterMinutes = chapterTimeExplode[1] as number
            const chapterSeconds = chapterTimeExplode[2] as number
            const chapterMinutesCalc = Number(chapterHour * 60) + Number(chapterMinutes) as number
            chapterPercent = Number(chapterMinutesCalc*60) + Number(chapterSeconds) as number
        } else {
            const chapterMinutes = chapterTimeExplode[0]*60 as number
            const chapterSeconds = chapterTimeExplode[1] as number
            chapterPercent = Number(chapterMinutes) + Number(chapterSeconds) as number
        }
        chaptersPercentArray.push({ value: chapterPercent / videoDurationNUMBER * 100})
        // console.log(chapterTitle, chapterPercent / videoDurationNUMBER)
    })


    // function changeChapter(time:any) {
    //     // theVideoElement.currentTime = time;
    //     console.log(time);
    //   }

    const leftButtons = [
        {
            buttonIcon: <GoBackward10SecIcon />,
            buttonID: "skipBackButton",
            buttonFunction: skipBack,
        },
        
        {
            buttonIcon: playing == true ? <PlayIcon /> : <PauseIcon />,
            buttonID: "playButton",
            buttonFunction: playClick
        },
        {
            buttonIcon: <GoForward10SecIcon />,
            buttonID: "skipAheadButton",
            buttonFunction: skipAhead
        },
    ] as any
    
    const rightButtons = [
        {
            buttonIcon: muted == true ? <VolumeOffIcon /> : <VolumeMute01Icon />,
            buttonID: "muteButton",
            buttonFunction: videoMute
        },
         {
            buttonIcon: isTheaterMode == false ? <MaximizeScreenIcon /> : <MinimizeScreenIcon />,
            buttonID: "theaterModeButton",
            buttonFunction: isTheaterMode == false ? theaterMode : exitTheaterMode,
            hidden: video.videoType != "Vertical" ? false : true,
        },
        {
            buttonIcon: isFullscreenMode == false ? <ArrowExpand01Icon /> : <ArrowShrink01Icon />,
            buttonID: "fullscreenButton",
            buttonFunction: isFullscreenMode == false ? fullscreenMode : exitFullscreenMode,
            hidden: video.videoType != "Vertical" || mobile ? false : true,
        },
        {
            buttonIcon: <Share05Icon />,
            buttonID: "shareButton",
            buttonFunction: shareVideo
        },
    ] as any

    return (<>
        <Box 
            w="100vw" h="101vh"
            pos="fixed"
            top="0%"
            left="0%"
            bg="var(--darkPurple)"
            style={{zIndex: 100, boxShadow: "var(--mantine-shadow-bsSecondary)", overflowY: isFullscreenMode ? "hidden" : "auto"}} 
            c="white"
        >
            <Box hidden={hide || isFullscreenMode || isTheaterMode}><HomeButton icon={<ArrowLeft02Icon size="3rem" />} link="/feed/videography" helperText="Go Back to Video Feed" /></Box> 
            <Grid w="100%">
                <Grid.Col 
                span={isTheaterMode || isFullscreenMode ? {base: 12, sm: 12} : {base: 12, sm: 12, md: 8.4} }
                    style={{alignContent: "center", backdropBlur: "60px", boxShadow: "var(--mantine-shadow-bsBoldWhite)"}}
                    bg={isFullscreenMode ? "black" : "var(--subtleBlurredBackground)"}
                    // pos="relative"
                    h={{base: "initial", md: "101vh"}}
                    p={{base: "1rem", md: "initial"}}
                ><Stack justify="center" align="center" pos="relative">
                    {video.videoType === "Vertical" && (
                        <AspectRatio 
                            ratio={9/16} 
                            w={
                                isTheaterMode ? "30%" : isFullscreenMode ? "100%" : {base: "100%", sm:"calc(50% - 4rem)"}
                                // video.videoType === "Vertical" ? "50%" 
                                // : video.videoType === "Vertical" && isTheaterMode || isFullscreenMode ? "100%"
                                // : "100%"
                            }
                            // m="0 1rem"
                            bg="mainGradient"
                            style={{
                                overflow: "hidden",
                                // zIndex: "banner",
                                borderRadius: isFullscreenMode ? "0" : "0.5rem",
                                boxShadow: "bsBoldWhite"
                            }}
                        >
                            <video src={video.videoFileID.filePath} poster={video.thumbnailFileID.filePath} id="videoElement" playsInline={!isFullscreenMode} />
                        </AspectRatio>
                    )}
                    {video.videoType === "Horizontal" && (
                        <AspectRatio 
                            ratio={16/9} 
                            w={
                                isFullscreenMode ? "100%" : {base: "100%", sm: "calc(100% - 2rem)"}
                            }
                            // m="0 1rem"
                            bg="mainGradient"
                            style={{
                                overflow: "hidden",
                                // zIndex: "banner",
                                borderRadius: isFullscreenMode ? "0" : "0.5rem",
                                boxShadow: "bsBoldWhite"
                            }}
                        >
                            <video src={video.videoFileID.filePath} poster={video.thumbnailFileID.filePath} id="videoElement" playsInline={!isFullscreenMode} />
                        </AspectRatio>
                    )}
                    <Box 
                        pos="absolute"
                        color="white" 
                        p="0rem 1rem" 
                        style={{borderRadius: "0 0 0 1rem", backdropFilter: "blur(3rem)", zIndex: 100, display: hide ? "none" : "block"}} 
                        id="videoControls"
                        bottom="1rem" 
                        visibleFrom="sm"
                        // {
                        //     video.videoType === "Vertical" ? "2.3%" : isTheaterMode || isFullscreenMode ? "calc(50% - 40vh)" : "calc(50% - 18rem)"
                        // }
                        left={video.videoType === "Vertical" ? "25%" : "7%"}
                        // {
                        //     video.videoType === "Vertical" ? {base: "7%", sm: "25%"} : {base: "7%", sm: "5%"}
                        // }
                        bg="var(--darkPurple)"
                        w={video.videoType === "Vertical" ? "50%" : "calc(100% - (7%*2))"}
                    >
                            <Slider 
                            m="-0.5rem -1rem 0rem"
                            value={videoProgress} onChange={seekVideo} aria-label="scrubber"
                            marks={video.chapters ? chaptersPercentArray : [{value: 0}]}
                            label={null}
                        />
                    <Flex justify="space-between" align="center">                        
                        {/* <Group mt="-0.5rem" p="0"> */}
                            {/* maw={video.videoType === "Vertical" ? "100%" : "75%"} */}
                            <Group>
                                {leftButtons.map((button: any) => (
                                    <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                                ))}
                                {/* <Box> */}
                                    <Text fz="1rem" fw="900" hidden={video.videoType === "Vertical"}>{timeLeft}</Text>
                                    <Text fz="1rem" fw="900" display={video.videoType === "Vertical" ? {base: "none"} : {base: "none", sm: "initial"}}>|</Text>
                                    <Tooltip label={video.title}>
                                        {/* w={{base: "10%", sm: "20%", lg: "20%", xl: "25vw"}} */}
                                        <Title order={2} fz="1rem" fw="300" lineClamp={1} w={{base: "10%", sm: "20%", lg: "20%", xl: "25vw"}} display={video.videoType === "Vertical" ? {base: "none"} : {base: "none", sm: "initial"}} style={{whiteSpace: "nowrap"}}>{video.title}</Title>
                                    </Tooltip>
                                {/* </Box> */}
                            </Group>
                            {/* maw={video.videoType === "Vertical" ? "100%" : "25%"} */}
                            <Group wrap="nowrap">
                                {rightButtons.map((button: any) => (
                                    <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                                ))}
                            </Group>
                        {/* </Group> */}
                    {/* </Stack> */}
                    </Flex>
                    </Box>
                    <Box hiddenFrom="sm" pos="absolute" color="white" 
                        p="0rem 1rem" 
                        style={{borderRadius: "var(--mantine-radius-md)", backdropFilter: "blur(3rem)", zIndex: 100, display: hide ? "none" : "block"}} 
                        id="videoControls"
                        top="calc(50% - 1rem)"
                        //  left={video.videoType === "Vertical" ? "25%" : "7%"}
                        // {
                        //     video.videoType === "Vertical" ? {base: "7%", sm: "25%"} : {base: "7%", sm: "5%"}
                        // }
                        // bg="var(--darkPurple)"
                        // w={video.videoType === "Vertical" ? "50%" : "calc(100% - (7%*2))"}
                    >
                        {leftButtons.map((button: any) => (
                            <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                        ))}
                    </Box> 
                    <Box hiddenFrom="sm" pos="absolute" color="white" 
                        p="0rem 1rem" 
                        style={{borderRadius: "var(--mantine-radius-md)", backdropFilter: "blur(3rem)", zIndex: 100, display: hide ? "none" : "block"}} 
                        id="videoControls"
                        top="2%"
                        right="2%"
                        // bg="black"
                        //  left={video.videoType === "Vertical" ? "25%" : "7%"}
                        // {
                        //     video.videoType === "Vertical" ? {base: "7%", sm: "25%"} : {base: "7%", sm: "5%"}
                        // }
                        // bg="var(--darkPurple)"
                        // w={video.videoType === "Vertical" ? "50%" : "calc(100% - (7%*2))"}
                    >
                        {rightButtons.map((button: any) => (
                            <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                        ))}
                    </Box> 
                </Stack></Grid.Col>
                <Grid.Col span={{base: 12, sm: 12, md: 3.6}} p="1rem 2rem" mah="101vh" style={{overflow: "scroll"}} hidden={isTheaterMode || isFullscreenMode}>
                    <Title order={2} ta="center" fz="2rem" fw="900" c="white" my="0.5rem" style={{overflowX: "scroll", wordBreak: "keep-all", whiteSpace: "nowrap"}}>{video.title}</Title>
                    <Tabs defaultValue={video.chapters ? "chapters" : "description"}>
                        <Tabs.List grow justify="center">
                            <Tabs.Tab value="chapters" disabled={!video.chapters}>Chapters</Tabs.Tab>
                            <Tabs.Tab value="description">Description</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="chapters">
                            <Stack w="100%" p="2rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)"}} h="100%">
                                <Title order={3} ta="center" fz="1.8rem" fw="900" c="white" mb="1rem">Chapters</Title>
                                {video.chapters && video.chapters.map((chapter:any, index: number) => (<>
                                    <Button 
                                        key={index}
                                        onClick={changeChapter}
                                        value={chapter.timeCode} 
                                        // my="0.2rem"
                                        // styles={{
                                        //     root: {
                                        //         overflowX: "scroll",
                                        //         overflowY: "hidden",
                                        //         backdropFilter: "blur(3rem)",
                                        //         // color: "white",
                                        //         ta: "left"
                                        //     }
                                        // }}
                                        className={classes.chaptersButton}
                                        // color="" 
                                        color="var(--blackRGBA)" 
                                        // c="white"
                                        p="1.5rem 1rem" 
                                        radius="md" 
                                        fz="1rem"
                                        fw="900"
                                        ta="left"
                                        justify="flex-start"
                                        // display="flex"
                                        // align="center"
                                        // justifyContent="flex-start"
                                        // gap="0.5rem"
                                        leftSection={<Text fw="300" fz="0.8rem">{chapter.timeCode} </Text>}
                                        rightSection={<Text fw="300" ff="heading" fz="1rem">{chapter.title}</Text>}
                                    >|</Button>
                                </>))}
                            </Stack>
                        </Tabs.Panel>   
                        <Tabs.Panel value="description">
                            <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)", overflow: "scroll"}} p="0 2rem" mb="1rem" mah="60vh">
                                <PostContent mdxSource={mdxSource} />
                            </Box>
                            <FullDescription mdxSource={mdxSource} videoTitle={video.title} />
                            <SingleAccordion customMargin="1rem -1rem" content={[{
                                id: "metadata",
                                imageType: "Icon",
                                image: <Database02Icon />,
                                label: "Video Information",
                                description: "The video metadata information",
                            }]}>
                                <Stack c="white" p="0rem">
                                    <Title order={3} ta="center" fz="1.8rem" fw="900" c="white" my="1rem" ff="text">Video Information</Title>
                                    
                                    <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Uploaded On</Title>
                                        <Badge color ="red" leftSection={<CameraVideoIcon />}>
                                            <DisplayDate source={video.uploadedOn} format="dddd, MMMM Do YYYY [at] h:mm a" />
                                        </Badge>
                                    
                                    <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Category</Title>
                                            <Badge color="primary" leftSection={<LibraryIcon />}>
                                                {video.category.catName}
                                            </Badge>
                                    <Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Tags</Title>
                                        <Group align="center" gap="1rem" m="">
                                            <TagsIcon />
                                            {video.tags && video.tags.map((tag: any, index: number) => (
                                                <Badge color ="white" leftSection={<Tag01Icon />} key={index}>
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </Group>
                                    {video.starring && video.starring.length > 0 && (<><Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Starring</Title>
                                        <Group align="center" wrap="wrap" gap="0.8rem" m="1rem 1rem 0">
                                            <UserMultiple02Icon />
                                            {video.starring && video.starring.map((star: any, index: number) => (
                                                star.link ? <Anchor href={star.link}>
                                                    <Badge color="purple" leftSection={
                                                        <Avatar
                                                            src=''
                                                            size='xs'
                                                            alt={star.displayName}
                                                            ml={-1}
                                                            mr={2}
                                                        />
                                                    } key={index}>
                                                        {star.displayName}    
                                                    </Badge>
                                                </Anchor> : <Badge color="purple" leftSection={
                                                    <Avatar
                                                        src=''
                                                        size='xs'
                                                        alt={star.displayName}
                                                        ml={-1}
                                                        mr={2}
                                                    />
                                                } key={index}>
                                                    {star.displayName}    
                                                </Badge>
                                            ))}
                                        </Group>
                                    </>)}
                                    
                                    {video.musicCredits && video.musicCredits.length > 0 && (<><Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" my="1rem" ff="text">Music Credits</Title>
                                        <Stack gap="1.5rem" mb="0.5rem">
                                            {video.musicCredits && video.musicCredits.map((mCredit: any, index: number) => (
                                                mCredit.title && (
                                                    <Stack key={index}>
                                                        <AspectRatio
                                                            ratio={1 / 1}
                                                            style={{
                                                                boxShadow: "var(--mantine-shadow-bsBoldWhite)",
                                                                borderRadius: "var(--mantine-radius-md)",
                                                                overflow: "scroll",
                                                            }}
                                                            mah="100%"
                                                        >
                                                            <Stack justify="flex-start !Important" align="flex-start !Important" p="1.5rem">
                                                                <Title order={4}>{mCredit.title}</Title>
                                                                {mCredit.artist && (<Text fw={300} pb="1rem">By: {mCredit.artist}</Text>)}
                                                                {mCredit.link && (<Divider />)}
                                                                {mCredit.link && <Anchor key={index} href={mCredit.link}  p="0" m="0.5rem auto"><Badge color ="blue" leftSection={<ArrowUpRight01Icon />}>
                                                                    View Song
                                                                </Badge></Anchor>
                                                                }
                                                                {mCredit.link && (<Divider />)}
                                                                {mCredit.info && (<Text p="1rem">{mCredit.info}</Text>)}
                                                            </Stack>
                                                        </AspectRatio>
                                                    </Stack>
                                                )
                                            ))}
                                        </Stack>
                                    </>)}
                                    {video.videoCredits && video.videoCredits.length > 0 && video.videoCredits.map((vCredit: any, index: number) => (
                                        <>
                                            <Title key={index}  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text" m="0">{vCredit.title}</Title>
                                            <Text p="1rem" fz="1.2rem">{vCredit.value}</Text>
                                        </>
                                    ))}
                                </Stack>
                            </SingleAccordion>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
            <Drawer size="full" opened={opened} onClose={close} title={`Share Video: "${video.title}"`} 
                overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
                }}
                offset="2rem"
                radius="0 0 0 2rem"
                position="top"
                styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            >
                <Text fw="600">Share via Link</Text>
                <CopyButton value={`${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}`}>
                    {({ copied, copy }) => (
                        <Group style={{boxShadow: copied ? "var(--mantine-shadow-bsBoldPrimary)" : "var(--mantine-shadow-bsBoldRed)", borderRadius: "var(--mantine-radius-md)"}} p="0.5rem 2rem" onClick={copy}>
                            {!copied && <Copy01Icon />}
                            <Text>{copied ? `Link Copied: ${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}` :`${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}`} </Text>
                        </Group>
                    )}
                </CopyButton>


            <Text fw="600" mt="2rem">Share via Embed</Text>
            <Text>Feature Coming Soon!</Text>
                {/* <Input 
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
                    hidden={!user}
                /> */}
            </Drawer>
        </Box>
    </>)
}
