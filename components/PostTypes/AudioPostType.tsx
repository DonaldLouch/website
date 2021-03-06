import { 
    Box,
    Heading,
    AspectRatio,
    Stack
  } from '@chakra-ui/react'

  import { PostCard } from '../Cards/PostCard'
  import { TagsCard } from '../Cards/TagsCard'
  import { SidebarCard } from '../Cards/SidebarCard'
  import { MetaDataCard } from '../Cards/MetaDataCard'
  import { PostContent } from '../PostContent'
  
  export const AudioPostType = (post: any, source: any) => {
      return (
          <>
          <Box bg="white"pos="absolute" top="0" left="0" w="100vw" justifyContent="center" alignItems="center" h={{base: "60vw", md:"100vh"}} zIndex="banner"></Box>
          <Stack bg="mainGradient" pos="absolute" top="0" left="0" w="100vw" justifyContent="center" alignItems="center" h={{base: "60vw", md:"100vh"}} zIndex="banner">
            <AspectRatio 
                ratio={16/9}
                // w={{base: "calc(100% - -6rem);", xl: "95%"}}
                w="88%"
                m={{ base: "0 -4rem", xl: "0"}}
                overflow="hidden"
                zIndex="10000"
                bg="mainGradient"
                // borderRadius="0 2rem"
            >
                <iframe src={post?.media}></iframe>
            </AspectRatio>
        </Stack>

            <Box pt={{base: "45%", md: "87vh", lg: "87vh", xl: "89vh"}}></Box>

            <PostCard>
                <Heading as="h2" fontSize="2.5rem" fontWeight="300" m="0 0 2rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)" textAlign="center" mt="4.5rem">{post.headingText}</Heading>
                {post.sidebar === true ? (
                    <>
                        <SidebarCard {...post} {...source} />
                        <MetaDataCard {...post} />
                        <TagsCard {...post} />
                    </>
                ) : (
                    <>
                        <PostContent {...post} {...source} />
                        <MetaDataCard {...post} />
                        <TagsCard {...post} />
                    </>
                )}
            </PostCard>
          </>
      )
  }
  