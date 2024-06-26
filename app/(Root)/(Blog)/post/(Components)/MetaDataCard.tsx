'use client'

import DisplayDate from '@/lib/DisplayDate'
import { Box, Text, Link } from '@chakra-ui/react'

import moment from 'moment'

export const MetaDataCard = ({post}: any) => {
    // const postedData = new Date(post.postedOn)
    // const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    // const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const categorySplit = post.categories.split(",")

    // const postedOn = postedDay +" at " + postedTime
    return (
        <Box bg="backgroundGradient" p="1.5rem" my="1.5rem" color="white" borderRadius="0 1.5rem">
            <Text fontSize="1rem" color="white">By: <Link href="/about">{post.author}</Link> | Posted On: {<DisplayDate source={post.postedOn} />} | Filed Under: {categorySplit.map((category: any) => (<Link key={category} href={`/blog/C/${category}`} variant="unstyled" textDecoration="none" color="currentColor" boxShadow="bsBoldWhite" p="0.5rem" borderRadius="0 0.5rem" mx="0.2rem" _hover={{boxShadow: "bsBoldSecondary"}}>{category}</Link>))}</Text>
        </Box>
    )
}