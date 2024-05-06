'use client'

import DisplayDate from '@/lib/DisplayDate'
import { 
    Box,
    Text,
    Heading,
    Link
} from '@chakra-ui/react'

export const ImageMetaDataCard = ({post}: any) => {
    // const postedData = new Date(post.postedOn)
    // const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    // const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const categorySplit = post.categories.split(",")

    // const postedOn = postedDay +" at " + postedTime
    return (
        <Box 
            fontSize="0.8rem" 
            bg="backgroundGradient"
            color="white"
            p="2rem"
            m="4rem 0 1.5rem"
            borderRadius="0 2rem"
        >
            <Heading as="h1" fontSize="3rem" fontWeight="900">{post.title}</Heading>
            <Text fontSize="1rem" mt="0.5rem">By: <Link href="/about">{post.author}</Link> | Posted On: {<DisplayDate source={post.postedOn} />} | Filed Under: {categorySplit.map((category: any) => (
                <Link key={category} href={`/blog/C/${category}`} variant="unstyled" textDecoration="none" color="currentColor" boxShadow="bsBoldWhite" p="0.5rem" borderRadius="0 0.5rem" mx="0.2rem" _hover={{boxShadow: "bsBoldSecondary"}}>{category}</Link>
            ))}</Text>
        </Box>
    )
}