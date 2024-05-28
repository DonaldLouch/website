import SingleAccordion from "@/app/(Components)/(Accordion)/SingleAccording";
import PostContent from "@/app/(Root)/(Blog)/post/(Components)/PostContent";
import DisplayDate from "@/lib/DisplayDate";
import { useUser } from "@clerk/nextjs";
import { Album02Icon, ArrowUpRight01Icon, CameraVideoIcon, ContactIcon, Database02Icon, Edit02Icon, LibraryIcon, Link04Icon, LinkSquare02Icon, NewsIcon, Tag01Icon, TagsIcon, UserMultiple02Icon } from "@hugeicons/react";
import { Anchor, AspectRatio, Avatar, Badge, Box, Group, SimpleGrid, Stack, Title, Text, Divider, Tooltip, Button } from "@mantine/core";


export default function FullDescription({ mdxSource, video }: { mdxSource: any, video: any }) {
    const {user} = useUser()

    return <Box m="1rem">
        <Title order={1} fz="3rem">{video.title}</Title>
        <Group mb="1rem">
            {user &&
            <Anchor href={`/admin/videography/${video.id}`}><Badge color="white" leftSection={<Edit02Icon />}>
                Edit Video
            </Badge></Anchor>
            }
            <Anchor href="/"><Badge color="var(--secondary)" leftSection={<ContactIcon />}>
                Donald Louch
            </Badge></Anchor>
            <Badge color ="red" leftSection={<CameraVideoIcon />}>
                <DisplayDate source={video.uploadedOn} format="MMMM Do YYYY [at] h:mm A" />
            </Badge>
            <Badge color="primary" leftSection={<LibraryIcon />}>
                {video.category.catName}
            </Badge>
            {video.links.length > 0 && video.links.map((link: any) => {
                // console.log("Icon", link.icon)
                const linkIcon = link.icon === "album02" ? <Album02Icon />
                : link.icon === "news" ? <NewsIcon />
                : link.icon === "" && link.linkType.includes("ex") ? <ArrowUpRight01Icon />
                : link.icon === "" && link.linkType.includes("in") ? <LinkSquare02Icon />
                : <Link04Icon />

                return <Anchor href={link.link} key={link.link} target={link.linkType === "exLink" ? "_blank" : "_self"}><Badge color="blue" leftSection={linkIcon ? linkIcon : <Link04Icon />}>
                    {link.name}
                </Badge></Anchor>
            })} 
        </Group>

        <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)", overflow: "scroll"}} p="1rem 2rem" mah="60vh">
            <PostContent mdxSource={mdxSource} />
        </Box>
        <SingleAccordion customMargin="2rem 0rem" customPadding="1rem" content={[{
            id: "metadata",
            imageType: "Icon",
            image: <Database02Icon />,
            label: "Video Information",
            description: "The video metadata information",
        }]}>
            <Stack>
                <Title order={3} ta="center" fz="1.8rem" fw="900" c="white" my="1rem" ff="text">Video Information</Title>

                <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Uploaded On</Title>
                <Badge color ="red" leftSection={<CameraVideoIcon />}>
                    <DisplayDate source={video.uploadedOn} format="dddd, MMMM Do YYYY [at] h:mm A" />
                </Badge>

                <Title order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Category</Title>
                <Badge color="primary" leftSection={<LibraryIcon />}>
                    {video.category.catName}
                </Badge>
                
                <Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Tags</Title>
                <Group align="center" gap="1rem">
                    <TagsIcon />
                    {video.tags && video.tags.map((tag: any, index: number) => (
                        <Badge color ="white" leftSection={<Tag01Icon />} key={index}>
                            {tag}
                        </Badge>
                    ))}
                </Group>
                
                {video.links.length > 0 && (<>
                    <Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Links</Title>
                    <Group align="center" gap="1rem">{video.links.length > 0 && video.links.map((link: any) => {
                        const linkIcon = link.icon === "album02" ? <Album02Icon />
                        : link.icon === "news" ? <NewsIcon />
                        : link.icon === "" && link.linkType.includes("ex") ? <ArrowUpRight01Icon />
                        : link.icon === "" && link.linkType.includes("in") ? <LinkSquare02Icon />
                        : <Link04Icon />

                        return <Anchor href={link.link} key={link.link} target={link.linkType === "exLink" ? "_blank" : "_self"}><Badge color="blue" leftSection={linkIcon ? linkIcon : <Link04Icon />}>
                            {link.name}
                        </Badge></Anchor>
                    })
                    }</Group>
                </>)}

                {video.starring && video.starring.length > 0 && (<><Title  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text">Starring</Title>
                    <Group align="center" wrap="wrap" gap="0.8rem" m="1rem 1rem 0">
                        <UserMultiple02Icon />
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
                                    {mCredit.link && <Tooltip label="View Song"><Button component="a" href={mCredit.link} target="_blank" unstyled c="white"><ArrowUpRight01Icon variant="twotone" size="2rem" /></Button></Tooltip>}
                                </Group>
                                
                                {mCredit.info && (<><Divider opacity="0.2"/><Text lineClamp={8}>
                                    {mCredit.info}
                                </Text></>)}
                            </Stack>
                        </AspectRatio>)))}
                    </SimpleGrid>
                </>)}
                
                {video.videoCredits && video.videoCredits.length > 0 && video.videoCredits.map((vCredit: any, index: number) => (<Box>
                    <Title key={index}  order={4} fz="1.8rem" fw="700" c="white" td="underline" ff="text" m="0">{vCredit.title}</Title>
                    <Text p="1rem" fz="1.2rem">{vCredit.value}</Text>
                </Box>))}
            </Stack>
        </SingleAccordion>
    </Box>
}
