import { Metadata } from 'next'
import CategoryContent from "./CategoryContent";
import supabase from "@/lib/supabase";

type Props = {
    params: { category: string }
    searchParams: { pg: string }
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = params
    const {count: postCount} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('categories', `%${category}%`).match({ postStatus: 'Public' }) as any
    return {
      title: `(${postCount}) ${category} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: `Blog posts by Donald Louch that are flagged with the category ${category}`,
      openGraph: {
          url: `${process.env.SITE_URL}/C/${category}`,
          title: `(${postCount}) ${category} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: `Blog posts by Donald Louch that are flagged with the category ${category}`,
      },
      twitter: { site: `${process.env.SITE_URL}/C/${category}` },
      appleWebApp: { title: `(${postCount}) ${category} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}

export default async function Category({ params, searchParams }: Props) {
  const { category } = params

  
  let page = parseInt(searchParams.pg) as number
  let currentPage = (((page) - 1) as number) || 0

  const postLimit = 12 as number
  const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('categories', `%${category}%`).match({ postStatus: 'Public' }) as any
  let numberOfPages = (postLength / postLimit) as number;

  if (!Number.isInteger(numberOfPages)) {
      numberOfPages = Math.floor(numberOfPages) + 1;
  }

  if (numberOfPages < page) {
      currentPage = numberOfPages;
  }
  const pageCalc = currentPage * postLimit
  const { data: postData } = await supabase.from('BlogPost').select().ilike('categories', `%${category}%`).match({ postStatus: 'Public' }).order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))
  
  const paginationArray = new Array();
  paginationArray.push(numberOfPages, currentPage);

  return <CategoryContent posts={postData} pagination={paginationArray} postsNumber={postLength} category={category} />
}