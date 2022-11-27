import { 
    Box,
    Text,
    Link,
    // useColorModeValue
  } from '@chakra-ui/react'
  

  export const MetaDataCard = (post: any) => {
    const postedData = new Date(post.postedOn)
    const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const categorySplit = post.categories.split(",")

    const postedOn = postedDay +" at " + postedTime

    return (
        <Box bg="backgroundGradient" p="0.5rem 1rem" my="1.5rem" color="white">
            <Text fontSize="1rem" color="white">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: {categorySplit.map((category: any) => (<Link key={category}href={`/C/${category}`} boxShadow="bsBoldWhite" p="0.5rem" borderRadius="0 0.5rem" mx="0.2rem" _hover={{boxShadow: "bsBoldOrange"}}>{category}</Link>))}</Text>
        </Box>
    )
}
  