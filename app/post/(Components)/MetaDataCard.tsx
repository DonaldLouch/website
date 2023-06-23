'use client'

import { Box, Text } from '@chakra-ui/react'

import Link from 'next/link'

export const MetaDataCard = (post: any) => {
    const postedData = new Date(post.postedOn)
    const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const categorySplit = post.categories.split(",")

    const postedOn = postedDay +" at " + postedTime
    return (
        <Box bg="backgroundGradient" p="0.5rem 1.5rem" my="1.5rem" color="white" borderRadius="0 2rem">
            <Text fontSize="1rem" color="white">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: {categorySplit.map((category: any) => (<Link key={category}href={`/C/${category}`} style={{textDecoration: "none", color: "currentColor"}}><Text boxShadow="bsBoldWhite" p="0.5rem" borderRadius="0 0.5rem" mx="0.2rem" _hover={{boxShadow: "bsBoldOrange"}}>{category}</Text></Link>))}</Text>
        </Box>
    )
}