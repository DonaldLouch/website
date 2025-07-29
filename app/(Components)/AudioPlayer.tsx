"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Box, Grid, Group, Image, Slider, Stack, Text, Title, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react"

export default function AudioPlayer({audioSrc, title, thumbnail}: {audioSrc: string, title: string, thumbnail: string}) {
    const [audioElement, setAudioElement] = useState() as any

    const [isReady, setIsReady] = useState<boolean>(false)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [timeLeft, setTimeLeft] = useState("0:00") as any
    const [timeDuration, setTimeDuration] = useState("0:00") as any
    const [currentVideoTime, setCurrentVideoTime] = useState("0:00") as any
    const [timeDurationNumber, setTimeDurationNumber] = useState(0) as any
    const [videoProgress, setVideoProgress] = useState(0)



    // const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const element = document.querySelector("#audioElement") as any
        element?.addEventListener("timeupdate", (e:any) => {
            const duration = e.target.duration
            const timeDurationHours = Math.floor(duration / 60 / 60) as number
            const timeDurationMinutes = Math.floor(duration / 60 - timeDurationHours * 60 ) as number
            const timeDurationTotal = Math.floor(duration / 60) as number
            const timeDurationSeconds = Math.floor(duration - timeDurationTotal * 60) as number
            const timeDurationTextString = `${timeDurationHours >= 1 ? `${timeDurationHours}:` : ""}${timeDurationMinutes < 10 ? `0${timeDurationMinutes}` : timeDurationMinutes}:${timeDurationSeconds < 10 ? `0${timeDurationSeconds}` : timeDurationSeconds}` as string
            
            setTimeDuration(timeDurationTextString)
            setTimeDurationNumber(e.target.duration) 
        })
        setAudioElement(element)
        setIsReady(element)
    }, [])

    // const onLoadedMetadata = () =>{
    //     const duration = audioRef.current?.duration
    //     const timeDurationHours = Math.floor(duration / 60 / 60) as number
    //     const timeDurationMinutes = Math.floor(duration / 60 - timeDurationHours * 60 ) as number
    //     const timeDurationTotal = Math.floor(duration / 60) as number
    //     const timeDurationSeconds = Math.floor(duration - timeDurationTotal * 60) as number
    //     const timeDurationTextString = `${timeDurationHours >= 1 ? `${timeDurationHours}:` : ""}${timeDurationMinutes < 10 ? `0${timeDurationMinutes}` : timeDurationMinutes}:${timeDurationSeconds < 10 ? `0${timeDurationSeconds}` : timeDurationSeconds}` as string

    //     setTimeDuration(timeDurationTextString)
    //     setTimeDurationNumber(duration)
    //     setIsReady(duration > 0 && true)
    // }

    useEffect(() => {
        isReady && audioElement?.addEventListener("timeupdate", (e:any) => {
            const theCurrentTime = e.target.currentTime
            const timeCurrentHours = Math.floor(theCurrentTime / 60 / 60) as number;
            const timeCurrentMinutes = Math.floor(theCurrentTime / 60 - timeCurrentHours * 60 ) as number;
            const timeCurrentTotal = Math.floor(theCurrentTime / 60) as number;
            const timeCurrentSeconds = Math.floor(theCurrentTime - timeCurrentTotal * 60) as number;
            const timeCurrentTextString = `${timeCurrentHours >= 1 ? `${timeCurrentHours}:` : ""}${timeCurrentMinutes < 10 ? `0${timeCurrentMinutes}` : timeCurrentMinutes}:${timeCurrentSeconds < 10 ? `0${timeCurrentSeconds}` : timeCurrentSeconds}` as string

            const duration = e.target.duration
            const timeCalc = duration - theCurrentTime
            const timeLeftHours = Math.floor(timeCalc / 60 / 60) as number
            const timeLeftMinutes = Math.floor(timeCalc / 60 - timeLeftHours * 60 ) as number
            const timeLeftTotal = Math.floor(timeCalc / 60) as number
            const timeLeftSeconds = Math.floor(timeCalc - timeLeftTotal * 60) as number
            
            const timeLeftTextString = `${timeLeftHours >= 1 ? `${timeLeftHours}:` : ""}${timeLeftMinutes < 10 ? `0${timeLeftMinutes}` : timeLeftMinutes}:${timeLeftSeconds < 10 ? `0${timeLeftSeconds}` : timeLeftSeconds}` as string

            const timePercent = Math.floor((theCurrentTime / duration) * 100)
            setVideoProgress(timePercent)

            setCurrentVideoTime(timeCurrentTextString)
            setTimeLeft(timeLeftTextString)
        })
        isReady && audioElement?.addEventListener("ended", () => {
            audioElement.currentTime = 0
            audioElement.play()
        })
    }, [audioElement])

    useEffect(() => {
        if (isReady && isPlaying) {
             audioElement.play()
        } else {
            audioElement?.pause()
        }
    }, [isPlaying,audioElement])


    const seekAudio = (e: any) => {
        const seekTo = timeDurationNumber * (e / 100)
        audioElement.currentTime = seekTo
    }

    function skipStart() {
        audioElement.currentTime= 0
    }
    function skipBack() {
        audioElement.currentTime -= 10
    }
    function skipAhead() {
        audioElement.currentTime += 10
    }
    function skipEnd() {
        audioElement.currentTime = isReady && timeDurationNumber
        // audioElement.play()
    }

    const controlButtons = [
        {
            buttonIcon: <FontAwesomeIcon icon={["fajr", "backward-step"]} size="lg" />,
            buttonID: "backToStart",
            buttonFunction: skipStart
        },
        {
            buttonIcon: <FontAwesomeIcon icon={["fajr", "backward"]} size="lg" />,
            buttonID: "rewind",
            buttonFunction: skipBack
        },
        {
            buttonIcon: isPlaying ?  <FontAwesomeIcon icon={["fajr", "pause"]} size="lg" /> : <FontAwesomeIcon icon={["fajr", "play"]} size="lg" />,
            buttonID: "playPause",
            buttonFunction: () => setIsPlaying((prev) => !prev)
        },
        {
            buttonIcon: <FontAwesomeIcon icon={["fajr", "forward"]} size="lg" />,
            buttonID: "fastForward",
            buttonFunction: skipAhead
        },
        {
            buttonIcon: <FontAwesomeIcon icon={["fajr", "forward-step"]} size="lg" />,
            buttonID: "backToEnd",
            buttonFunction: skipEnd
        },
    ]
    return <Box
        // pos="absolute"
        color="white" 
        // p={{base: "0.2rem 1rem", sm: "0rem 1rem"}}
        m="3rem 0"
        // style={{borderRadius: "0 0 0 1rem", backdropFilter: "blur(3rem)", zIndex: 100}} 
        style={{borderRadius: "0 1rem 0 0"}}
        id="audioControls"
        // bottom="1rem" 
        // left="7%"
        bg="var(--darkPurple)"
        // w="calc(100% - (7%*2))"
    >
        <audio 
            src={audioSrc} 
            // ref={audioRef}
            // onLoadedMetadata={onLoadedMetadata}
            id="audioElement"
        />
        <Grid>
            <Grid.Col span={{base: 4, md: 1.5}} m="0" p="0">
                <Image src={thumbnail} alt={title} radius="0 0 0 0.8rem" />
            </Grid.Col>
            <Grid.Col span={{base: 8, md: 10.5}} style={{borderRadius: "var(--mantine-radius-md)"}}>
                <Slider 
                    m="-0.5rem 0rem 0rem"
                    w="calc(100%)"
                    radius="0 1rem 0 0"
                    value={videoProgress} onChange={seekAudio} aria-label="scrubber"
                    label={null}
                />
                <Stack gap="0" m="0" p="0">
                    <Group id="audioControls" gap="0rem" m="0" p="0.5rem 0 0">
                        {controlButtons.map((button: any) => (
                            <ActionIcon onClick={button.buttonFunction} id={button.buttonID} key={button.buttonID} bg="none" style={{boxShadow: "none"}} size="2.5rem">{button.buttonIcon}</ActionIcon>
                        ))}
                    <Text fz="1rem" fw="900" pl="1rem">
                        <Box component="span" hiddenFrom="md">{timeLeft}</Box>
                        <Box component="span" visibleFrom="md">{currentVideoTime} / {timeDuration}</Box>
                    </Text>
                    </Group>
                    <Group gap="0.2rem" mt="-0.5rem" pl="0.5rem" mb="0" pb="0" style={{overflow: "scroll"}} maw="100%" wrap="nowrap">
                        <Tooltip label={title}>
                            <Title order={2} fz="1rem" fw="900" style={{whiteSpace: "nowrap"}} ff="text">{title}</Title>
                        </Tooltip>
                        <Text fz="1rem" fw="300" ff="monospace">-</Text>
                        <Title order={3} fz="1rem" fw="300" style={{whiteSpace: "nowrap"}} lh={1}>Donald Louch</Title>
                    </Group>
                </Stack>
            </Grid.Col>
        </Grid>
    </Box>
}
