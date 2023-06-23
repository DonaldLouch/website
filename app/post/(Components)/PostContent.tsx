import { Suspense } from 'react'

import Loading from '@/app/(Config)/ContentLoading'

import { MdxContent } from '@/app/mdx-content'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
type Post = {
  mdxSource: MDXRemoteSerializeResult
}

async function getPostBody(postContent: string): Promise<Post> {
  const mdxSource = await serialize(postContent, {mdxOptions: {
    development: process.env.NODE_ENV === 'development',
  }})
  return {
    mdxSource
  }
}

export const PostContent = async ( post: any ) => { 
  const { mdxSource } = await getPostBody(post.body!)
  return <Suspense fallback={<Loading />}>
    <MdxContent source={mdxSource} />
  </Suspense> 
}