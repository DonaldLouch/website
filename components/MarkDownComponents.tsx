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
    Grid,
    // ListIcon,
    // OrderedList,
    // UnorderedList,
    // IconButton,
} from "@chakra-ui/react"

// import { MinusIcon } from '@chakra-ui/icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../config/fontAwesome'

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
    <Text fontSize="1.1rem" lineHeight="1.4rem">{props.children}</Text>
)

const text = (props: any) => (
    <Text fontSize="1.1rem" lineHeight="1.4rem" {...props}>{props.children}</Text>
)

const underline = () => (
    <Divider borderColor="primary" w="95%" mx="auto" my="2rem" />
)

const toggle = (props: any) => (
    <>
        <Accordion allowToggle mt="2rem" mx="auto" w="100%" textDecoration="none" whiteSpace="break-spaces" wordBreak="break-word">
            <AccordionItem border="none">
                <AccordionButton bg="backgroundGradient" color="white" borderRadius="0 2rem" p="1.5rem 3rem" fontSize="1.2rem" fontWeight="600" fontFamily="Lato" _hover={{bg: "none", color: "primary"}} outline="none" _expanded={{bg: "primary", color: "white"}}>
                    <Box flex='1' textAlign='left'>
                    {props.toggleAlt}
                    </Box>
                    <Box mr="4" width={{ base: '4%', md: '12%' }} color="white">
                        <FontAwesomeIcon 
                            icon={["fas", "chevron-down"]}
                            width="100%"
                        />
                    </Box>
                </AccordionButton>
                <AccordionPanel>
                    {props.children}
                </AccordionPanel>
            </ AccordionItem>
        </Accordion>
        {/* <Box id={props.id}>{props.toggleID}</Box> */}
        <Box hidden>{props.children}</Box>
    </>
)

const image = (props: any) => (
    // console.log(props)
    <>
        <Image src={props.src} alt={props.alt} w="100%" />
    </>
)

const songInfo = (props: any) => (
    // console.log(props)
    <>
    <Grid as="section" id="songInfo" templateColumns={{base: "100%", md: "20% 80%"}} gap="1rem" mb="1rem" alignItems="center">
        <Image src={props.artworkSrc} alt={props.artworkTitle} w="100%" />
        <Stack>
            {props.children}
        </Stack>
    </Grid>
    </>
)

const blockquote = (props: any) => (<Text as="blockquote" fontSize="xl" my="1rem" ml="2rem" borderLeft="0.1rem solid grey">{props.children}</Text>)

const unorderedList = (props: any) => (
    <>
    <List spacing={3}>
        {console.log(props.children)}
        {props.children.map((list: any) => ( 
            <>
            {list != "\n" && (
                <ListItem key={list.index} boxShadow="bsBoldOrange" padding="1.5rem" borderRadius="0 2rem" my="1rem" ml="3rem">
                    {/* <ListIcon as={MinusIcon} color='green.500'/> */}
                    {list.props?.children}
                </ListItem>
            )}
            </>
        ))} 
    </List>
        {/* <List my="1.5rem" spacing={3} listStyleType="none" >
            {props.children.map((list: any) => ( 
                <ListItem key={list.index} listStyleType="none" variant="outline"
                // boxShadow="bsBoldOrange" padding="1rem" borderRadius="0 2rem" my="1rem"
                >
                    <ListIcon as="-" color='green.500' />
                    {list}
                </ListItem>
            ))} 
        </List> */}
    </>
)

const links = (props: any) => (<Link href={props.href} variant="primary">{props.children}</Link>)

const videoFrame = (props: any|boolean) => (
    <AspectRatio 
                ratio={16/9}
                // w={{base: "calc(100% - -6rem);", xl: "95%"}}
                w="calc(100% + 4rem)"
                m="1rem 0 1rem -2rem"
                overflow="hidden"
                bg="mainGradient"
                zIndex="banner"
                // borderRadius="0 2rem"
            >
                <iframe  width={props.width} height={props.height} src={props.src} frameBorder="0" allow={props.options} allowFullScreen></iframe>
            </AspectRatio>
)

const tabSection = (props: any) => (
    <>
    <Tabs variant="soft-rounded" colorScheme="purple" my="1rem" boxShadow="bsBoldWhite" p="2rem" borderRadius="0 2rem">
        <TabList>
            {props.tabTitles.map((tab: any) => (
                <Tab key={tab}>{tab}</Tab>
            ))}
        </TabList>
        <TabPanels>
            {props.tabPanels.map((tab: any) => (
                <TabPanel key={tab}>{tab}</TabPanel>
            ))}
        </TabPanels>
    </Tabs>
    </>
)

const inlinePhotoGallery = (props: any) => (
    <>
          <Box 
            as="section" 
            id={props.id} 
            padding="0.5rem 0.3rem"
            // w={{base: "calc(100% - -6rem)", xl: "100%"}}
            w={{base: "calc(100vw + 4rem)", lg: "100vw"}}
            sx={{ columnCount: {base:"1", md: "2", lg: "4"}, columnGap: "0.2rem", columnWidth: {base: "100%", md: "50% 50%", lg: "25% 25% 25% 25%"} }}
            m="1rem -7rem"
            bg="mainGradient"
            zIndex="tooltip"
            pos="sticky"
        >
            {props.content.split(" || ")?.map((image: any) => (
                <Link key={image.index} href={image.split(';;')?.[0]}>
                    <Image src={image.split(';;')?.[0]} alt={image.split(';;')?.[1]} _hover={{background: "backgroundGradient", opacity: "0.6"}} mb="0.2rem"></Image>
                </Link>
            ))}
        </Box>
    </>
)
const lineBreak = () => (<Box as="br"></Box>)

const tables = (props: any) => (
    <>
        <Stack overflowX="auto" m="1rem" px="1rem" boxShadow="bsBoldOrange" padding="1rem !Important" borderRadius="0 2rem">
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