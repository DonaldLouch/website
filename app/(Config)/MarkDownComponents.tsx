import { 
    Box, 
    Title, 
    Stack,
    Tabs,
    Image,
    Text,
    Divider,
    AspectRatio,
    Anchor,
    Table,
    List,
    Flex,
    Code,
    Blockquote
} from "@mantine/core"

import classes from "@/app/(Components)/Components.module.css"

import SingleAccordion from "../(Components)/(Accordion)/SingleAccording"

import Masonry from 'react-masonry-css'
import InlineLink from "../(Components)/InlineLink"
import HugeIcon from "../(Components)/HugeIcon"

 const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    800: 3,
}

const heading1 = (props: any) => (
    <Title order={1} size="3rem" fw="600" my="0.5rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
)
const heading2 = (props: any) => (
    <Title order={2} size="2rem" fw="600" my="0.5rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
)
const heading3 = (props: any) => (
    <Title order={3} size="1.2rem" fw="600" my="0.5rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
)
const heading4 = (props: any) => (
    <Title order={4} size="3rem" ff="text" fw="600" my="0.5rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
)
const heading5 = (props: any) => (
    <Title order={5} size="2rem"ff="text"  fw="600" my="0.5rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
)
const heading6 = (props: any) => (
    <Title order={6} size="1.2rem" ff="text" fw="600" my="0.5rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
)

const heading = (props: any) => (
    <Title {...props} my="1rem" style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}>{props.children}</Title>
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

const divider = (props: any) => (
    props.children ? <Divider my="md" label={props.children} labelPosition="center" /> : <Divider my="md" />
)

const toggle = (props: any) => (
    <>
        <SingleAccordion content={[{
            id: props.id,
            label: props.toggleAlt
        }]}>
            <Stack style={{whiteSpace: "break-spaces"}} gap="1.3rem">
                {props.children}
            </Stack>
        </SingleAccordion>
    </>
)

const image = (props: any) => (<Image src={props.src} alt={props.alt} style={{boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} radius="md" />)

const songInfo = (props: any) => (
    <>
     {/* <Stack component="section" pos="absolute" top="0" left="0" h="100vh" mx={{base: "0.5rem", md: "2rem"}} mah={{base: "auto", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center"> */}
        <Box component="section" bg="var(--darkPurpleRGBA)" style={{
            boxShadow: "var(--mantine-shadow-bsSMPrimary)",
            backdropFilter: "blur(20px)",
            borderRadius: "var(--mantine-radius-lg)"
        }} w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} p="0 1rem" my="1rem">
            <Flex
            direction={{base: "row", sm: "row"}}
            gap={{base: "0.5rem", sm: "2rem"}}
            justify="flex-start"
            align="center"
            >
                <AspectRatio ratio={1/1} 
                    w="50%"
                >
                    <Image src={props.artworkSrc} alt={props.artworkTitle} />
                </AspectRatio>               
                <Flex direction="column" align={{base: "center", lg: "flex-start"}}>
                     {props.children}
                </Flex>
            </Flex>
        </Box>
    {/* </Stack> */}
    {/* <Grid component="section" id="songInfo" gutter="1rem" mb="1rem" align="center" style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "(--mantine-radius-md)"}}>
        <Grid.Col span={3}><Image src={props.artworkSrc} alt={props.artworkTitle}  style={{borderBottomLeftRadius: "2rem"}}/></Grid.Col>
        <Grid.Col span={9} mr="2rem">
            {props.children}
        </Grid.Col>
    </Grid> */}
    </>
)

const blockquote = (props: any) => (<Blockquote color="var(--primary)" icon={<HugeIcon name="quote-down" />} m="3rem 0 2rem" p="1rem 2rem">
    {props.children}
</Blockquote>)

const unorderedList = (props: any) => {
    const listArray = new Array()
    props.children.forEach((item: any) => {
        item != "\n" && listArray.push(item)
    })
    return <List withPadding fw="300" type="unordered" icon={<HugeIcon name="hand-pointing-right-01" variant="duotone" color="var(--secondary)" />} styles={{itemWrapper: {alignItems: "flex-start"}}}>
        {listArray.map((item: any, index: number) => {
            return <List.Item key={index} m="1rem">{item.props.children}</List.Item>
        })}
    </List>
}

