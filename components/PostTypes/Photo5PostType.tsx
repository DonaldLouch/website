import { 
    Box,
    Image,
    Link,
    Heading,
    // Text,
    // AspectRatio,
    // Stack,
    // Link
    // Stack,
    // Button,
    // Grid
  } from '@chakra-ui/react'

  import { PostCard } from '../Cards/PostCard'
  import { TagsCard } from '../Cards/TagsCard'
  import { SidebarCard } from '../Cards/SidebarCard'
  import { PostContent } from '../PostContent'
import { ImageMetaDataCard } from '../Cards/ImageMetaDataCard'

  
  
  export const Photo5PostType = (post: any, source: any) => {
    // const postedData = new Date(post.postedOn)
    // const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    // const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    // const postedOn = postedDay +" at " + postedTime

   const gallerySplit = post?.media?.split(' || ')
    
    // console.log(gallerySplit)

      return (
          <>
          <Box 
            as="section" 
            id="photoShowcase" 
            // padding="4rem 0.3rem 0.5rem"
            padding={{base: "4rem 4.4rem 0", lg: "3.4rem 0.4rem 0"}}
            w="calc(100% + 10rem)"
            // w={{base: "calc(100vw + 4rem)", lg: "100vw"}}
            // maxW="calc(100vw + 10rem)"
            m="-5rem"
            sx={{ columnCount: {base:"1", md: "2", lg: "3"}, gap: "0.4rem", columnWidth: {base: "100%", md: "50% 50%", lg: "33.3% 33.3% 33.3%"}}}
            // gridTemplateColumns={{base: "100%", md: "50% 50%", lg: "25% 25% 25% 25%"}}
            bg="mainGradient"
        >
            {gallerySplit?.map((image: any) => (
                <Link key={image.index} href={image.split(';;')?.[0]} isExternal>
                    <Image src={image.split(';;')?.[0]} alt={image.split(';;')?.[1]} _hover={{background: "backgroundGradient", opacity: "0.6"}} display="inherit"></Image>
                </Link>
            ))}
           
        </Box>

            {/* <Box pt={{base: "45%", md: "87vh", lg: "87vh", xl: "89vh"}}></Box> */}
            <PostCard>
            <ImageMetaDataCard {...post} />
            {/* <Box 
                    // pos="absolute"
                    // top={{ base: "30vw", md:"5vw" }}
                    fontSize="0.8rem" 
                    bg="backgroundGradient"
                    color="white"
                    p="1rem"
                    m="4rem 0 1.5rem"
                    borderRadius="0 2rem"
                    // animation={metaAnimation}
                >
                    <Heading as="h1" fontSize="3rem" fontWeight="900" my="0.5rem" ml="0.9rem">{post.title}</Heading>
                    <Text fontSize="1rem">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: <Link href={`/C/${post.categories}`}>{post.categories}</Link></Text>
                </Box> */}
                <Heading as="h2" fontSize="2.5rem" fontWeight="300" m="0 0 2rem" pl="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)" borderLeft="0.1rem solid grey">{post.headingText}</Heading>
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
  