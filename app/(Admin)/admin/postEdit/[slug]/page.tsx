import supabase from '@/lib/supabase';
import EditPostContent from '../EditPostContent'
// import createClient from "@/lib/supabase-server"

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: POST | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'Edit blog post. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: POST | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'Edit blog post. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

type Params = Promise<{ slug: string }>

export default async function EditBlogPost({ params }: { params: Params }) {
  const { slug } = await params
  const { data: post } = await supabase.from('BlogPost').select().match({ slug: slug }).single() as any
  const { data: tagsData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any

  return <EditPostContent post={post} tagsData={tagsData} />
}