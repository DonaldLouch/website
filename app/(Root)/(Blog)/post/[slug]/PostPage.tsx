'use client'

import {
  Text,
  Box,
  Paper,
  Stack,
  Group,
  Title,
  // useToast,
  // useToast,
} from "@mantine/core";

import { StandardPostType } from "../(Components)/StandardPostType";
import { Alert02Icon, ArrowLeft02Icon } from "@hugeicons/react";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { useUser } from "@clerk/nextjs";

export default function PostPage({post, mdxSource, isLoggedIn}: any) {
  
  // post.postStatus === "Private" && isLoggedIn && !toast.isActive(id) &&
  //   toast({
  //     id,
  //     title: "Private Blog Post",
  //     description: `Note that the blog post "${post.title}" is a private post and is only viewable at an administrator level!`,
  //     status: "error",
  //     duration: null,
  //     isClosable: false,
  //   })
  
  // post.postStatus === "Draft" && isLoggedIn && !toast.isActive(id) &&
  //   toast({
  //     id,
  //     title: "Blog Post is Drafted",
  //     description: `Note that this blog post is drafted! Don't forget to publish the post to the public when you are ready!`,
  //     status: "warning",
  //     duration: null,
  //     isClosable: false,
  //   })
    
  return (
    <>
      <Box>
        {post.postStatus === "Public" || post.postStatus === "Unlisted" ?  <StandardPostType post={post} mdxSource={mdxSource} /> : 
        isLoggedIn ? <StandardPostType post={post} mdxSource={mdxSource} /> : ( 
              <Paper p="2rem" color="white" bg="none" shadow="bsBoldSecondary" radius="lg">
                <Stack align="center">
                <Group gap="2rem" align="center">
                    <Alert02Icon size="4rem" color="red" />
                    <Title order={1} fz={{base: "2rem", md: "3rem"}}>Private Post</Title>
                </Group>
                <Text>🚨 This post is listed as a private post and is not viewable
                  to the public. 🚨</Text>
                  <PrimaryLinkedButton link="/blog" icon={<ArrowLeft02Icon />}>Go Back To The Blog Feed</PrimaryLinkedButton>
                </Stack>
            </Paper>    
        )}
      </Box>
    </>
  )
}