const orderedList = (props: any) => {
    const listArray = new Array()
    props.children.forEach((item: any) => {
        item != "\n" && listArray.push(item)
    })
    return <List withPadding spacing="0" fw="300" type="ordered" center={false}>
        {listArray.map((item: any, index: number) => {
            return <List.Item key={index} m="1rem">{item.props.children}</List.Item>
        })}
    </List>
}
// {list.props?.children}
//     <>
//     <List spacing={3}>
//         {props.children.map((list: any) => ( 
//             <>
//             {list != "\n" && (
//                 <ListItem key={list.index} boxShadow="bsBoldSecondary" padding="1.5rem" borderRadius="0 2rem" my="1rem" ml="3rem">
//                     {/* <ListIcon as={MinusIcon} color='green.500'/> */}
//                     <Stack direction="row" alignItems="center" ml="-4rem" gap="3rem">
//                         <Box color="primary" width={5}>
//                             <FontAwesomeIcon icon={['fal', 'hand-point-right']} color="currentColor" />
//                         </Box>
//                         {list.props?.children}
//                     </Stack>
//                 </ListItem>
//             )}
//             </>
//         ))} 
//     </List>
//     </>
// )

const links = (props: any) => (<InlineLink link={props.href} body={props.children} isInternal={props.href.startsWith("/")} />)

const videoFrame = (props: any|boolean) => (
    <AspectRatio 
        ratio={16/9}
        // w="calc(100% + 4rem)"
        // m="1rem 0 1rem -2rem"
        style={{
            overflow: "hidden",
            zIndex: "1000",
            border: "none"
        }}
    
        // bg="mainGradient"
    >
        <iframe width={props.width} height={props.height} src={props.src} allow={props.options} allowFullScreen style={{border: "none"}}></iframe>
    </AspectRatio>
)

const tabSection = (props: any) => (<Tabs defaultValue="0">
    <Tabs.List grow justify="center">
        {props.tabTitles.map((tab: any, index: any) => (
            <Tabs.Tab key={tab} value={index.toString()}>{tab}</Tabs.Tab>
        ))}
    </Tabs.List>
    {props.children.map((tab: any, index: any) => (<Tabs.Panel key={index} value={index.toString()}>
        {tab}
    </Tabs.Panel>))}
</Tabs>)

const internalEmbedVideo = (props: any) => (
    <AspectRatio ratio={16/9}>
        <iframe src={`/embed/${props.id}`} allowFullScreen style={{border: "none", borderRadius: "var(--mantine-radius-sm)", boxShadow: "var(--mantine-shadow-bsBoldWhite)", overflow: "hidden"}} />
    </AspectRatio>
)

const inlinePhotoGallery = (props: any) => (<Flex 
    component={Masonry}
    breakpointCols={breakpointColumnsObj}
    m={{base: "2rem -0.2rem", lg: "2rem -4rem"}}
    w="calc(100vw - 1rem)"
    p={{base: "0.5rem", sm: "0 0.5rem"}}
    gap="0.5rem"
    bg="var(--darkPurple)"
    pos="relative"
    style={{
        zIndex: 2000
    }}
>
    {props.content.split(" || ")?.map((image: any, index: number) => (<Box key={index} className={classes.imageCardView}><Anchor href={image.split(';;')?.[0]}><Image src={image.split(';;')?.[0]} alt={image.split(';;')?.[1]} /></Anchor></Box>))}
</Flex>)

const lineBreak = () => (<Box component="br"></Box>)

const codeBlock = (props: any) => {
    return <Code block bg="var(--blackRGBA)" c="white" style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="1rem 2rem 2rem" fz="1rem" lh="2"><Text fz="0.8rem">// Code Type: .{props.children.props.className.split("-")[1]}</Text><Divider mb="1rem" color="var(--darkPurple)" />{props.children.props.children}</Code>
}

const code = (props: any) => {
    // console.log(props)
    return <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" lh="2">{props.children}</Code>
}
const tables = (props: any) => (
    <>
    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}}>
      <Table.Thead bg="var(--darkPurple)" styles={{thead: {borderRadius: "0 2rem 0 0"}}}>
        <Table.Tr>
            {props.tableHeader.split(' | ').map((header: any) => (
                <Table.Th key={header} tt="capitalize" fz="1rem" fw="300" c="var(--secondary)" ta="center" ff="heading">{header}</Table.Th>
            ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
          {props.tableData.split(" ;; ").map((row: any) => (
            <>
                <Table.Tr key={row.index}>
                        {row.split(' | ').map((cell: any) => (
                            <Table.Td key={cell} ta="center" fz="1.2rem" py="1rem">{cell}</Table.Td>
                        ))}
                </Table.Tr>
            </>
            ))}
      </Table.Tbody>
    </Table>
        {/* <Stack overflowX="auto" m="1rem" px="1rem" boxShadow="bsBoldSecondary" padding="1rem !Important" borderRadius="0 2rem">
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
        </Stack> */}
    </>
)


export { heading1, heading2, heading3, heading4, heading5, heading6, newSection, toggle, image, songInfo, blockquote, unorderedList, orderedList, videoFrame, tabSection, paragraph, divider, links, inlinePhotoGallery, tables, lineBreak, text, heading, codeBlock, code, internalEmbedVideo }