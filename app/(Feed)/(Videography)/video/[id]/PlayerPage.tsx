'use client'

import { Link, Accordion, AccordionButton, AccordionItem, AccordionPanel, AspectRatio, Box, Button, Divider, Grid, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Tag, Text, useDisclosure, TagLabel, Avatar, Tabs, TabList, Tab, TabPanels, TabPanel, useClipboard, Icon, Alert, AlertDescription } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton"
import PostContent from "@/app/post/(Components)/PostContent"
import DisplayDate from "@/lib/DisplayDate"
import FullDescription from "./FullDescription"
import { useUser } from "@clerk/nextjs"
import { BsChevronDown, BsPlay, BsPause, BsSkipForward, BsSkipBackward, BsVolumeOff, BsVolumeMute, BsArrowsAngleExpand, BsArrowsAngleContract, BsShare, BsFullscreen, BsFullscreenExit, BsAspectRatio, BsBoxArrowUp, BsHourglass, BsCameraReels, BsFilm, BsCollectionPlay, BsTags, BsTag, BsPersonBoundingBox, BsArrowUpRightSquare, BsBoxArrowUpRight, BsArrowLeft } from "react-icons/bs"

export default function PlayerPage({ videoData, mdxSource }: any) {
   const video = videoData
    const {user} = useUser()
   
   const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter() as any
    
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(false)
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [isFullscreenMode, setIsFullscreenMode] = useState(false)
    const [videoProgress, setVideoProgress] = useState(0)
    const [theVideoElement, setVideoElement] = useState() as any
    const [timeLeft, setTimeLeft] = useState("0:00") as any
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

            const timeLeftTextString = `${timeLeftHours >= 1 ? `${timeLeftHours}:` : ""}${timeLeftMinutes < 10 ? `0${timeLeftMinutes}` : timeLeftMinutes}:${timeLeftSeconds < 10 ? `0${timeLeftSeconds}` : timeLeftSeconds}` as string
        
            const timePercent = Math.floor((theCurrentTime / e.target.duration) * 100)
            setVideoProgress(timePercent)
            setTimeLeft(timeLeftTextString)
            setCurrentVideoTime(timeCurrentTextString)
        })

        theVideoElement?.addEventListener("mouseover", () => {setHide(false)})
        theVideoElement?.addEventListener("mouseout", () => {
            !theVideoElement.paused || theVideoElement.currentTIme < 0 ? (setHide(true)) : (setHide(false))
        })

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
            }
        })
        theVideoElement?.addEventListener("pause", () => {
            if (playing != false) {
                setPlaying(true)
            }
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
            buttonIcon: BsSkipBackward,
            buttonID: "skipBackButton",
            buttonFunction: skipBack
        },
        {
            buttonIcon: playing == true ? BsPlay : BsPause,
            buttonID: "playButton",
            buttonFunction: playClick
        },
        {
            buttonIcon: BsSkipForward,
            buttonID: "skipAheadButton",
            buttonFunction: skipAhead
        },
    ] as any
    
    const rightButtons = [
        {
            buttonIcon: muted == false ? BsVolumeOff : BsVolumeMute,
            buttonID: "muteButton",
            buttonFunction: videoMute
        },
         {
            buttonIcon: BsAspectRatio,
            buttonID: "theaterModeButton",
            buttonFunction: isTheaterMode == false ? theaterMode : exitTheaterMode,
            hidden: video.videoType != "Vertical" ? false : true,
        },
        {
            buttonIcon: isFullscreenMode == false ? BsFullscreen : BsFullscreenExit,
            buttonID: "fullscreenButton",
            buttonFunction: isFullscreenMode == false ? fullscreenMode : exitFullscreenMode,
            hidden: video.videoType != "Vertical" ? false : true,
        },
        {
            buttonIcon: BsBoxArrowUp,
            buttonID: "shareButton",
            buttonFunction: shareVideo
        },
    ] as any

    return (<>
        <Box background="blurredPurple" w="100vw" h="100vh" position={isFullscreenMode ? "fixed" : "absolute"} top="0" left="0" zIndex="banner" boxShadow="bsSecondary" color="white" overflowY={isFullscreenMode ? "hidden" : "auto"}>
            <Box hidden={hide || isFullscreenMode || isTheaterMode}><HomeButton icon={BsArrowLeft} link="/feed/videography" helperText="Go Back to Video Feed" /></Box>
            <Grid
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
             >
                <Stack w="100%" background={isFullscreenMode ? "black" : "subtleBlurredBackground"} backdropBlur="60px" h="100%" alignItems="center" justifyContent="center" boxShadow="bsBoldWhite">
                    <Stack position="relative" w={{
                        base: video.videoType === "Vertical" ? "100vw" : isTheaterMode ? "95%" : isFullscreenMode ? "100%" : "95%",
                        sm: video.videoType === "Vertical" ? "75vw" : isTheaterMode ? "95%" : isFullscreenMode ? "100%" : "95%",
                        md: video.videoType === "Vertical" ? "90%" : isTheaterMode ? "95%" : isFullscreenMode ? "100%" : "95%",
                        lg: video.videoType === "Vertical" ? "73%" : isTheaterMode ? "95%" : isFullscreenMode ? "100%" : "95%",
                        xl: video.videoType === "Vertical" ? "55%" : isTheaterMode ? "95%" : isFullscreenMode ? "100%" : "95%",
                        "2xl": video.videoType === "Vertical" ? "42%" : isTheaterMode ? "92%" : isFullscreenMode ? "100%" : "95%",
                    }} p={isFullscreenMode ? "0" : "1rem"}>
                        <Stack hidden={hide} direction="row" position="absolute" zIndex="overlay" background={isFullscreenMode ? "none" : "blurredPurple"} backdropFilter="blur(3rem)" color="white" p="1rem" borderRadius="0 1rem" pointerEvents="none" gap="0.5rem" alignItems="center"
                            top={isFullscreenMode 
                                ? "-5.3%" 
                                : "3.5%"
                            }
                            left={{
                                base: video.videoType === "Vertical" ? "5%" : "0",
                                md: video.videoType === "Vertical" ? "5%" : "2%"
                            }}
                        >
                            <Text fontSize="1rem" fontWeight="900">{timeLeft}</Text>
                            <Text fontSize="1rem" fontWeight="900">|</Text>
                            <Heading as="h2" textAlign="center" fontSize="1rem" fontWeight="300" overflowX="scroll" wordBreak="keep-all" whiteSpace="nowrap">{video.title}</Heading>
                        </Stack>
                        <AspectRatio 
                            ratio={video.videoType === "Vertical" ? 9/16: 16/9} 
                            w="100%"
                            // m={{ base: "0 -4rem", xl: "0"}}
                            overflow="hidden"
                            zIndex="banner"
                            bg="mainGradient"
                            borderRadius={isFullscreenMode ? "0" : "0.5rem"}
                            boxShadow="bsBoldWhite"
                        >
                            <video src={video.videoFileID.filePath} poster={video.thumbnailFileID.filePath} id="videoElement" />
                        </AspectRatio>

                        <Grid gridTemplateColumns="20% 60% 20%" color="white" w={{base: "85%", lg: "90%"}} p="0.5rem 1rem" alignItems="center" borderRadius="0 1rem" justifyContent="space-between" backdropFilter="blur(3rem)" zIndex="banner" id="videoControls"
                            position="absolute" 
                            bottom="calc(1.5% + (0.5rem * 2))"
                            left={{base: "7%", lg: "5%"}}
                            background="blurredPurple"
                            hidden={hide}
                            // top="82%" left="5%"
                        >
                            <Stack direction="row" gap={{base: "0.5rem", xl: "1rem"}}>
                                {leftButtons.map((button: any) => (<>
                                <Icon fontSize={{base: "1.2rem", xl: "1.8rem"}} p="0.2rem" _hover={{color: "secondary"}} onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} as={button.buttonIcon} />
                                    {/* <Button key={button.index} variant="unstyled" _hover={{color: "secondary"}} onClick={button.buttonFunction} size="xs" width="15%" h="auto" p="0.1rem">
                                        <Icon w="100%" h="100%">
                                            <FontAwesomeIcon icon={['fal', button.buttonIcon]} width="100%" color="currentColor" id="skipBackButton" />
                                        </Icon>
                                    </Button> */}
                                </>))}
                            </Stack>

                            <Slider aria-label='scrubber' value={videoProgress} width={{base: "70%", md: "50%", lg: "70%", xl: "100%"}} onChange={seekVideo} mx="auto">
                                <SliderTrack bg='secondary'>
                                    <SliderFilledTrack bg='primary' />
                                </SliderTrack>
                                <SliderThumb boxSize={6} color="white">
                                    {/* <IconButton color='primary' variant="unstyled" icon={<BsHourglass />} aria-label={"Time Icon"} /> */}
                                    <Box color="primary"><BsHourglass /></Box>
                                </SliderThumb>
                            </Slider>

                            <Stack direction="row" gap={{base: "0.5rem", xl: "1rem"}} justifyContent="flex-end">
                                {rightButtons.map((button: any) => (<>
                                <Icon fontSize={{base: "1.2rem", xl: "1.8rem"}} p="0.2rem" _hover={{color: "secondary"}} onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID}  as={button.buttonIcon} />
                                    {/* <FontAwesomeIcon icon={['fal', button.buttonIcon]} width="100%" color="currentColor" />
                                </Icon> */}
                                    {/* <Button key={button.index} variant="unstyled" _hover={{color: "secondary"}} onClick={button.buttonFunction} size="xs" width="15%" h="auto" p="0.1rem">
                                        <Icon w="100%" h="100%">
                                            <FontAwesomeIcon icon={['fal', button.buttonIcon]} width="100%" color="currentColor" id="skipBackButton" />
                                        </Icon>
                                    </Button> */}
                                </>))}
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
                                        <Text>Feature Coming Soon!</Text>
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
                                                hidden={!user}
                                            />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </Grid>
                    </Stack>
                </Stack>
                <Stack w="calc(100% - (1rem * 2))" hidden={isTheaterMode || isFullscreenMode}>
                    <Heading as="h2" textAlign="center" fontSize="2rem" fontWeight="900" color="white" my="0.5rem" overflowX="scroll" wordBreak="keep-all" whiteSpace="nowrap">{video.title}</Heading>
                    <Tabs variant="subtle" isFitted color="white" defaultIndex={video.chapters ? 0 : 1}>
                        <TabList display="flex" justifyContent="center">
                            <Tab hidden={!video.chapters}>Chapters</Tab>
                            <Tab>Description</Tab>
                        </TabList>
                        <TabPanels overflowY="scroll" overflowX="hidden" height="84vh">
                            <TabPanel hidden={!video.chapters}>
                                <Stack w="100%" p="2rem 2rem" boxShadow="bsBoldWhite" height="100%" borderRadius="0 2rem">
                                    <Heading as="h2" textAlign="center" fontSize="1.8rem" fontWeight="900" color="white" mb="1rem">Chapters</Heading>
                                    {/* {video.chapters && video.chapters.map((chapter:any, index: number) => (
                                        <Button key={index} fontSize="1.2rem" color="white" variant="unstyled" overflowX="scroll" onClick={changeChapter} value={chapter.timeCode} textAlign="left" _hover={{textDecoration: "underline", textDecorationColor: "secondary", fontWeight: "900"}}>{chapter.timeCode}: {chapter.title}</Button>
                                    ))} */}
                                    {video.chapters && video.chapters.map((chapter:any, index: number) => (<>
                                        <Button 
                                            key={index}
                                            onClick={changeChapter}
                                            value={chapter.timeCode} 
                                            my="0.2rem" 
                                            variant="unstyled"
                                            overflowX="scroll" 
                                            overflowY="hidden"
                                            background="blackRGBA" 
                                            _hover={{background: "blurredPurpleRGBA"}} 
                                            backdropFilter="blur(3rem)" 
                                            color="white" 
                                            p="1.8rem 1rem" 
                                            borderRadius="0 1rem" 
                                            fontSize="1rem"
                                            fontWeight="900"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap="0.5rem"
                                            _before={{
                                                content: `'${chapter.timeCode}'`
                                            }}
                                            _after={{
                                                content: `'${chapter.title}'`,
                                                fontFamily: 'heading',
                                                fontWeight: 300
                                            }}
                                        >|</Button>
                                    </>))}
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Stack>
                                    <Box boxShadow="bsBoldPrimary" borderRadius="0 2rem" p="2rem" mb="1rem">
                                        <PostContent mdxSource={mdxSource} />
                                    </Box>
                                    <FullDescription mdxSource={mdxSource} videoTitle={video.title} />
                                    <Accordion allowToggle w="100%" textDecoration="none" whiteSpace="break-spaces" wordBreak="break-word">
                                        <AccordionItem border="none" w="100%">
                                            <AccordionButton bg="primary" color="white" borderRadius="0 1.5rem" p="1.5rem 3rem" fontSize="1.2rem" fontWeight="600" fontFamily="body" _hover={{bg: "none", color: "primary"}} outline="none" _expanded={{bg: "primary", color: "white"}}>
                                                <Box flex='1' textAlign='left'>Video Information</Box>
                                                <BsChevronDown />
                                                {/* <Box color="white" width="2%">
                                                    <FontAwesomeIcon icon={['fas', 'chevron-down']} width="100%" color="currentColor"/>
                                                </Box> */}
                                            </AccordionButton>
                                            <AccordionPanel >
                                                <Stack color="white" p="0rem">
                                                <Heading as="h2" textAlign="center" fontSize="1.8rem" fontWeight="900" color="white" my="1rem" fontFamily="body">Video Information</Heading>
                                                
                                                <Heading as="h3" fontSize="1.8rem" fontWeight="700" color="white" textDecoration="underline" fontFamily="body">Uploaded On</Heading>
                                                    <Box as="section" id="category" pl="1rem">
                                                        <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" my="1rem">
                                                            {/* <FontAwesomeIcon icon={["fas", "camera-movie"]} color="currentColor" height="40%" /> */}
                                                            <BsCameraReels />
                                                            <TagLabel pl="0.5rem"><DisplayDate source={video.uploadedOn} format="dddd, MMMM Do YYYY [at] h:mm a" /></TagLabel>
                                                        </Tag>
                                                    </Box>
                                                
                                                <Heading as="h3" fontSize="1.8rem" fontWeight="700" color="white" textDecoration="underline" fontFamily="body">Category</Heading>
                                                    <Box as="section" id="category" pl="1rem">
                                                        {/* <Link href={`/C/${video.category.catName}`} variant="unstyled"> */}
                                                            <Tag size='lg' colorScheme='purple' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" my="1rem">
                                                            {/* <FontAwesomeIcon icon={["fas", "album-collection"]} color="currentColor" height="40%" /> */}
                                                            <BsCollectionPlay />
                                                            <TagLabel pl="0.5rem">{video.category.catName}</TagLabel>
                                                        </Tag>
                                                        {/* </Link> */}
                                                    </Box>
                                                <Heading as="h3" fontSize="1.8rem" fontWeight="700" color="white" textDecoration="underline" fontFamily="body">Tags</Heading>
                                                    <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem" m="1rem 1rem 0">
                                                        <BsTags />
                                                        {/* <Box mr="0.3rem" color="secondary">
                                                            <FontAwesomeIcon icon={["fas", "tags"]} color="currentColor" height="40%" />
                                                        </Box> */}
                                                        {video.tags && video.tags.map((tag: any, index: number) => (
                                                            <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={index} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                                                {/* <FontAwesomeIcon icon={["fas", "tag"]} color="currentColor" height="40%" /> */}
                                                                <BsTag />
                                                                <TagLabel pl="0.5rem">{tag}</TagLabel>
                                                            </Tag>
                                                        ))}
                                                    </Stack>
                                                {video.starring && video.starring.length > 0 && (<><Heading as="h3" fontSize="1.8rem" fontWeight="700" color="white" textDecoration="underline" fontFamily="body">Starring</Heading>
                                                    <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem" m="1rem 1rem 0">
                                                        {/* <Box mr="0.3rem" color="secondary">
                                                            <FontAwesomeIcon icon={["fas", "face-grin-stars"]} color="currentColor" height="40%" />
                                                        </Box> */}
                                                        <BsPersonBoundingBox />
                                                        {video.starring && video.starring.map((star: any, index: number) => (
                                                            star.link ? <Link href={star.link} isExternal>
                                                                <Tag size='lg' colorScheme='purple' borderRadius='0 1rem' p="1rem" key={index} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                                                    <TagLabel pl="0.5rem">
                                                                        <Avatar
                                                                            src=''
                                                                            size='xs'
                                                                            name={star.displayName}
                                                                            ml={-1}
                                                                            mr={2}
                                                                        />
                                                                        {star.displayName}
                                                                    </TagLabel>
                                                                </Tag>
                                                            </Link> : <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={index} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                                            <TagLabel pl="0.5rem">
                                                                <Avatar
                                                                    src=''
                                                                    size='xs'
                                                                    name={star.displayName}
                                                                    ml={-1}
                                                                    mr={2}
                                                                />
                                                                {star.displayName}
                                                            </TagLabel>
                                                        </Tag>
                                                        ))}
                                                    </Stack>
                                                </>)}
                                                
                                                {video.musicCredits && video.musicCredits.length > 0 && (<><Heading as="h3" fontSize="1.8rem" fontWeight="700" color="white" textDecoration="underline" my="1rem" fontFamily="body">Music Credits</Heading>
                                                    <Stack gap="1.5rem" mb="0.5rem">
                                                        {video.musicCredits && video.musicCredits.map((mCredit: any, index: number) => (
                                                            mCredit.title && (
                                                                <Stack key={index}>
                                                                    <AspectRatio
                                                                        ratio={1 / 1}
                                                                        boxShadow="bsBoldWhite"
                                                                        borderRadius="0 2rem"
                                                                        overflow="scroll"
                                                                        maxH="100%"
                                                                    >
                                                                        <Stack justifyContent="flex-start !Important" alignItems="flex-start !Important" p="1.5rem">
                                                                            <Heading as="h3">{mCredit.title}</Heading>
                                                                            {mCredit.artist && (<Text fontWeight={300} pb="1rem">By: {mCredit.artist}</Text>)}
                                                                            {mCredit.link && (<Divider borderColor="primary" />)}
                                                                            {mCredit.link && <Link key={index} href={mCredit.link} isExternal variant="unstyled" p="0" m="0.5rem auto"><Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={index} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" _hover={{background:"none"}}>
                                                                                <BsBoxArrowUpRight />
                                                                                {/* <FontAwesomeIcon icon={["fas", "arrow-up-right-from-square"]} color="currentColor" height="40%" /> */}
                                                                                <TagLabel pl="0.5rem">View Song</TagLabel>
                                                                            </Tag></Link>
                                                                            }
                                                                            {mCredit.link && (<Divider borderColor="primary" />)}
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
                                                        <Heading key={index} as="h3" fontSize="1.8rem" fontWeight="700" color="white" textDecoration="underline" fontFamily="body">{vCredit.title}</Heading>
                                                        <Text p="1rem" fontSize="1.2rem">{vCredit.value}</Text>
                                                    </>
                                                ))}
                                                </Stack>
                                            </AccordionPanel>
                                        </ AccordionItem>
                                    </Accordion>
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </Grid>
        </Box>
    </>)
}
