'use client'

import { Anchor, AspectRatio, Box, Button, Divider, Title, Slider, Stack, Badge, Text, Image, ActionIcon, Group, Tooltip, Drawer, CopyButton, Flex, useMantineTheme, Grid, SimpleGrid, rem, Space } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton"
import PostContent from "@/app/(Root)/(Blog)/post/(Components)/PostContent"
import DisplayDate from "@/lib/DisplayDate"
import FullDescription from "./FullDescription"
import { useUser } from "@clerk/nextjs"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { ArrowExpand01Icon, ArrowExpandIcon, ArrowHorizontalIcon, ArrowLeft01Icon, ArrowLeft02Icon, ArrowShrink01Icon, ArrowShrinkIcon, ArrowUpRight01Icon, ArrowUpRight02Icon, Bookmark01Icon, CameraVideoIcon, Copy01Icon, Database01Icon, Database02Icon, GoBackward10SecIcon, GoForward10SecIcon, Home01Icon, InformationCircleIcon, LibraryIcon, LiverIcon, MaximizeScreenIcon, MinimizeScreenIcon, PauseIcon, PlayIcon, Share05Icon, Tag01Icon, TagsIcon, UserMultiple02Icon, VolumeMute01Icon, VolumeOffIcon } from "@hugeicons/react"

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import SingleAccordion from "@/app/(Components)/(Accordion)/SingleAccording"



