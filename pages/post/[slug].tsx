import {
  Text,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";

import prisma from "../../lib/prisma";

import { Metadata } from "../../components/Metadata";

import { serialize } from "next-mdx-remote/serialize";

import { VideoPostType } from "../../components/PostTypes/VideoPostType";
import { AudioPostType } from "../../components/PostTypes/AudioPostType";
import { StandardPostType } from "../../components/PostTypes/StandardPostType";
import { SpecialPostType } from "../../components/PostTypes/SpecialPostType";
import { GalleryPostType } from "../../components/PostTypes/GalleryPostType";
import { Photo1PostType } from "../../components/PostTypes/Photo1PostType";
import { Photo2PostType } from "../../components/PostTypes/Photo2PostType";
import { Photo3PostType } from "../../components/PostTypes/Photo3PostType";
import { Photo4PostType } from "../../components/PostTypes/Photo4PostType";
import { Photo5PostType } from "../../components/PostTypes/Photo5PostType";

export default function Post({ source, postData }: any) {
  const post = postData;

  const { data: session, status } = useSession();
  const toast = useToast();
  const id = "toastID";

  if (post.postStatus === "Private" && session && status === "authenticated") {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: "Private Blog Post",
        description: `Note that the blog post "${post.title}" is a private post and is only viewable at an administrator level!`,
        status: "error",
        duration: null,
        isClosable: false,
      });
    }
  }

  if (post.postStatus === "Draft" && session && status === "authenticated") {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: "Blog Post is Drafted",
        description: `Note that this blog post is drafted! Don't forget to publish the post to the public when you are ready!`,
        status: "warning",
        duration: null,
        isClosable: false,
      });
    }
  }

  return (
    <>
      <Metadata
        title={`${post.title} | ${process.env.WEBSITE_NAME}`}
        keywords={`${process.env.KEYWORDS}, ${post.tags}`}
        description={`${post.excerpt}`}
      />

      <Box color={useColorModeValue("black", "white")}>
        {post.postStatus === "Public" || post.postStatus === "Unlisted" ? (
          <>
            {post.blogType === "Video" && (
              <VideoPostType {...post} {...source} />
            )}
            {post.blogType === "Audio" && (
              <AudioPostType {...post} {...source} />
            )}
            {post.blogType === "Standard" && (
              <StandardPostType {...post} {...source} />
            )}
            {post.blogType === "Special" && (
              <SpecialPostType {...post} {...source} />
            )}
            {post.blogType === "Gallery" && (
              <GalleryPostType {...post} {...source} />
            )}
            {post.blogType === "Photo 1" && (
              <Photo1PostType {...post} {...source} />
            )}
            {post.blogType === "Photo 2" && (
              <Photo2PostType {...post} {...source} />
            )}
            {post.blogType === "Photo 3" && (
              <Photo3PostType {...post} {...source} />
            )}
            {post.blogType === "Photo 4" && (
              <Photo4PostType {...post} {...source} />
            )}
            {post.blogType === "Photo 5" && (
              <Photo5PostType {...post} {...source} />
            )}
          </>
        ) : (
          <>
            {session && status === "authenticated" ? (
              <>
                {post.blogType === "Video" && (
                  <VideoPostType {...post} {...source} />
                )}
                {post.blogType === "Audio" && (
                  <AudioPostType {...post} {...source} />
                )}
                {post.blogType === "Standard" && (
                  <StandardPostType {...post} {...source} />
                )}
                {post.blogType === "Special" && (
                  <SpecialPostType {...post} {...source} />
                )}
                {post.blogType === "Gallery" && (
                  <GalleryPostType {...post} {...source} />
                )}
                {post.blogType === "Photo 1" && (
                  <Photo1PostType {...post} {...source} />
                )}
                {post.blogType === "Photo 2" && (
                  <Photo2PostType {...post} {...source} />
                )}
                {post.blogType === "Photo 3" && (
                  <Photo3PostType {...post} {...source} />
                )}
                {post.blogType === "Photo 4" && (
                  <Photo4PostType {...post} {...source} />
                )}
              </>
            ) : (
              <Box boxShadow="bsBoldBlue" borderRadius="0 2rem" p="2rem">
                <Text textAlign="center" fontSize="xl">
                  🚨 This post is listed as a private post and is not viewable
                  to the public. 🚨
                </Text>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(router: any) {
  const slug = router.params.slug;

  const postData = await prisma.blogPost.findUnique({
    where: {
      slug: slug,
    },
  });

  await prisma.blogPost.update({
    where: { id: postData?.id },
    data: { views: { increment: 1 } },
  });

  const source = postData?.body as any;

  const mdxSource = await serialize(source);

  return {
    props: {
      postData: JSON.parse(JSON.stringify(postData)),
      source: mdxSource,
    },
  };
}
