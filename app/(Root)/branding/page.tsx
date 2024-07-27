'use client'
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton";
import TableOfContents from "@/app/(Components)/TableOfContents";
import DisplayDate from "@/lib/DisplayDate";
import { ArrowLeft02Icon, Calendar03Icon, ContactIcon } from "@hugeicons/react";
import { Box, Title, Image, SimpleGrid, AspectRatio, Anchor, Stack, Flex, Tooltip, Text, Badge, Group, Space, Grid, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function BrandingPage() {
    const theToc = [
        {
            "slug": "overview",
            "title": "Overview"
        },
    ]
    
    const toc = new Array({label: "Branding Version 5.0", link: "#hero", order: 1})
    theToc.forEach((section: any) => {
        toc.push({label: section.title, link: `#${section.slug}`, order: 1})
    })

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const shadow = mobile ? "none" : "var(--mantine-shadow-bsBoldPrimary)"
  return <>
    <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
            <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
            <Box w="100vw" h="100vh">
                <Image src="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LYZ6RZZ8ik0X9Eq6x.jpeg" alt="Cover Image Branding 5.0" w="100vw" h="100vh"/>
            </Box>
            <Box><HomeButton icon={<ArrowLeft02Icon size="3rem" />} link="/blog" helperText="Go Back to Blog Feed" /></Box> 
            <Stack component="section" pos="absolute" top="0" left="0" h="100vh" mx={{base: "0.5rem", md: "2rem"}} mah={{base: "auto", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center" miw="calc(100% - 2rem)">
                <Box bg="var(--darkPurpleRGBA)" style={{
                    boxShadow: "var(--mantine-shadow-bsSMPrimary)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--mantine-radius-lg)"
                }} w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} p={{base: "1rem", sm: "2rem"}} mx={{base: "0.5rem", sm: "0"}}>
                    <Flex
                    direction={{base: "column", sm: "row"}}
                    gap={{base: "0.5rem", sm: "2rem"}}
                    justify="flex-start"
                    align="center"
                    >
                        <AspectRatio ratio={16/9} 
                            w="50%"
                        >
                            <Image src="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LYZ6RZZ8ik0X9Eq6x.jpeg" alt="Cover Image Branding 5.0" />
                        </AspectRatio>               
                        <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
                            <Stack gap="0">
                                <Tooltip label="Branding Version 5.0">
                                <Title
                                    order={1}
                                    style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                                    fz="3rem"
                                    fw="200"
                                    mb="-0.5rem"
                                    // td="underline 0.4rem var(--primary)"
                                    lineClamp={1}
                                >
                                    Branding Version 5.0
                                </Title>
                                </Tooltip>
                                <Text fz="1.3rem">
                                    The comprehensive updates to my branding strategy for both my website and overarching brand identity. This marks a significant milestone as it represents one of the most extensive brand redesigns I have undertaken to date. Changing my typography, an updated color palette, and new and updated gradients. Furthermore, a fresh logo design and title logos will be unveiled as part of this rebranding initiative. These enhancements are envisioned to enhance my brand with a heightened sense of professionalism while resonating more deeply with my passion for web development.
                                </Text>
                            </Stack>
                        </Flex>
                    </Flex>
                </Box>
            </Stack>
        </Box>
        <Space h="101vh" />
        <Box component="article" id="post">
            <Title order={2} fz="2.5rem" fw="300" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}} m="0">Updated Typography, Color Palette, Gradients, Logo, and Title Logo</Title>
            <Grid pos="relative" gutter={{base: "0", sm: "5rem"}} my={{base: "1rem", sm: "5rem"}}>
                <Grid.Col span={{base: 12, sm: 9}} p={{base: "1rem", sm: "1rem 2rem"}} style={{boxShadow: shadow, borderRadius: "var(--mantine-radius-md)"}}>
                    <Box my="2rem">
                        <Title order={2} my="0.5rem" fw="500">Website Title</Title>
                        <Image
                            src="/titleLogo/titleLogoWhiteColoured.svg"
                            alt="Donald Louch"
                            w={{base: "60vw", lg: "30vw !important"}}
                            height="auto"
                        />
                        <Title order={2} my="0.5rem" fw="500">Icon</Title>
                        <SimpleGrid cols={2}>
                            <Box>
                                <Title order={3} my="0.5rem" fw="100">Standard Icon</Title>
                                <Image
                                    src="/logo/logo.svg"
                                    alt="Donald Louch"
                                    w={{base: "60vw", lg: "30vw !important"}}
                                    height="auto"
                                />
                            </Box>
                            <Box>
                                <Title order={3} my="0.5rem" fw="100">Favicon</Title>
                                <Image
                                    src="/logo/logo.svg"
                                    alt="Donald Louch"
                                    w="2vw"
                                    height="auto"
                                />
                            </Box>
                        </SimpleGrid>
                        <Title order={2} my="0.5rem" fw="500">PDF Version of "Branding Version 5.0"</Title>
                        <AspectRatio ratio={8/11.5}>
                            <iframe src="/DonaldLouchBranding5.pdf" width="100%" height="800" />
                            <Anchor href="/DonaldLouchBranding5.pdf">If Unsupported: Download the PDF</Anchor>
                        </AspectRatio>
                    </Box>
                </Grid.Col>
                <Grid.Col span={3} top="3rem" bottom="-4rem" pos="sticky" h="74vh" visibleFrom="sm">
                    <Box component="aside" id="sidebar">
                        <TableOfContents sections={toc} />
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
  </>
}
