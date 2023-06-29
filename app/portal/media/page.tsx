// 'use server'

import supabase from '@/lib/supabase'
import MediaManager from './MediaManager'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.WEBSITE_NAME} Media Manager`,
//     description: 'The media manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.WEBSITE_NAME} Media Manager`,
//         description: 'The media manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

type Props = {
    params: { pg: string },
}

export default async function Media({params}: Props) {
  let page = parseInt(params.pg) as number
  let currentPage = (((page) - 1) as number) || 0

  const postLimit = 15 as number
  const {count: postLength} = await supabase.from('Media').select("*", { count: 'exact'}) as any
  let numberOfPages = (postLength / postLimit) as number;

  if (!Number.isInteger(numberOfPages)) {
    numberOfPages = Math.floor(numberOfPages) + 1;
  }

  if (numberOfPages < page) {
    currentPage = numberOfPages;
  }
  const pageCalc = currentPage * postLimit
  const { data: theMediaData } = await supabase.from('Media').select().order('uploadedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))

  const paginationArray = new Array()
  paginationArray.push(numberOfPages, currentPage)

  return <MediaManager mediaData={theMediaData} pagination={paginationArray} />
}