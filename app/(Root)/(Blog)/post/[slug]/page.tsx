import supabase from "@/lib/supabase";
import PostPage from "./PostPage";

import { serialize } from "next-mdx-remote-client/serialize"

import { Metadata } from 'next';
import { auth, currentUser } from "@clerk/nextjs/server";

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params

    const {data: postMeta} = await supabase.from('BlogPost').select('title,excerpt,thumbnail,tags,category,slug').match({ slug: slug }).single() as any
    return {
      title: `${postMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: postMeta.excerpt,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${postMeta.tags}, ${postMeta.category}`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postMeta.slug}`,
          title: `${postMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: postMeta.excerpt,
          images: [{
              url: postMeta.thumbnail,
          }],
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postMeta.slug}`, creator: "@DonaldLouch", images: postMeta.thumbnail },
      appleWebApp: { title: `${postMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}

export default async function Post({ params }: { params: Params }) {
    const {userId, sessionId} = await auth()

    const isLoggedIn = userId && sessionId ? true : false

    const { slug } = await params
    const { data: post } = await supabase.from('BlogPost').select().match({ slug: slug }).single() as any
    const mdxSource = await serialize({source: post?.body})

    return <PostPage post={post} mdxSource={mdxSource} isLoggedIn={isLoggedIn} />
}