export default function PlayerPage({ videoData, mdxSource, playerType }: any) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

   const video = videoData

    // const {user} = useUser()
    // const isAdmin = user && user.publicMetadata.role === "admin" ? true : false
   
    const [openedShare, { open: openShare, close: closeShare }] = useDisclosure(false)
    const [openedChapter, { open: openChapter, close: closeChapter }] = useDisclosure(false)
    const [openedInfo, { open: openInfo, close: closeInfo }] = useDisclosure(false)
    
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

    const isVertical = video.videoType === "Vertical" ? true : false
    const isHorizontal = video.videoType === "Horizontal" ? true : false
    const isEmbed = playerType === "embed" ? true : false
    const isPage = playerType === "page" ? true : false

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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
        
        const backButton = document.querySelector('#goHome')
        const controlsDesktop = document.querySelector('#videoControlsDesktop')
        const controlsDesktopHeader = document.querySelector('#videoControlsDesktopHeader')
        const controlsMobile = document.querySelector('#videoControlsMobile')
        const controlsMobileHeader = document.querySelector('#videoControlsMobileHeader')
        
        // if (mobile) {
            theVideoElement?.addEventListener("touchstart", () => { 
                setHide(false)
                sleep(3000).then(() => {
                    theVideoElement.paused || theVideoElement.currentTIme < 0 ? setHide(false) : setHide(true)
                    // !theVideoElement.paused && setHide(true)
                })
            })
            // theVideoElement?.addEventListener("touchend", () => {
            //     theVideoElement.paused || theVideoElement.currentTIme < 0 ? setHide(false) : setHide(true)
            // })

            // controlsMobile?.addEventListener("touchstart", () => { setHide(false) })
            // controlsMobile?.addEventListener("touchend", () => {
            //     const videoElement = document.querySelector("#videoElement") as any
            //     videoElement?.addEventListener("mouseout", () => {
            //         videoElement.paused || videoElement.currentTIme < 0 ? setHide(false) : setHide(true)
            //     })
            // })

            // controlsMobileHeader?.addEventListener("touchstart", () => { setHide(false) })
            // controlsMobileHeader?.addEventListener("touchend", () => {
            //     const videoElement = document.querySelector("#videoElement") as any
            //     videoElement?.addEventListener("mouseout", () => {
            //         videoElement.paused || videoElement.currentTIme < 0 ? setHide(false) : setHide(true)
            //     })
            // })
        // } else {
            theVideoElement?.addEventListener("mouseover", () => { setHide(false) })
            theVideoElement?.addEventListener("mouseout", () => {
                theVideoElement.paused || theVideoElement.currentTIme < 0 ? setHide(false) : setHide(true)
            })

            // backButton?.addEventListener("mouseover", () => { setHide(false) })
            // backButton?.addEventListener("mouseout", () => {
            //     setHide(true)
            // })
            
            controlsDesktop?.addEventListener("mouseover", () => { setHide(false) })
            controlsDesktop?.addEventListener("mouseout", () => {
                const videoElement = document.querySelector("#videoElement") as any
                videoElement?.addEventListener("mouseout", () => {
                    videoElement.paused || videoElement.currentTIme < 0 ? setHide(false) : setHide(true)
                })
            })

            isVertical && controlsMobile?.addEventListener("mouseover", () => { setHide(false) })
            isVertical && controlsMobile?.addEventListener("mouseout", () => {
                const videoElement = document.querySelector("#videoElement") as any
                videoElement?.addEventListener("mouseout", () => {
                    videoElement.paused || videoElement.currentTIme < 0 ? setHide(false) : setHide(true)
                })
            })

            controlsDesktopHeader?.addEventListener("mouseover", () => { setHide(false) })
            controlsDesktopHeader?.addEventListener("mouseout", () => {
                const videoElement = document.querySelector("#videoElement") as any
                videoElement?.addEventListener("mouseout", () => {
                    videoElement.paused || videoElement.currentTIme < 0 ? setHide(false) : setHide(true)
                })
            })
        // }
    }, [theVideoElement])

    useEffect(() => {
        theVideoElement?.addEventListener("play", () => {
            if (playing != true) {
                setPlaying(false)
                setHide(true)
            }
            setHide(false)
            sleep(3000).then(() => {
                setHide(true)
            })
        })
        theVideoElement?.addEventListener("pause", () => {
            if (playing != false) {
                setPlaying(true)
                setHide(false)
            }
            sleep(3000).then(() => {
                setHide(true)
            })
            // setHide(true)
        })
        // document.addEventListener("keydown", (e: any) => { if(e.key === "ArrowRight") {theVideoElement.currentTime -= 10} })
        // document.addEventListener("keydown", (e: any) => { if(e.key === "ArrowLeft") {theVideoElement.currentTime += 10}  })
    })

    useEffect(() => {
        document.addEventListener('fullscreenchange', () => {
            // if (document.fullscreenElement) {}
            setIsFullscreenMode(Boolean(document.fullscreenElement))
        })
        // document.addEventListener("keydown", keyPress)
        // document.addEventListener("keydown", (e: any) => { if(e.key === "ArrowLeft") {theVideoElement.currentTime += 10}  })
        // document?.addEventListener("keydown", (e: KeyboardEvent) => {
        //     e.key === "Escape" && setIsFullscreenMode(false)
        // }, true)
    }, [])

    // function keyPress(e: KeyboardEvent) {
        // console.log(e.key)
        // if(e.key === "ArrowRight") {// console.log(theVideoElement.currentTime)}
        // if(e.key === "ArrowLeft") {theVideoElement.currentTime -= 10}
    // }
   
    function skipBack() {
        theVideoElement.currentTime -= 10;
    }

    function playClick() {
        if (theVideoElement.paused) {
            theVideoElement.play()
            setPlaying(false)
            // console.log("You played the video");
        } else {
            theVideoElement.pause(); // Once button is clicked it will pause the video
            setPlaying(true)
            // playBTNImage.data = vectorPath + "playButton.svg"; // Changes the button to the "play" image
            // console.log("You paused the video");
        }
    }

    function skipAhead() {
        theVideoElement.currentTime += 10;
    }

    function videoMute() {
        if (theVideoElement.muted) {
            theVideoElement.muted = false; // Video audio is NOT muted
            setMuted(false)
            // console.log("You unmuted the video");
          } else {
            theVideoElement.muted = true; // Video audio IS muted
            setMuted(true)
            // console.log("You muted the video");
          }
    }

    // function theaterMode () {
    //     setIsTheaterMode(true)
    //     // console.log("Entering Theater Mode")
    // }
    // function exitTheaterMode() {
    //     setIsTheaterMode(false)
    //     // console.log("Exiting Theater Mode")
    // }

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
        // // console.log("Entering Fullscreen Mode")
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
        // // console.log("Exiting Fullscreen Mode")
    }

    // useEffect(() => {
    // }, [document.exitFullscreen()])
    

    function seekVideo (e: any) {
        const seekTo = theVideoElement.duration * (e / 100)
        theVideoElement.currentTime = seekTo
    }

    function shareModal () {
        openShare()
    }
    function chapterModal () {
        openChapter()
    }
    function infoModal () {
        openInfo()
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
    const chapterTimes = video.chapters.length > 0  && video?.chapters.map((chapter: any) => {
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
        // // console.log(chapterTitle, chapterPercent / videoDurationNUMBER)
    })

    function backToFeed() {
        router.push("/feed/videography")
    }

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
        //  {
        //     buttonIcon: isTheaterMode == false ? <MaximizeScreenIcon /> : <MinimizeScreenIcon />,
        //     buttonID: "theaterModeButton",
        //     buttonFunction: isTheaterMode == false ? theaterMode : exitTheaterMode,
        //     hidden: mobile ? true : false,
        // },
        {
            buttonIcon: isFullscreenMode == false ? <ArrowExpand01Icon /> : <ArrowShrink01Icon />,
            buttonID: "fullscreenButton",
            buttonFunction: isFullscreenMode == false ? fullscreenMode : exitFullscreenMode,
            hidden: isVertical
        },
        {
            buttonIcon: <Share05Icon />,
            buttonID: "shareButton",
            buttonFunction: shareModal
        }
    ] as any
    
    const topButtons = [
        {
            buttonIcon: <Bookmark01Icon />,
            buttonID: "chapters",
            buttonFunction: chapterModal,
            hidden: video.chapters.length > 0 ? false : true
        },
        {
            buttonIcon: <InformationCircleIcon />,
            buttonID: "description",
            buttonFunction: infoModal,
            // hidden: playerType === "page" ? true : false
        },
        {
            buttonIcon: <Home01Icon />,
            buttonID: "backToFeed",
            buttonFunction: backToFeed,
            hidden: !isVertical
        },
    ] as any

    return (<>
        <Box
            mt="-5.5rem"
            mx={{base: "-1rem", lg: "-5rem"}}
            mb="-md"
        >
            <Stack
                style={{ 
                    backdropBlur: "60px", 
                    boxShadow: "var(--mantine-shadow-bsBoldWhite)",
                    overflowX: "hidden", overflowY: isEmbed ? "hidden" : "auto",
                    zIndex: isFullscreenMode || isVertical ? 90000 : "auto"
                }}
                bg={isFullscreenMode || isVertical ? "black" : "var(--blackRGBA)"}
                h={isFullscreenMode || isEmbed ? "100vh" : "auto"}
                p={isFullscreenMode || isEmbed ? "0" : isVertical ? {base: "0", sm: "0 0 2rem", md: "2rem 0"} : "2rem"}
                justify="center" align="center"
                gap="0"
                // pt={isPage ? "6rem" : "initial"}
                pt={isVertical ? "0rem" : isPage ? "6rem" : "initial"}
                pos={isFullscreenMode ? "fixed" : isVertical ? "relative" : "initial"}
            > 
                <Stack 
                    justify="center" align="center" 
                    pos="relative"
                    style={{zIndex: 90000}}
                    gap="0"
                >
                    {/* isVertical ? {base: "80%", sm: "50vw", lg: "40%", xl: "30%"} */}
                    <AspectRatio 
                        ratio={isVertical ? 9 / 16 : 16 / 9}
                        // w={isEmbed ? "100%" : isHorizontal ? "calc(100% - 2rem)" : {base: "60vw", sm: "35vw"}}
                        // m={isVertical ? {base: "0.5rem", md: "2rem"} : "inherit" }
                        // w="100% !important"
                        w= {!isVertical ? "100%" : "auto"}
                        h={isVertical ? {base: "100vh", sm: "calc(100vmin - 4rem)"} : "auto"}
                        mt={isVertical ? {base: "0", sm: "2rem"} : "0"}
                        // w="100%"
                        style={{borderRadius: isFullscreenMode ? "0" : "0.5rem", boxShadow: "var(--mantine-shadow-bsBoldWhite)", overflow: "hidden"}}
                        // pos="relative" 
                        // poster={video.thumbnailFileID.filePath
                    >
             
                        <video src={video.videoFileID.filePath} poster={video.thumbnailFileID.filePath} playsInline={!isFullscreenMode} id="videoElement" />
                    </AspectRatio>

                    <Grid 
                        pos="absolute"
                        color="white" 
                        p={{base: "1rem 1rem", sm: "0rem 1rem"}}
                        style={{borderRadius: "var(--mantine-radius-md)", backdropFilter: "blur(3rem)", zIndex: 100, display: hide || isVertical ? "none" : "flex"}} 
                        id="videoControlsDesktopHeader"
                        top="1.5%" 
                        left={{base: "3vw", md: "1.5%"}}
                        bg="var(--darkPurpleRGBA)"
                        w={{base: "calc(100% - (3vw * 2))", md: "calc(100% - (1.5% * 2))"}}
                        align="center"
                    >
                        <Grid.Col span={8}>
                            <Group>
                                <Text fz="1rem" fw="900" visibleFrom="sm">{timeLeft}</Text>
                                <Text fz="1rem" fw="900" visibleFrom="sm">|</Text>
                                <Tooltip label={video.title}>
                                    <Title order={2} fz="1rem" fw="300" lineClamp={1} w="85%" style={{whiteSpace: "nowrap"}}>{video.title} </Title>
                                </Tooltip>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Group justify="flex-end" gap="0">
                                {topButtons.map((button: any) => (
                                    !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                                ))}
                            </Group>
                        </Grid.Col>
                    </Grid>

                    <Box 
                        pos="absolute"
                        color="white" 
                        p={{base: "0.2rem 1rem", sm: "0rem 1rem"}}
                        style={{borderRadius: "0 0 0 1rem", backdropFilter: "blur(3rem)", zIndex: 100}} 
                        id="videoControlsDesktop"
                        bottom="1rem" 
                        visibleFrom="sm"
                        hidden={hide || isVertical}
                        left="7%"
                        bg="var(--darkPurple)"
                        w="calc(100% - (7%*2))"
                    >
                        <Slider 
                            m="-0.5rem -1rem 0rem"
                            value={videoProgress} onChange={seekVideo} aria-label="scrubber"
                            marks={video.chapters.length > 0  ? chaptersPercentArray : [{value: 0}]}
                            label={null}
                        />
                        <Flex justify="space-between" align="center">
                            <Group>
                                {leftButtons.map((button: any) => (
                                    !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size={mobile ? "1.5rem" : "2.5rem"}>{button.buttonIcon}</ActionIcon>
                                ))}
                                    <Text fz="1rem" fw="900" hidden={isVertical || mobile}>{timeLeft}</Text>
                                    <Text fz="1rem" fw="900" hidden={isVertical || mobile}>/</Text>
                                    <Text fz="1rem" fw="900" hidden={isVertical || mobile} visibleFrom="sm">{videoDuration}</Text>
                            </Group>
                            <Group wrap="nowrap" justify="flex-end">
                                {isEmbed &&  <Anchor href={`/video/${video.id}`} w={{base: "5%", sm: "35%"}} target="_blank"><Image src={mobile ? "/logoWhite.svg" : "/titleLogo/titleLogoWhiteColoured.svg"} alt="Link to video" /></Anchor>}
                                {rightButtons.map((button: any) => (
                                    !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size={mobile ? "1.5rem" : "2.5rem"}>{button.buttonIcon}</ActionIcon>
                                ))}
                            </Group>
                        </Flex>
                    </Box>

                    <Box pos="absolute" color="white" hidden={hide || isHorizontal && !mobile}
                        p="0.5rem 1rem" 
                        style={{borderRadius: "var(--mantine-radius-md)", backdropFilter: "blur(3rem)", zIndex: 100}} 
                        id="videoControlsMobile"
                        top="calc(50% - 1rem)"
                        bg="var(--darkPurpleRGBA)"
                    >
                        {leftButtons.map((button: any) => (
                            !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                        ))}
                        {isHorizontal && rightButtons.map((button: any) => (
                            !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                        ))}
                    </Box> 

                    <Grid 
                        pos="absolute"
                        color="white" 
                        p={{base: "0.5vw 1rem", sm: "0rem 1rem"}}
                        style={{borderRadius: "var(--mantine-radius-md)", backdropFilter: "blur(3rem)", zIndex: 100, display: hide || isHorizontal ? "none" : "flex"}} 
                        id="videoControlsMobileHeader"
                        top="3vw"
                        left="3vw"
                        bg="var(--darkPurpleRGBA)"
                        w="calc(100% - (3vw * 2))"
                        // w={{base: "calc(100% - (14vw * 2))", sm: "calc(100% - (26vw * 2))", lg: "calc(100% - (36vw * 2))"}}
                        align="center"
                    >
                        <Grid.Col span={{base: 6, md: 8}}>
                            <Group gap="0.5rem">
                                <Text fz="1rem" fw="900" visibleFrom="md">{timeLeft}</Text>
                                <Text fz="1rem" fw="300" visibleFrom="md">|</Text>
                                <Tooltip label={video.title}>
                                    <Title order={2} fz="1rem" fw="300" lineClamp={1} w={{base: "100%", md: "60%"}} style={{whiteSpace: "nowrap"}}>{video.title} </Title>
                                </Tooltip>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{base: 6, md: 4}} style={{whiteSpace: "nowrap"}}>
                            <Group justify="flex-end" gap="0" wrap="nowrap">
                                {rightButtons.map((button: any) => (
                                    !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                                ))}
                                {topButtons.map((button: any) => (
                                    !button.hidden && <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                                ))}
                            </Group>
                        </Grid.Col>
                    </Grid> 
                </Stack> 
            </Stack>
            {!isEmbed || !isVertical &&
                <Box p={{base: "1rem", sm: "1rem 5rem"}}>
                    <FullDescription video={video} mdxSource={mdxSource} />
                </Box>
            }
            <Drawer size="full" opened={openedShare} onClose={closeShare} title={`Share Video: "${video.title}"`} 
                overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
                }}
                zIndex={100000}
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
                        hidden={!user && isAdmin}
                    /> */}
            </Drawer>
            <Drawer size="full" opened={openedChapter} onClose={closeChapter} title={`Video Chapters: "${video.title}"`} 
                overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
                }}
                offset="2rem"
                radius="0 0 0 2rem"
                position="top"
                zIndex={100000}
                styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            >
                <Stack w="100%" p="2rem 2rem">
                    <Title order={3} ta="center" fz="1.8rem" fw="500" c="white" mb="1rem">Chapters</Title>
                    {video.chapters.length > 0 && video.chapters.map((chapter:any, index: number) => (<Button 
                        key={index}
                        onClick={changeChapter}
                        value={chapter.timeCode} 
                        className={classes.chaptersButton}
                        color="var(--blackRGBA)" 
                        c="white"
                        p="1.5rem 1rem" 
                        radius="md" 
                        fz="0rem"
                        fw="500"
                        ta="left"
                        justify="flex-start"
                        leftSection={<Text fw="300" fz="1rem"ml="0.5rem">{chapter.timeCode} </Text>}
                        rightSection={<Text fw="300" ff="heading" fz="1.2rem">{chapter.title}</Text>}
                    >|</Button> ))}
                </Stack>
            </Drawer>
            <Drawer size="full" opened={openedInfo} onClose={closeInfo}
                overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
                }}
                offset="2rem"
                radius="0 0 0 2rem"
                position="top"
                zIndex={100000}
                styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            >
                <FullDescription video={video} mdxSource={mdxSource} />
            </Drawer>
        </Box>
    </>)
}
