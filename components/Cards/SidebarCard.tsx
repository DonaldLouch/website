import { 
    Box,
    Heading,
    Stack,
    Button,
    Grid
  } from '@chakra-ui/react'
  
  import { PostContent } from '../PostContent'

  export const SidebarCard = (post: any, source: any) => {

    let sections = null
    if (post.sidebar === true) {
        sections = post.sections.split(',')
    }

    return (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "75% 25%" }} pos="relative">
            <Box>
                <PostContent {...post} {...source} />
            </Box>
            <Box as="aside" id="sidebar" pos="relative" mx="1rem" px="1rem" display={{base: "none", lg:"initial"}}>
                <Heading as="h3">Sections</Heading>
                <Stack pos="sticky" top="6rem">
                    {sections.map((section: any) => (
                        <Button key={section.index} as="a" variant="sectionButton" href={`#${section.split('#')?.[1]}`}>{section.split('#')?.[0]}</Button>
                    ))}
                </Stack>
            </Box>
        </Grid>
    )
}
  