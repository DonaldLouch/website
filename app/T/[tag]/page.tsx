import createClient from "@/lib/supabase-server"

import { Metadata } from 'next'
import TagContent from "./TagContent";
type Props = {
    params: { tag: string }
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tag } = params
    const supabase = createClient()
    const {count: postCount} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('tags', `%${tag}%`).match({ postStatus: 'Public' }) as any
    return {
      title: `(${postCount}) ${tag} | ${process.env.WEBSITE_NAME}`,
      description: `Blog posts by Donald Louch that are flagged with the tag ${tag}`,
      openGraph: {
          url: `${process.env.SITE_URL}/T/${tag}`,
          title: `(${postCount}) ${tag} | ${process.env.WEBSITE_NAME}`,
          description: `Blog posts by Donald Louch that are flagged with the tag ${tag}`,
      },
      twitter: { site: `${process.env.SITE_URL}/T/${tag}` },
      appleWebApp: { title: `(${postCount}) ${tag} | ${process.env.WEBSITE_NAME}` }
    }
}

export default function Tag({ params }: Props) {
  const { tag } = params
  return <TagContent tag={tag} />
}