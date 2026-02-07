import { Anchor, AspectRatio, Avatar, Badge, Box, Group, SimpleGrid, Stack, Title, Text, Divider, Tooltip, Button } from "@mantine/core";
import SingleAccordion from "@/components/accordions/SingleAccording";
import LinkBadge from "@/components/LinkBadge";
import { Markdown } from "@/components/markdown";

import DisplayDate from "@/lib/DisplayDate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function FullDescription({ description, video }: { description: any, video: any }) {
    const user = false
    const isAdmin = false

    return <Box m="1rem">
        <Title order={1} fz="3rem" fw="300">{video.title}</Title>
        <Group mb="1rem">
            {user && isAdmin &&
            <Anchor href={`/admin/videography/${video.id}`}><Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "pen"]} size="lg" />}>
                Edit Video
            </Badge></Anchor>
            }
            <Anchor href="/"><Badge color="var(--secondary)" leftSection={<FontAwesomeIcon icon={["fadl", "id-badge"]} />}>
                Donald Louch
            </Badge></Anchor>
            <Badge color ="red" leftSection={<FontAwesomeIcon icon={["fadl", "film"]} size="lg"/>}>
                <DisplayDate source={video.uploadedOn} format="MMMM Do YYYY [at] h:mm A" />
            </Badge>
            <Badge color="primary" leftSection={<FontAwesomeIcon icon={["fadl", "folder"]} size="lg"/>}>
                {video.category?.catName}
            </Badge>
            {video.links && video.links.length > 0 && video.links.map((link: any, index: number) => (
                <LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, variant: link.icon.variant}} key={index} />
            ))}
        </Group>
        <Markdown source={description} mah="60vh" />
        <SingleAccordion customMargin="2rem 0rem" customPadding="0 1rem" content={[{
            id: "metadata",
            imageType: "Icon",
            image: <FontAwesomeIcon icon={["fadl", "database"]} size="lg"/>,
            label: "Video Information",
            description: "The video metadata information",
        }]}>
            <Stack mb="2rem" gap="2rem" px="1rem" mt="0">
                <Title order={3} ta="center" fz="1.8rem" fw="900" c="white" my="1rem" ff="text">Video Information</Title>

                <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Uploaded On</Title>
                <Badge color ="red" leftSection={<FontAwesomeIcon icon={["fadl", "calendar"]} size="lg"/>}>
                    <DisplayDate source={video.uploadedOn} format="dddd, MMMM Do YYYY [at] h:mm A" />
                </Badge>

                <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Category</Title>
                <Badge color="primary" leftSection={<FontAwesomeIcon icon={["fadl", "folder"]} size="lg" />}>
                    {video.category?.catName}
                </Badge>
                
                <Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Tags</Title>
                <Group align="center" gap="1rem">
                    <FontAwesomeIcon icon={["fadl", "tags"]} size="lg" />
                    {video.tags && video.tags.map((tag: any, index: number) => (
                        <Badge color ="white" leftSection={<FontAwesomeIcon icon={["fadl", "tag"]} size="lg" />} key={index}>
                            {tag}
                        </Badge>
                    ))}
                </Group>
                
                {video.links && video.links.length > 0 && (<>
                    <Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Links</Title>
                    <Group align="center" gap="1rem">{video.links.length > 0 && video.links && video.links.length > 0 && video.links.map((link: any, index: number) => (
                        <LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, variant: link.icon.variant}} key={index} />
                    ))}</Group>
                </>)}

                {video.starring && video.starring.length > 0 && (<><Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Starring</Title>
                    <Group align="center" wrap="wrap" gap="0.8rem" m="1rem 1rem 0">
                        <FontAwesomeIcon icon={["fadl", "users"]} size="lg"/>
                        {video.starring && video.starring.map((star: any, index: number) => (
                            star.link ? <Anchor href={star.link}>
                            <Badge color="orange" leftSection={<Avatar
                                src=''
                                size='sm'
                                alt={star.displayName}
                                ml={-1}
                                mr={2}
                            />} key={index}>
                                {star.displayName}    
                            </Badge>
                            </Anchor> : <Badge color="orange" leftSection={<Avatar
                                src=''
                                size='sm'
                                alt={star.displayName}
                                ml={-1}
                                mr={2}
                            />} key={index}>
                                {star.displayName}    
                            </Badge>
                        ))}
                    </Group>
                </>)} 

                {video.musicCredits && video.musicCredits.length > 0 && (<><Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" my="1rem" ff="text">Music Credits</Title>
                    <SimpleGrid spacing="1.5rem" cols={{base: 1, sm: 2, md: 3}}>
                        {video.musicCredits && video.musicCredits.map((mCredit: any, index: number) => (mCredit.title && (<AspectRatio
                            ratio={1 / 1}
                            style={{
                                boxShadow: "var(--mantine-shadow-bsBoldWhite)",
                                borderRadius: "var(--mantine-radius-md)",
                                overflow: "scroll",
                            }}
                            mah="100%"
                            key={index}
                        >
                            <Stack p="1.5rem">
                                <Group justify="space-between" m="0">
                                    <Stack m="0" gap="0" w={mCredit.link ? "80%" : "100%"}>
                                        <Tooltip label={mCredit.title}>
                                            <Title order={4} ff="text" fz="1.5rem" lineClamp={1} my="0">{mCredit.title}</Title>
                                        </Tooltip>
                                        {mCredit.artist && (
                                        <Tooltip label={mCredit.artist}><Text fw={300} m="-0.5rem 0 1rem" lineClamp={1}>By: {mCredit.artist}</Text></Tooltip>)}
                                    </Stack>
                                    {mCredit.link && <Tooltip label="View Song"><Button component="a" href={mCredit.link} target="_blank" unstyled c="white"><FontAwesomeIcon icon={["fal", "arrow-up-right-from-square"]} size="lg" /></Button></Tooltip>}
                                </Group>
                                
                                {mCredit.info && (<><Divider opacity="0.2"/><Text lineClamp={8}>
                                    {mCredit.info}
                                </Text></>)}
                            </Stack>
                        </AspectRatio>)))}
                    </SimpleGrid>
                </>)}
                
                {video.videoCredits && video.videoCredits.length > 0 && video.videoCredits.map((vCredit: any, index: number) => (<Box key={index}>
                    <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text" m="0">{vCredit.title}</Title>
                    <Text p="1rem" fz="1.2rem">{vCredit.value}</Text>
                </Box>))}
            </Stack>
        </SingleAccordion>
    </Box>
}
