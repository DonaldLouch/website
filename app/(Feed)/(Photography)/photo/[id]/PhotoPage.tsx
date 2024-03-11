'use client'

import { BreadCrumbPublic } from "@/app/(Components)/BreadCrumbsComponentPublic";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import { MdxContent } from "@/app/mdx-content";
import DisplayDate from "@/lib/DisplayDate";
import {
  Text,
  Box,
  useToast,
  Stack,
  Link,
  Tag,
  TagLabel,
  Heading,
  // useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from 'next/image'
import { BsCalendar2, BsImages, BsPinMap, BsTag, BsTags } from "react-icons/bs";

// import { VideoPostType } from "../(Components)/(PostType)/VideoPostType";
// import { AudioPostType } from "../(Components)/(PostType)/AudioPostType";
// import { StandardPostType } from "../(Components)/(PostType)/StandardPostType";
// import { SpecialPostType } from "../(Components)/(PostType)/SpecialPostType";
// import { GalleryPostType } from "../(Components)/(PostType)/GalleryPostType";
// import { Photo1PostType } from "../(Components)/(PostType)/Photo1PostType";
// import { Photo2PostType } from "../(Components)/(PostType)/Photo2PostType";
// import { Photo3PostType } from "../(Components)/(PostType)/Photo3PostType";
// import { Photo4PostType } from "../(Components)/(PostType)/Photo4PostType";
// import { Photo5PostType } from "../(Components)/(PostType)/Photo5PostType";

export default function PhotoPage({photoData, mdxSource}: any) {
  // console.log("markdown post", mdxSource)
  const toast = useToast();
  const id = "toastID";

  const { album: albumData } = photoData

  const breadCrumbs = [
    {"pageLink": "/feed/photography", "pageName": "Photography Feed"},
    {"pageLink": `/photo/${photoData.id}`, "pageName": `View: ${photoData.photoName}`}
  ]
    
  return (<>
  <Box m="2rem 2rem 1rem" textAlign="left">
    <BreadCrumbPublic breads={breadCrumbs} />
    <Heading as="h2" size="3xl" textDecoration="underline" textDecorationColor="primary" textAlign="left" color="white" mb="1rem" mt="-0.5rem">{photoData.photoName}</Heading>
  </Box>
  <Stack direction={{base:"column", lg:"row"}} gap="2rem" m={{base: "1rem", lg: "2rem"}} width={{base: "calc(100% - 1rem)", lg: "calc(100% - 4rem)"}} justifyItems="flex-start">
    <Stack width={{base: "100%", lg: "50%"}} justifyItems="flex-start" alignItems="flex-start">
        <Box boxShadow="bsWhite">
            <Image src={photoData.fileID.filePath} alt={`${photoData.fileID.fileID}-${photoData.fileID.fileTitle}`} width="3840" height="2160" style={{borderRadius: "0 0.5rem" }} />
        </Box>
    </Stack>
    <Stack width={{base: "100%", lg: "50%"}} maxH="80vh" overflow="scroll">
        {/* <Text boxShadow="bsBoldPrimary" p="2rem" borderRadius="0 2rem">{photoData.fileID.takenOn}</Text> */}
        <Box boxShadow="bsBoldPrimary" p="2rem" m="0.5rem 0.5rem 0" borderRadius="0 2rem" whiteSpace="break-spaces"><MdxContent source={mdxSource} /></Box>
        <Stack direction="row" my="2rem" gap="0.8rem">
              {photoData.album && <Link href="#" variant="unstyled"><Tag size='lg' colorScheme='purple' _hover={{background: "white"}} borderRadius='0 1rem' p="1rem" whiteSpace="normal" wordBreak="break-all" width="fit-content">
                <BsImages />
                {/* <FontAwesomeIcon icon={["fas", "images"]} color="currentColor" height="40%" /> */}
                <TagLabel pl="0.5rem">{albumData.albumName}</TagLabel>
            </Tag></Link>}
            {photoData.location && <Tag size='lg' colorScheme='messenger' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
              <BsPinMap />
                {/* <FontAwesomeIcon icon={["fas", "location-pin"]} color="currentColor" height="40%" /> */}
                <TagLabel pl="0.5rem">{photoData.location}</TagLabel>
            </Tag>}
        </Stack>
        <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" m="-1rem 0 1rem">
            {/* <FontAwesomeIcon icon={["fas", "camera-viewfinder"]} color="currentColor" height="40%" /> */}
            <BsCalendar2 />
            <TagLabel pl="0.5rem"><DisplayDate source={photoData.fileID.takenOn} /></TagLabel>
        </Tag>
        <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem">
            {/* <Box mr="0.3rem" color="secondary">
                <FontAwesomeIcon icon={["fas", "tags"]} color="currentColor" height="40%" />
            </Box> */}
             <BsTags />
            {photoData.tags.map((tag: any) => (
                <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={tag} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                    {/* <FontAwesomeIcon icon={["fas", "tag"]} color="currentColor" height="40%" /> */}
                     <BsTag />
                    <TagLabel pl="0.5rem">{tag}</TagLabel>
                </Tag>
            ))}
        </Stack>
    </Stack>
    </Stack>
      {/* <Box>
        {post.postStatus === "Public" || post.postStatus === "Unlisted" ? (
          <>
            {post.blogType === "Video" && (
              <VideoPostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Audio" && (
              <AudioPostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Standard" && (
              <StandardPostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Special" && (
              <SpecialPostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Gallery" && (
              <GalleryPostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Photo 1" && (
              <Photo1PostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Photo 2" && (
              <Photo2PostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Photo 3" && (
              <Photo3PostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Photo 4" && (
              <Photo4PostType post={post} mdxSource={mdxSource} />
            )}
            {post.blogType === "Photo 5" && (
              <Photo5PostType post={post} mdxSource={mdxSource} />
            )}
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <>
                {post.blogType === "Video" && (
                  <VideoPostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Audio" && (
                  <AudioPostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Standard" && (
                  <StandardPostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Special" && (
                  <SpecialPostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Gallery" && (
                  <GalleryPostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Photo 1" && (
                  <Photo1PostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Photo 2" && (
                  <Photo2PostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Photo 3" && (
                  <Photo3PostType post={post} mdxSource={mdxSource} />
                )}
                {post.blogType === "Photo 4" && (
                  <Photo4PostType post={post} mdxSource={mdxSource} />
                )}
              </>
            ) : ( 
              <Box boxShadow="bsBoldPrimary" borderRadius="0 2rem" p="2rem">
                <Text textAlign="center" fontSize="xl">
                  🚨 This post is listed as a private post and is not viewable
                  to the public. 🚨
                </Text>
              </Box>
             )} 
          </>
        )}
      </Box> */}
  </>)
}