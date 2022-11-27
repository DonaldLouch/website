import { AspectRatio, Card, Heading, Link, Stack, useColorModeValue, Image, Text, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PinnedPostsCard(post: {
    id: string,
    slug: string,
    thumbnail: string,
    title: string,
    postedOn: any
}) {
  return (
    <Link href={`/post/${post.slug}`}>
        <Card bg="none" boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")} borderRadius="0 2rem" m="1rem 2rem" key={post.id} direction={{base: "column", md:"row"}} gap="1.5rem" alignItems="center" textAlign={{base: "center", md: "initial"}} pb={{base: "1rem", md: "0"}} pos="relative">
            <Box color={useColorModeValue("black", "white")}pos="absolute" w="2%" zIndex="2" top="-15%" left="-1%" transform="rotate(-25deg)" display={{base: "none", md: 'initial'}}><FontAwesomeIcon icon={['fal', 'thumbtack']} color="currentColor" height={"100%"}/></Box>
            <AspectRatio
                ratio={16/9}
                w={{base: "100%", md: "20vw", lg:"15%"}}
                overflow="hidden"
                bg="mainGradient"
                borderBottomLeftRadius={{base: "0", md:"2rem"}}
                borderTopRightRadius={{base: "2rem", md:"0"}}
            >
                <Image src={post.thumbnail} alt={post.title}/>
            </AspectRatio>
            <Stack whiteSpace={{base: "initial", md: "nowrap"}} overflowX="scroll" w="60%">
                <Heading>{post.title}</Heading>
                <Text textShadow="3px 2px 4px rgb(193 93 79 / 20%)" fontSize="sm" color="gray.500" mt="2rem">Posted On: {`${new Date(post?.postedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(post?.postedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}</Text>
            </Stack>
        </Card>
    </Link>
  )
}
