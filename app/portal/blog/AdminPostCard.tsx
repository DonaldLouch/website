import { AspectRatio, Heading, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminPostCard({ id, slug, title, thumbnail, categories, postedOn, lastUpdatedOn }: any) {
  return (
    <Box 
        key={id} 
        id={id} 
        as="article"
        filter="opacity(98%)" 
        p="2rem" 
        borderRadius="0 3rem" 
        w="100%"
        mb="2rem" 
        bg="blurredBackground"
        boxShadow="bsBoldBlue"
        _hover={{boxShadow: "bsBigBoldWhite"}}
        color="white"
    >
        <Link href={`postEdit/${slug}`}>
        <AspectRatio
            ratio={16/9}
            w="calc(100% + 4rem) "
            m="-2rem"
            mb="1rem"
            overflow="hidden"
            bg="mainGradient"
            borderRadius="0 3rem 0 0"
        >
            <Image src={thumbnail} alt={title} width="300" height="300" />
        </AspectRatio>
        <Heading as="h2" size="md" fontWeight="bold" mt="2rem" textTransform="uppercase" color="primary">{categories}</Heading>
        <Heading as="h2" size="xl" fontWeight="bold" color="white">{title}</Heading>
        <Text textShadow="3px 2px 4px rgb(193 93 79 / 20%)" fontSize="sm" color="gray.500">Posted On: {`${new Date(postedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(postedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`} | Last Updated: {`${new Date(lastUpdatedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(lastUpdatedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}</Text>
        </Link>
    </Box>
  )
}
