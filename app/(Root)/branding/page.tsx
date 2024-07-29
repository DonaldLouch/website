'use client'
import CopyColourSwatch from "@/app/(Components)/(Buttons)/CopyColourSwatch";
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton";
import TableOfContents from "@/app/(Components)/TableOfContents";
import DisplayDate from "@/lib/DisplayDate";
import { ArrowLeft02Icon, Calendar03Icon, ContactIcon, Delete04Icon, InformationCircleIcon } from "@hugeicons/react";
import { Box, Title, Image, SimpleGrid, AspectRatio, Anchor, Stack, Flex, Tooltip, Text, Badge, Group, Space, Grid, useMantineTheme, Alert, Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function BrandingPage() {
    const theToc = [
        {
            "slug": "status",
            "title": "Current Status",
        },
        {
            "slug": "types",
            "title": "Typography"
        },
        {
            "slug": "colours",
            "title": "Colour Palette"
        },
        {
            "slug": "gradients",
            "title": "Gradients"
        },
        {
            "slug": "theShadows",
            "title": "Box/Drop Shadows"
        },
        {
            "slug": "logos",
            "title": "Logos"
        },
        {
            "slug": "titleLogo",
            "title": "Title Logo"
        },
        {
            "slug": "pdf",
            "title": "PDF Version"
        }
    ]
    
    const toc = new Array({label: "Branding Version 5.0", link: "#hero", order: 1})
    theToc.forEach((section: any) => {
        toc.push({label: section.title, link: `#${section.slug}`, order: 1})
    })

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const shadow = mobile ? "none" : "var(--mantine-shadow-bsBoldPrimary)"

    const colourSwatches = [
        {
            colourTitle: "Affair",
            colourHex: "#764688",
        },
        {
            colourTitle: "Equator",
            colourHex: "#e7c462",
        },
        {
            colourTitle: "Tolopea",
            colourHex: "#372745",
        },
        {
            colourTitle: "Smoky",
            colourHex: "#604e77",
        },
        {
            colourTitle: "Puttuy",
            colourHex: "#e6ce84",
        },
        {
            colourTitle: "Mirage",
            colourHex: "#1d1929",
        },
        {
            colourTitle: "White Sand",
            colourHex: "#f4f4f4",
        }
    ]

    const gradients = [
        {
            description: "UPDATED Main gradient just from: Affair (#764688) to Equator (#e7c462)",
            from: "#764688",
            to: "#e7c462"
        },
        {
            description: "NEW gradient from: Equator (#e7c462) to Putty (#e6ce84)",
            from: "#e7c462",
            to: "#e6ce84"
        },
        {
            description: "NEW gradient from: Affair (#764688) to Smoky (#604e77)",
            from: "#764688",
            to: "#604e77"
        },
        {
            description: "NEW gradient from: Affair (#764688) to Tolopea (#30243c)",
            from: "#764688",
            to: "#30243c"
        }
    ]

    const shadows = [
        {
            title: "NEW: Tolopea",
            rgb: "55, 39, 69",
        },
        {
            title: "NEW: Smoky",
            rgb: "96, 78, 119",
        },
        {
            title: "NEW: Puttuy",
            rgb: "230, 206, 132",
        },
        {
            title: "UPDATED/NEW: White Sand",
            rgb: "244, 244, 244",
        }
    ]

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
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="status" mb="2rem">Current Rebranding Status</Title>
                            <Text>Please note that this rebranding will be a slow roll out and not every aspect of my branding will be reflected with my new branding.</Text>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="overview" mb="2rem">Overview</Title>
                            <Text>Enclosed within this page are the comprehensive updates to my branding strategy for both my website and overarching brand identity. This marks a significant milestone as it represents one of the most extensive brand redesigns I have undertaken to date. Changing my typography, an updated color palette, and new and updated gradients. Furthermore, a fresh logo design and title logos will be unveiled as part of this rebranding initiative. These enhancements are envisioned to enhance my brand with a heightened sense of professionalism while resonating more deeply with my passion for web development.</Text>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="types" mb="2rem">Typography</Title>
                            <Box pl="1.5rem">
                                <Title order={3} ff="text" fz="1.5rem" fw="400" lh="1.3rem" my="1rem"><strong>Text</strong>: Noto Sans</Title>
                                <Title order={3} ff="text" fz="1.5rem" fw="400" lh="1.3rem" my="1rem"><strong>Heading</strong>: <Box component="span" ff="heading">Noto Serif</Box></Title>
                                <Title order={3} ff="text" fz="1.5rem" fw="400" lh="1.3rem" my="1rem"><strong>Code Snippets</strong>: <Box component="span" ff="monospace">Noto Sans Mono</Box></Title>
                                <Text fz="1.5rem" fw="400" lh="1.3rem" my="1rem"><strong>Emoji</strong>: Noto Color Emoji (<Box component="span" style={{fontFamily: "Noto Color Emoji"}}>😊🎉🙌🏻</Box>)</Text>
                            </Box>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="colours" mb="2rem">Colour Palettes</Title>
                            <SimpleGrid spacing="1rem" cols={{base: 3, sm: 4, md: 7}}>
                                {colourSwatches.map((colour: any) => (
                                    <CopyColourSwatch key={colour.colourHex} colourTitle={colour.colourTitle} colourHex={colour.colourHex} colourAmount={colourSwatches.length} />
                                ))}
                            </SimpleGrid>
                            <Alert variant="light" color="red" icon={<Delete04Icon variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">The Lima (#6acc1b) green hue has been phased out from the core branding colours. When green is needed within my website, Lima (#6acc1b) remains the designated choice.</Text></Alert>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="gradients" mb="2rem">Gradients</Title>
                            <SimpleGrid spacing="1rem" cols={2}>
                                {gradients.map((gradient: any, index: number) => (
                                    <Stack key={`gradient${index}`} bg={`linear-gradient(90deg, ${gradient?.from}, ${gradient?.to})`} h="15vh" justify="center" align="center" p="1rem" style={{ boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)" }}>
                                        <Text fw="900" style={{ textShadow: "var(--mantine-shadow-bsPrimary)" }} ta="center">{gradient.description}</Text>
                                    </Stack>
                                ))}
                            </SimpleGrid>
                             <Alert variant="light" color="red" icon={<Delete04Icon variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">The Lima (#6acc1b) green hue has been phased out from the main gradient.</Text></Alert>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="theShadows" mb="2rem">Box/Drop Shadows</Title>
                            <SimpleGrid spacing="1rem" cols={2}>
                                {shadows.map((shadow: any, index: number) => (
                                    <Stack key={`shadow${index}`} h="10vh" justify="center" align="center" p="1rem" style={{ boxShadow: `1px 1px 10px rgba(${shadow.rgb},0.6)`, borderRadius: "var(--mantine-radius-md)" }}>
                                        <Text fw="900" style={{ textShadow: "var(--mantine-shadow-bsPrimary)" }} ta="center">{shadow.title}</Text>
                                    </Stack>
                                ))}
                            </SimpleGrid>
                            <Alert variant="light" color="var(--secondary)" icon={<InformationCircleIcon variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">Note that there is also a new shadow for the "Mirage (##1d1929)" colour; however, it's not visible on this particular page since the background is the Mirage colour!</Text></Alert>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="logos" mb="2rem">Logos</Title>
                            <Text>My new logo is inspired by the ending of a coding tag. Furthermore, the logo has an uppercase D and L, which happen to be my initials (they are reversed though). With this logo, it also allows me to extend the bottom line of the back slash/backwards L to allow me to use it as an underline for my title logo with my name. Which further brings the logo and title together. The new logo also features the new subtle gradients for purple and orange, as well as the new Tolopea (#30243c) drop shadow.</Text>
                            <SimpleGrid cols={2}>
                                <Box>
                                    <Title order={3} my="0.5rem" fw="100" visibleFrom="md">Standard Logo</Title>
                                    <Image
                                        src="/logo/logo.svg"
                                        alt="Donald Louch"
                                        w={{base: "60vw", lg: "30vw !important"}}
                                        height="auto"
                                    />
                                </Box>
                                <Box>
                                    <Title order={3} my="0.5rem" fw="100" visibleFrom="md">Favicon</Title>
                                    <Image
                                        src="/logo/logo.svg"
                                        alt="Donald Louch"
                                        w="2vw"
                                        height="auto"
                                        visibleFrom="md"
                                    />
                                </Box>
                            </SimpleGrid>
                            <Alert variant="light" color="var(--secondary)" icon={<InformationCircleIcon variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There are additional variants that are available which can be seen in the below attached PDF file.</Text></Alert>
                        </Box>
                        <Box my="2rem">
                            <Title order={2} my="0.5rem" fw="500" id="titleLogo" mb="2rem">Title Logo</Title>
                            <Image
                                src="/titleLogo/titleLogoWhiteColoured.svg"
                                alt="Donald Louch"
                                w="100%"
                                height="auto"
                            />
                            <Alert variant="light" color="var(--secondary)" icon={<InformationCircleIcon variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There are additional variants that are available which can be seen in the below attached PDF file.</Text></Alert>
                        </Box>
                        <Title order={2} my="0.5rem" fw="500" id="pdf">PDF Version of "Branding Version 5.0"</Title>
                        <AspectRatio ratio={8/11.5}>
                            <iframe src="/DonaldLouchBranding5.pdf" width="100%" height="800" />
                            <Anchor href="/DonaldLouchBranding5.pdf">If Unsupported: Download/View the PDF</Anchor>
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
