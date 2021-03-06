import { 
    Box,
    Text,
    Tag,
    Link,
  } from '@chakra-ui/react'
  
  export const TagsCard = (post: any) => {
    const tagArray = post.tags.split(', ')
  
      return (
        <Box as="section" id="tags" boxShadow="bsBoldOrange" p="0.5rem 1rem" borderRadius="0 1.5rem" m="1.5rem 0 0" overflowX="scroll" whiteSpace="nowrap">
        <Text>Tags: {tagArray.map((tag: any) => (
            <Tag key={tag.index} variant="solid" colorScheme="purple" mx="0.2rem" _hover={{bg: "none", color: "primary"}} sx={{'pointer': 'hover'}}><Link href={`/T/${tag}`} variant="unstyled">{tag}</Link></Tag>
        ))}</Text>
        </Box>
      )
  }
  