import createClient from "@/lib/supabase-server"

import { Metadata } from 'next'
import CategoryContent from "./CategoryContent";

type Props = {
    params: { category: string }
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = params
    const supabase = createClient()
    const {count: postCount} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('categories', `%${category}%`).match({ postStatus: 'Public' }) as any
    return {
      title: `(${postCount}) ${category} | ${process.env.WEBSITE_NAME}`,
      description: `Blog posts by Donald Louch that are flagged with the category ${category}`,
      openGraph: {
          url: `${process.env.SITE_URL}/C/${category}`,
          title: `(${postCount}) ${category} | ${process.env.WEBSITE_NAME}`,
          description: `Blog posts by Donald Louch that are flagged with the category ${category}`,
      },
      twitter: { site: `${process.env.SITE_URL}/C/${category}` },
      appleWebApp: { title: `(${postCount}) ${category} | ${process.env.WEBSITE_NAME}` }
    }
}

export default function Category({ params }: Props) {
  const { category } = params
  return <CategoryContent category={category} />
}