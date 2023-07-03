'use client'

import {
  Text,
  Box,
  // useToast,
} from "@chakra-ui/react";

import { VideoPostType } from "../(Components)/(PostType)/VideoPostType";
import { AudioPostType } from "../(Components)/(PostType)/AudioPostType";
import { StandardPostType } from "../(Components)/(PostType)/StandardPostType";
import { SpecialPostType } from "../(Components)/(PostType)/SpecialPostType";
import { GalleryPostType } from "../(Components)/(PostType)/GalleryPostType";
import { Photo1PostType } from "../(Components)/(PostType)/Photo1PostType";
import { Photo2PostType } from "../(Components)/(PostType)/Photo2PostType";
import { Photo3PostType } from "../(Components)/(PostType)/Photo3PostType";
import { Photo4PostType } from "../(Components)/(PostType)/Photo4PostType";
import { Photo5PostType } from "../(Components)/(PostType)/Photo5PostType";

export default function PostPage({post}: any) {
  // const toast = useToast();
  // const id = "toastID";

  // const post = props[0]
  // const {loggedIn} = props

  // console.log(post)

  // if (post.postStatus === "Private" && loggedIn) {
  //   if (!toast.isActive(id)) {
  //     toast({
  //       id,
  //       title: "Private Blog Post",
  //       description: `Note that the blog post "${post.title}" is a private post and is only viewable at an administrator level!`,
  //       status: "error",
  //       duration: null,
  //       isClosable: false,
  //     });
  //   }
  // }

  // if (post.postStatus === "Draft" && loggedIn) {
  //   if (!toast.isActive(id)) {
  //     toast({
  //       id,
  //       title: "Blog Post is Drafted",
  //       description: `Note that this blog post is drafted! Don't forget to publish the post to the public when you are ready!`,
  //       status: "warning",
  //       duration: null,
  //       isClosable: false,
  //     });
  //   }
  // }

  return (
    <>
      <Box>
        {post.postStatus === "Public" || post.postStatus === "Unlisted" ? (
          <>
            {post.blogType === "Video" && (
              <VideoPostType {...post} />
            )}
            {post.blogType === "Audio" && (
              <AudioPostType {...post} />
            )}
            {post.blogType === "Standard" && (
              <StandardPostType {...post} />
            )}
            {post.blogType === "Special" && (
              <SpecialPostType {...post} />
            )}
            {post.blogType === "Gallery" && (
              <GalleryPostType {...post} />
            )}
            {post.blogType === "Photo 1" && (
              <Photo1PostType {...post} />
            )}
            {post.blogType === "Photo 2" && (
              <Photo2PostType {...post} />
            )}
            {post.blogType === "Photo 3" && (
              <Photo3PostType {...post} />
            )}
            {post.blogType === "Photo 4" && (
              <Photo4PostType {...post} />
            )}
            {post.blogType === "Photo 5" && (
              <Photo5PostType {...post} />
            )}
          </>
        ) : (
          <>
            {/* {loggedIn ? (
              <>
                {post.blogType === "Video" && (
                  <VideoPostType {...post} />
                )}
                {post.blogType === "Audio" && (
                  <AudioPostType {...post} />
                )}
                {post.blogType === "Standard" && (
                  <StandardPostType {...post} />
                )}
                {post.blogType === "Special" && (
                  <SpecialPostType {...post} />
                )}
                {post.blogType === "Gallery" && (
                  <GalleryPostType {...post} />
                )}
                {post.blogType === "Photo 1" && (
                  <Photo1PostType {...post} />
                )}
                {post.blogType === "Photo 2" && (
                  <Photo2PostType {...post} />
                )}
                {post.blogType === "Photo 3" && (
                  <Photo3PostType {...post} />
                )}
                {post.blogType === "Photo 4" && (
                  <Photo4PostType {...post} />
                )}
              </>
            ) : ( */}
              <Box boxShadow="bsBoldPrimary" borderRadius="0 2rem" p="2rem">
                <Text textAlign="center" fontSize="xl">
                  🚨 This post is listed as a private post and is not viewable
                  to the public. 🚨
                </Text>
              </Box>
            {/* )} */}
          </>
        )}
      </Box>
    </>
  )
}