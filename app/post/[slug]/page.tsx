import supabase from "@/lib/supabase";
import PostPage from "./PostPage";

import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Metadata } from 'next';
type Props = {
    params: { slug: string }
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params
    const {data: postMeta} = await supabase.from('BlogPost').select('title,excerpt,thumbnail,tags,categories,slug').match({ slug: slug }).single() as any
    return {
      title: `${postMeta.title} | ${process.env.WEBSITE_NAME}`,
      description: postMeta.excerpt,
      keywords: `${process.env.KEYWORDS}, ${postMeta.tags}, ${postMeta.categories}`,
      openGraph: {
          url: `${process.env.SITE_URL}/post/${postMeta.slug}`,
          title: `${postMeta.title} | ${process.env.WEBSITE_NAME}`,
          description: postMeta.excerpt,
          images: [{
              url: postMeta.thumbnail,
          }],
      },
      twitter: { site: `${process.env.SITE_URL}/post/${postMeta.slug}`, creator: "@DonaldLouch", images: postMeta.thumbnail },
      appleWebApp: { title: `${postMeta.title} | ${process.env.WEBSITE_NAME}` }
    }
}

export default async function Post({ params }: Props) {
  const { slug } = params
  const { data: post } = await supabase.from('BlogPost').select().match({ slug: slug }).single() as any
  const mdxSource = await serialize(post.body!, {mdxOptions: {
    development: process.env.NODE_ENV === 'development',
  }}) as MDXRemoteSerializeResult
  return <PostPage post={post} mdxSource={mdxSource} />
}