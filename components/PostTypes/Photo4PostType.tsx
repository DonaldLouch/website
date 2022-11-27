import { 
    Box,
    Image,
    Link,
    Heading
  } from '@chakra-ui/react'

  import { PostCard } from '../Cards/PostCard'
  import { TagsCard } from '../Cards/TagsCard'
  import { SidebarCard } from '../Cards/SidebarCard'
  import { PostContent } from '../PostContent'
import { ImageMetaDataCard } from '../Cards/ImageMetaDataCard'
  
  export const Photo4PostType = (post: any, source: any) => {
   const gallerySplit = post?.media?.split(' || ')
      return (
          <>
          <Box 
            as="section" 
            id="photoShowcase" 
            padding={{base: "6rem 4.4rem 0", lg: "5.4rem 0.4rem 0"}}
            w="calc(100% + 10rem)"
            m="-5rem"
            sx={{ columnCount: {base:"1", md: "2"}, gap: "0.4rem", columnWidth: {base: "100%", md: "50% 50%"}}}
            bg="mainGradient"
        >
            {gallerySplit?.map((image: any) => (
                <Link key={image.index} href={image.split(';;')?.[0]}>
                    <Image src={image.split(';;')?.[0]} alt={image.split(';;')?.[1]} _hover={{background: "backgroundGradient", opacity: "0.6"}} display="inherit"></Image>
                </Link>
            ))}
        </Box>
            <PostCard>
            <ImageMetaDataCard {...post} />
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
  