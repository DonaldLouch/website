'use client'
import { Anchor, AspectRatio, Grid, Stack, Image, Text, Title, Group, Flex, Box } from "@mantine/core";

import classes from "@/app/(Components)/Components.module.css"
import DisplayDate from "@/lib/DisplayDate";
import { BsCameraReels, BsPlay, BsPlayFill } from "react-icons/bs";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { CameraVideoIcon, PlayIcon } from "@hugeicons/react-pro";

export default function PinnedVideos({videos, videosAllCount}: any) {
  return (<>
  {/* <Group 
        //   gridTemplateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}} 
        // gap="1.5rem" 
    //    w={{base: "100%", lg:"calc(100% + (2rem * 2))"}}
    //    mx={{base: "0", lg:"-2rem"}}
    > */}
    {/* mx={{base: "0", sm: "-3rem"}} */}
    <Grid gutter="1rem">
        {videos?.map((video: any, index: number) => (<>
        <Grid.Col key={index} span={{base: 12, sm: 6, md: 4}} pos="relative">
            <Anchor href={`/video/${video.id}`} unstyled>
                <Box
                    style={{
                        overflow: "hidden",
                        borderRadius: "var(--mantine-radius-md",
                        boxShadow: "var(--mantine-shadow-bsSMWhite)",
                        transition: "all 0.1s"
                    }}
                    
                    color="white"
                    className={classes.videoThumbnail}
                >
                    <AspectRatio ratio={16/9}>
                        <Image src={video.thumbnailFileID.filePath} alt={video.title} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
                    </AspectRatio>   
                    <Box p="1rem" pos="absolute" w="calc(100% - 1rem)" bg="var(--darkPurpleRGBA)" style={{backdropBlur: "10px", boxShadow: "tsPrimary", zIndex: 100, borderRadius: "0 1rem 0 0"}} top="0.5rem" c="white">
                        <Title order={2} fz="1.2rem" fw={900} c="currentColor">{video.title}</Title>
                        <Text fw={300} fz="1rem" lh="0" c="currentColor"><DisplayDate source={video.uploadedOn} format="MMM Do YYYY" /></Text>
                    </Box>
                    <Box pos="absolute" top="calc(50% - 3rem)" left="calc(50% - 3rem)" style={{zIndex: 100}}c="var(--secondary)"><PlayIcon variant="duotone" size="5rem" /></Box>
                </Box>
            </Anchor>
        </Grid.Col>
        </>))}
    </Grid>
    {/* <Group justify="center"> */}
    <Box mt="1rem">
      <PrimaryLinkedButton link="/feed/videography" icon={<CameraVideoIcon />}>All {videosAllCount} Videos</PrimaryLinkedButton>
    </Box>
    {/* </Group> */}
    {/* </Group> */}
    </>)
}
