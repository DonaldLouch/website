import { 
    Accordion, 
    AccordionButton, 
    AccordionItem, 
    AccordionPanel, 
    Box, 
    Heading, 
    Stack, 
    Tab, 
    TabList, 
    TabPanel, 
    TabPanels, 
    Tabs,
    Image,
    Text,
    Divider,
    AspectRatio,
    Link,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    List,
    ListItem,
    Grid
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BsChevronDown } from "react-icons/bs"

const heading1 = (props: any) => (
    <Heading as="h1" size="4xl" my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)
const heading2 = (props: any) => (
    <Heading as="h2" size="3xl" my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)
const heading3 = (props: any) => (
    <Heading as="h3" size="2xl" my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)
const heading4 = (props: any) => (
    <Heading as="h4" size="xl" my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)
const heading5 = (props: any) => (
    <Heading as="h5" size="lg" my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)
const heading6 = (props: any) => (
    <Heading as="h6" my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)

const heading = (props: any) => (
    <Heading {...props} my="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{props.children}</Heading>
)

const newSection = (props: any) => (
    <Box id={props.id}></Box>
)

const paragraph = (props: any) => (
    <Text>{props.children}</Text>
)

const text = (props: any) => (
    <Text {...props}>{props.children}</Text>
)

const underline = () => (
    <Divider borderColor="primary" w="95%" mx="auto" my="2rem" />
)

const toggle = (props: any) => (
    <>
        <Accordion allowToggle mt="2rem" mx="auto" w="100%" textDecoration="none" whiteSpace="break-spaces" wordBreak="break-word">
            <AccordionItem border="none">
                <AccordionButton bg="backgroundGradient" color="white" borderRadius="0 2rem" p="1.5rem 3rem" fontSize="1.2rem" fontWeight="600" fontFamily="body" _hover={{bg: "none", color: "primary"}} outline="none" _expanded={{bg: "primary", color: "white"}}>
                    <Box flex='1' textAlign='left'>
                    {props.toggleAlt}
                    </Box>
                    <Box w={{base: "4%", lg: "2%"}}>
                        <BsChevronDown />
                        {/* <FontAwesomeIcon 
                            icon={["fas", "chevron-down"]}
                            height="100%"
                            fontSize="md"
                            color="currentColor"
                        /> */}
                    </Box>
                </AccordionButton>
                <AccordionPanel px="0.5rem" mx="1.5rem">
                    <Stack whiteSpace="break-spaces" gap="1.3rem">
                        {props.children}
                    </Stack>
                </AccordionPanel>
            </ AccordionItem>
        </Accordion>
        {/* <Box hidden>{props.children}</Box> */}
    </>
)

const image = (props: any) => (
    <>
        <Image src={props.src} alt={props.alt} w="100%" />
    </>
)

const songInfo = (props: any) => (
    <>
    <Grid as="section" id="songInfo" templateColumns={{base: "100%", md: "20% 80%"}} gap="1rem" mb="1rem" alignItems="center" boxShadow="bsBoldPrimary" borderRadius="0 2rem">
        <Image src={props.artworkSrc} alt={props.artworkTitle} w="100%" borderBottomLeftRadius="2rem"/>
        <Stack mr="2rem">
            {props.children}
        </Stack>
    </Grid>
    </>
)

const blockquote = (props: any) => (<Text as="blockquote" fontFamily="heading" fontSize="xl" my="1rem" ml="2rem" borderLeft="0.1rem solid" borderColor="primary" paddingLeft="1rem" fontWeight="700">{props.children}</Text>)

const unorderedList = (props: any) => (
    <>
    <List spacing={3}>
        {props.children.map((list: any) => ( 
            <>
            {list != "\n" && (
                <ListItem key={list.index} boxShadow="bsBoldSecondary" padding="1.5rem" borderRadius="0 2rem" my="1rem" ml="3rem">
                    {/* <ListIcon as={MinusIcon} color='green.500'/> */}
                    <Stack direction="row" alignItems="center" ml="-4rem" gap="3rem">
                        <Box color="primary" width={5}>
                            <FontAwesomeIcon icon={['fal', 'hand-point-right']} color="currentColor" />
                        </Box>
                        {list.props?.children}
                    </Stack>
                </ListItem>
            )}
            </>
        ))} 
    </List>
    </>
)

const links = (props: any) => (<Link href={props.href} variant="primary">{props.children}</Link>)

const videoFrame = (props: any|boolean) => (
    <AspectRatio 
                ratio={16/9}
                w="calc(100% + 4rem)"
                m="1rem 0 1rem -2rem"
                overflow="hidden"
                bg="mainGradient"
                zIndex="banner"
            >
                <iframe  width={props.width} height={props.height} src={props.src} frameBorder="0" allow={props.options} allowFullScreen></iframe>
            </AspectRatio>
)

const tabSection = (props: any) => (
    <>
        <Tabs isFitted>
            <TabList>
                {props.tabTitles.map((tab: any) => (
                    <Tab key={tab}>{tab}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {props.children.map((tab: any) => (
                    // console.log(tab)
                    <TabPanel key={tab}>{tab}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    </>
)

{/* <>
    <Tabs isFitted>
        <TabList>
            {props.tabTitles.map((tab: any) => (
                <Tab key={tab}>{tab}</Tab>
            ))}
        </TabList>
        <TabPanels>
            {props.tabPanels.map((tab: any) => (
                // console.log(tab)
                <TabPanel key={tab}>{tab}</TabPanel>
            ))}
        </TabPanels>
    </Tabs>
     </> */}

const inlinePhotoGallery = (props: any) => (
    <>
          <Box 
            as="section" 
            id={props.id} 
            padding="0.4rem"
            w="100vw"
            sx={{ columnCount: {base:"1", md: "2", lg: "4"}, gap: "0.4rem", columnWidth: {base: "100%", md: "50% 50%", lg: "25% 25% 25% 25%"}}}
            m={{base: "1rem -3rem", lg: "1rem -7rem"}}
            bg="mainGradient"
            zIndex="tooltip"
            pos="sticky"
        >
            {props.content.split(" || ")?.map((image: any) => (
                <Link key={image.index} href={image.split(';;')?.[0]}>
                    <Image src={image.split(';;')?.[0]} alt={image.split(';;')?.[1]} _hover={{background: "backgroundGradient", opacity: "0.6"}} display="inherit"></Image>
                </Link>
            ))}
        </Box>
    </>
)
const lineBreak = () => (<Box as="br"></Box>)

const tables = (props: any) => (
    <>
        <Stack overflowX="auto" m="1rem" px="1rem" boxShadow="bsBoldSecondary" padding="1rem !Important" borderRadius="0 2rem">
            <Table variant='striped' colorScheme='purple' sx={{ borderCollapse: 'unset' }}>
                <Thead w="auto">
                    <Tr>
                        {props.tableHeader.split(' | ').map((header: any) => (
                            <Th key={header} textTransform="capitalize" fontSize="1rem" fontWeight="900" color="secondary" textAlign="center">{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody w="auto">
                {props.tableData.split(" ;; ").map((row: any) => (
                    <>
                    <Tr key={row.index}>
                            {row.split(' | ').map((cell: any) => (
                                <Td key={cell} textAlign="center">{cell}</Td>
                            ))}
                    </Tr>
                    </>
                ))}
                </Tbody>
            </Table>
        </Stack>
    </>
)


export { heading1, heading2, heading3, heading4, heading5, heading6, newSection, toggle, image, songInfo, blockquote, unorderedList, videoFrame, tabSection, paragraph, underline, links, inlinePhotoGallery, tables, lineBreak, text, heading }