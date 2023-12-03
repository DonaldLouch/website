import supabase from '@/lib/supabase'
import BlogContent from './BlogContent'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Blog Posts`,
//     description: 'The blog posts manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Blog Posts`,
//         description: 'The blog posts manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

type Props = {
    searchParams: { pg: string },
}

export default async function PortalBlog({searchParams}: Props) {
  let page = parseInt(searchParams.pg) as number
  let currentPage = (((page) - 1) as number) || 0

  const postLimit = 10 as number
  const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}) as any
  let numberOfPages = (postLength / postLimit) as number;

  if (!Number.isInteger(numberOfPages)) {
    numberOfPages = Math.floor(numberOfPages) + 1;
  }

  if (numberOfPages < page) {
    currentPage = numberOfPages;
  }
  const pageCalc = currentPage * postLimit
  const { data: theBlogData } = await supabase.from('BlogPost').select().order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))

  const paginationArray = new Array();
  paginationArray.push(numberOfPages, currentPage);

  return <BlogContent posts={theBlogData} pagination={paginationArray} />
}