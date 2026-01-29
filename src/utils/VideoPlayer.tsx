import { useState, useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function useVideoPlayer({ videoData }: { videoData: any }) {
    const navigate = useNavigate()

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [isFullscreenMode, setIsFullscreenMode] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [theVideoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const [timeLeft, setTimeLeft] = useState("0:00");
    const [videoDuration, setVideoDuration] = useState("0:00");
    const [hide, setHide] = useState(false);

    const isVertical = videoData.videoType === "Vertical"

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
            setVideoDuration(formatTime(duration));
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
        // const handleShow = () => setHide(true);

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
    }, [])

    const skipBack = () => {
        if (theVideoElement) theVideoElement.currentTime -= 10;
    }

    const playClick = () => {
        if (theVideoElement) {
            if (theVideoElement.paused) {
                theVideoElement.play();
            } else {
                theVideoElement.pause();
            }
        }
    }

    const skipAhead = () => {
        if (theVideoElement) theVideoElement.currentTime += 10;
    }

    const videoMute = () => {
        if (theVideoElement) {
            theVideoElement.muted = !theVideoElement.muted;
            setMuted(theVideoElement.muted);
        }
    }

    const fullscreenMode = () => {
        document.body.requestFullscreen();
        setIsFullscreenMode(true);
    }

    const exitFullscreenMode = () => {
        document.exitFullscreen();
        setIsFullscreenMode(false);
    }

    const seekVideo = (e: any) => {
        if (theVideoElement) {
            const seekTo = theVideoElement.duration * (e / 100);
            theVideoElement.currentTime = seekTo;
        }
    }

    const changeChapter = (e: any) => {
        const chapterTimeCode = e.target.value;
        const [hours, minutes, seconds] = chapterTimeCode.split(':').map(Number);
        const chapterTime = (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
        if (theVideoElement) theVideoElement.currentTime = chapterTime;
    }

    const backToFeed = () => {
        navigate({ to: "/feed/videography" })
    }

    const leftButtons = [
        { buttonIcon: <FontAwesomeIcon icon={["fal", "arrow-rotate-left"]} />, buttonID: "skipBackButton", buttonFunction: skipBack },
        { buttonIcon: playing ? <FontAwesomeIcon icon={["fajdr", "pause"]} /> : <FontAwesomeIcon icon={["fajdr", "play"]} />, buttonID: "playButton", buttonFunction: playClick },
        { buttonIcon: <FontAwesomeIcon icon={["fal", "arrow-rotate-right"]} />, buttonID: "skipAheadButton", buttonFunction: skipAhead },
    ]

    const rightButtons = [
        { buttonIcon: muted ? <FontAwesomeIcon icon={["fajdr", "volume-off"]} /> : <FontAwesomeIcon icon={["fajdr", "volume-slash"]} />, buttonID: "muteButton", buttonFunction: videoMute },
        { buttonIcon: isFullscreenMode ? <FontAwesomeIcon icon={["fadl", "down-left-and-up-right-to-center"]} /> : <FontAwesomeIcon icon={["fadl", "up-right-and-down-left-from-center"]} />, buttonID: "fullscreenButton", buttonFunction: isFullscreenMode ? exitFullscreenMode : fullscreenMode, hidden: isVertical },
    ]

    const topButtons = [
        { buttonIcon: <FontAwesomeIcon icon={["fajdr", "house"]} />, buttonID: "backToFeed", buttonFunction: backToFeed },
    ] as any

    return {
        // playing,
        // muted,
        isFullscreenMode,
        videoProgress,
        timeLeft,
        videoDuration,
        // currentVideoTime,
        hide,
        // skipBack,
        // playClick,
        // skipAhead,
        // videoMute,
        // fullscreenMode,
        // exitFullscreenMode,
        seekVideo,
        changeChapter,
        // backToFeed,
        leftButtons,
        rightButtons,
        topButtons,
        // shareModal,
        // chapterModal,
        // infoModal,
    }
}