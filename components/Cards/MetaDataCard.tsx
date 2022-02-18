import { 
    Box,
    Text,
    Link,
  } from '@chakra-ui/react'
  

  export const MetaDataCard = (post: any) => {
    const postedData = new Date(post.postedOn)
    const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const postedOn = postedDay +" at " + postedTime

    return (
        <Box bg="backgroundGradient" p="0.5rem 1rem" my="1.5rem">
            <Text fontSize="1rem">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: <Link href={`/C/${post.categories}`}>{post.categories}</Link></Text>
        </Box>
    )
}
  