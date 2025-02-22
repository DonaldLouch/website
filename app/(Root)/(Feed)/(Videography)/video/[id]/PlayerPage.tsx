'use client'

import { Anchor, AspectRatio, Box, Button, Title, Slider, Stack, Text, Image, ActionIcon, Group, Tooltip, Drawer, CopyButton, Flex, useMantineTheme, Paper, Grid } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import FullDescription from "./FullDescription"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import HugeIcon from "@/app/(Components)/HugeIcon"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"

export default function PlayerPage({ videoData, mdxSource, playerType, isAdmin }: any) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const video = videoData;
    const isPublic = ["Public", "Unlisted"].includes(video.videoPrivacy);

    const [openedShare, { open: openShare, close: closeShare }] = useDisclosure(false);
    const [openedChapter, { open: openChapter, close: closeChapter }] = useDisclosure(false);
    const [openedInfo, { open: openInfo, close: closeInfo }] = useDisclosure(false);

    const router = useRouter();

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [isFullscreenMode, setIsFullscreenMode] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [theVideoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const [timeLeft, setTimeLeft] = useState("0:00");
    const [videoDuration, setVideoDuration] = useState("0:00");
    const [videoDurationNUMBER, setVideoDurationNUMBER] = useState(0);
    const [currentVideoTime, setCurrentVideoTime] = useState("0:00");
    const [hide, setHide] = useState(false);

    const isVertical = video.videoType === "Vertical";
    const isHorizontal = video.videoType === "Horizontal";
    const isEmbed = playerType === "embed";
    const isPage = playerType === "page";

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const videoElement = document.querySelector("#videoElement") as HTMLVideoElement;
        setVideoElement(videoElement);
    }, []);

    useEffect(() => {
        if (!theVideoElement) return;

        const handleTimeUpdate = (e: any) => {
            const currentTime = e.target.currentTime;
            const duration = e.target.duration;

            const formatTime = (time: number) => {
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time % 3600) / 60);
                const seconds = Math.floor(time % 60);
                return `${hours > 0 ? `${hours}:` : ""}${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
            };

            setVideoProgress(Math.floor((currentTime / duration) * 100));
            setTimeLeft(formatTime(duration - currentTime));
            setCurrentVideoTime(formatTime(currentTime));
            setVideoDuration(formatTime(duration));
            setVideoDurationNUMBER(duration);
        };

        theVideoElement.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            theVideoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [theVideoElement]);

    useEffect(() => {
        if (!theVideoElement) return;

        const controlsDesktop = document.querySelector('#videoControlsDesktop');
        const controlsDesktopHeader = document.querySelector('#videoControlsDesktopHeader');
        const controlsMobile = document.querySelector('#videoControlsMobile');

        const handleHide = () => setHide(false);
        const handleShow = () => setHide(true);

        const handlePlay = () => {
            setPlaying(true);
        };

        const handlePause = () => {
            setPlaying(false);
        };

         const handleMouseOut = () => {
            if (theVideoElement.paused || theVideoElement.currentTime < 0) {
                setHide(false);
            } else {
                sleep(3000).then(() => setHide(true));
            }
        };

        const handleTouchStart = () => {
            setHide(false);
            if (!theVideoElement.paused) {
                setTimeout(() => {
                    if (!theVideoElement.paused) {
                        sleep(3000).then(() => setHide(true));
                    }
                }, 3000);
            }
        };

        theVideoElement?.addEventListener("touchstart", handleTouchStart);
        theVideoElement?.addEventListener("mouseover", handleHide);
        theVideoElement?.addEventListener("mouseout", handleMouseOut);

        controlsDesktop?.addEventListener("mouseover", handleHide);
        controlsDesktop?.addEventListener("mouseout", handleMouseOut);

        controlsDesktopHeader?.addEventListener("mouseover", handleHide);
        controlsDesktopHeader?.addEventListener("mouseout", handleMouseOut);

        controlsMobile?.addEventListener("mouseover", handleHide);
        controlsMobile?.addEventListener("mouseout", handleMouseOut);

        theVideoElement.addEventListener("play", handlePlay);
        theVideoElement.addEventListener("pause", handlePause);

        return () => {
            theVideoElement.removeEventListener("play", handlePlay);
            theVideoElement.removeEventListener("pause", handlePause);

            theVideoElement?.removeEventListener("touchstart", handleTouchStart);
            theVideoElement?.removeEventListener("mouseover", handleHide);
            theVideoElement?.removeEventListener("mouseout", handleMouseOut);

            controlsDesktop?.removeEventListener("mouseover", handleHide);
            controlsDesktop?.removeEventListener("mouseout", handleMouseOut);

            controlsDesktopHeader?.removeEventListener("mouseover", handleHide);
            controlsDesktopHeader?.removeEventListener("mouseout", handleMouseOut);

            controlsMobile?.removeEventListener("mouseover", handleHide);
            controlsMobile?.removeEventListener("mouseout", handleMouseOut);
        };
    }, [theVideoElement]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreenMode(Boolean(document.fullscreenElement));
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const skipBack = () => {
        if (theVideoElement) theVideoElement.currentTime -= 10;
    };

    const playClick = () => {
        if (theVideoElement) {
            if (theVideoElement.paused) {
                theVideoElement.play();
            } else {
                theVideoElement.pause();
            }
        }
    };

    const skipAhead = () => {
        if (theVideoElement) theVideoElement.currentTime += 10;
    };

    const videoMute = () => {
        if (theVideoElement) {
            theVideoElement.muted = !theVideoElement.muted;
            setMuted(theVideoElement.muted);
        }
    };

    const fullscreenMode = () => {
        document.body.requestFullscreen();
        setIsFullscreenMode(true);
    };

    const exitFullscreenMode = () => {
        document.exitFullscreen();
        setIsFullscreenMode(false);
    };

    const seekVideo = (e: any) => {
        if (theVideoElement) {
            const seekTo = theVideoElement.duration * (e / 100);
            theVideoElement.currentTime = seekTo;
        }
    };

    const shareModal = openShare;
    const chapterModal = openChapter;
    const infoModal = openInfo;

    const changeChapter = (e: any) => {
        const chapterTimeCode = e.target.value;
        const [hours, minutes, seconds] = chapterTimeCode.split(':').map(Number);
        const chapterTime = (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
        if (theVideoElement) theVideoElement.currentTime = chapterTime;
    };

    const backToFeed = () => {
        router.push("/feed/videography");
    };

    const leftButtons = [
        { buttonIcon: <HugeIcon name="go-backward-10-sec" />, buttonID: "skipBackButton", buttonFunction: skipBack },
        { buttonIcon: playing ? <HugeIcon name="pause" /> : <HugeIcon name="play" />, buttonID: "playButton", buttonFunction: playClick },
        { buttonIcon: <HugeIcon name="go-forward-10-sec" />, buttonID: "skipAheadButton", buttonFunction: skipAhead },
    ];

    const rightButtons = [
        { buttonIcon: muted ? <HugeIcon name="volume-off" /> : <HugeIcon name="volume-mute-01" />, buttonID: "muteButton", buttonFunction: videoMute },
        { buttonIcon: isFullscreenMode ? <HugeIcon name="arrow-shrink-01" /> : <HugeIcon name="arrow-expand-01" />, buttonID: "fullscreenButton", buttonFunction: isFullscreenMode ? exitFullscreenMode : fullscreenMode, hidden: isVertical },
        { buttonIcon: <HugeIcon name="share-05" />, buttonID: "shareButton", buttonFunction: shareModal },
    ];

    const topButtons = [
        { buttonIcon: <HugeIcon name="bookmark-01" />, buttonID: "chapters", buttonFunction: chapterModal, hidden: !(video.chapters && video.chapters.length > 0) },
        { buttonIcon: <HugeIcon name="information-circle" />, buttonID: "description", buttonFunction: infoModal },
        { buttonIcon: <HugeIcon name="home-01" />, buttonID: "backToFeed", buttonFunction: backToFeed, hidden: !isVertical },
    ];

    return (<>
        <Box
            mt="-5.5rem"
            mx={{base: "-1rem", lg: "-5rem"}}
            mb="-md"
        >
            {!isPublic && !isAdmin ? <Paper p="10rem 2rem" color="white" bg="none" shadow="bsBoldSecondary" radius="lg">
                <Stack align="center">
                <Group gap="2rem" align="center">
                    <HugeIcon name="alert-02" size="4rem" color="red" />
                    <Title order={1} fz={{base: "2rem", md: "3rem"}}>Private Video</Title>
                </Group>
                <Text>🚨 This video is listed as a private video and is not viewable
                  to the public. 🚨</Text>
                  <PrimaryLinkedButton link="/feed/videography" icon={<HugeIcon name="arrow-left-02" />}>Go Back To The Video Feed</PrimaryLinkedButton>
                </Stack>
            </Paper> : <>
                <Stack
                    style={{ 
                        backdropBlur: "60px", 
                        boxShadow: "var(--mantine-shadow-bsBoldWhite)",
                        overflowX: "hidden", overflowY: isEmbed ? "hidden" : "auto",
                        zIndex: isFullscreenMode || isVertical ? 90000 : "auto"
                    }}
                    bg={isFullscreenMode || isVertical ? "black" : "var(--blackRGBA)"}
                    h={isFullscreenMode || isEmbed ? "100vh" : "auto"}
                    w="100vw"
                    p={isFullscreenMode || isEmbed ? "0" : isVertical ? {base: "0", sm: "0 0 2rem", md: "2rem 0"} : "2rem"}
                    justify="center" align="center"
                    gap="0"
                    pt={isVertical ? "0rem" : isPage ? "6rem" : "initial"}
                    pos={isFullscreenMode ? "fixed" : isVertical ? "relative" : "initial"}
                > 
                    <Stack 
                        justify="center" align="center" 
                        pos="relative"
                        style={{zIndex: 90000}}
                        gap="0"
                    >
                        <AspectRatio 
                            ratio={isVertical ? 9 / 16 : 16 / 9}
                            w={isVertical ? "auto" : "100%"}
                            h={isVertical ? { base: "100vh", sm: "calc(100vmin - 4rem)" } : "auto"}
                            mt={isVertical ? { base: "0", sm: "2rem" } : "0"}
                            style={{
                                borderRadius: isFullscreenMode ? "0" : "0.5rem",
                                boxShadow: "var(--mantine-shadow-bsBoldWhite)",
                                overflow: "hidden"
                            }}
                        >
                            <video 
                                src={video.videoFileID.filePath} 
                                poster={video.thumbnailFileID.filePath} 
                                playsInline={!isFullscreenMode} 
                                id="videoElement"
                            />
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
                            align="center"
                        >
                            <Grid.Col span={{base: 6, md: 8}}>
                                <Group gap="0.5rem">
                                    <Text fz="1rem" fw="900" visibleFrom="md">{timeLeft}</Text>
                                    <Text fz="1rem" fw="300" visibleFrom="md">|</Text>
                                    <Tooltip label={video.title}>
                                        <Title order={2} fz="1rem" fw="300" lineClamp={1} w={{base: "100%", md: video.chapters && video.chapters.length > 0  ? "50%" : "60%"}} style={{whiteSpace: "nowrap"}}>{video.title} </Title>
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
                {!isEmbed && isHorizontal &&
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
                                    {!copied && <HugeIcon name="copy-01" />}
                                    <Text>{copied ? `Link Copied: ${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}` :`${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}`} </Text>
                                </Group>
                            )}
                        </CopyButton>


                    <Text fw="600" mt="2rem">Share via Embed</Text>
                    <Text>Feature Coming Soon!</Text>
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
                        {video.chapters && video.chapters.length > 0 && video.chapters.map((chapter:any, index: number) => (<Button 
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
            </>}
        </Box>
    </>)
}
