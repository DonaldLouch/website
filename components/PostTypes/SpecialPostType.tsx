import { 
    Box,
    Image,
    Text,
    keyframes,
    usePrefersReducedMotion,
    Heading,
    Link,
    // Stack,
    // Button,
    // Grid
  } from '@chakra-ui/react'

  import { PostCard } from '../Cards/PostCard'
  import { TagsCard } from '../Cards/TagsCard'
  import { SidebarCard } from '../Cards/SidebarCard'
  import { PostContent } from '../PostContent'

  const meta = keyframes `
        0% {
        left: -30vw;
        }
        100% {
        left: 0;
        }
    `
  
  export const SpecialPostType = (post: any, source: any) => {
    // const post = post

    const prefersReducedMotion = usePrefersReducedMotion()
    const metaAnimation = prefersReducedMotion
    ? undefined
    : `${meta} ease 2s`

    const postedData = new Date(post.postedOn)
    const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const postedOn = postedDay +" at " + postedTime

      return (
          <>
            <Box 
                as="section" 
                id="thumbWrap" 
                pos="absolute"
                top="0"
                left="0"
                //   filter="opacity(80%)" 
                //   p="2rem" 
                //   borderRadius="0 3rem 0 3rem" 
                //   mb="2rem" 
                //   bg={useColorModeValue(stylesForComp.background.bgLight, stylesForComp.background.bgDark)}
                //   boxShadow={useColorModeValue(stylesForComp.boxShadow.bsLight, stylesForComp.boxShadow.bsDark)}
                //   color={useColorModeValue('black', 'white')}
            >
                <Image src={post.thumbnail} alt={post.title} w="100vw" maxH="100vh"/>
                <Box 
                    pos="absolute"
                    top={{ base: "30vw", md:"5vw" }}
                    fontSize="0.8rem" 
                    bg="backgroundGradient"
                    color="white"
                    p="1rem"
                    animation={metaAnimation}
                >
                    <Heading as="h1" fontSize="3rem" fontWeight="900" my="0.5rem">{post.title}</Heading>
                    <Text fontSize="1rem">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: <Link href={`/C/${post.categories}`}>{post.categories}</Link></Text>
                </Box>
            </Box>

            <Box pt={{base: "43vh", md: "55vw", lg: "60vw", xl: "89vh"}}></Box>

            <PostCard>
                {post.sidebar === true ? (
                    <>
                        <SidebarCard {...post} {...source} />
                        <TagsCard {...post} />
                    </>
                ) : (
                    <>
                        <PostContent {...post} {...source} />
                        <TagsCard {...post} />
                    </>
                )}
            </PostCard>
          </>
      )
  }
  