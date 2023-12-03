// 'use server'

import supabase from '@/lib/supabase'
import MediaManager from '../photography/PhotographyManager'
import AlbumManager from './AlbumManager'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Media Manager`,
//     description: 'The media manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Media Manager`,
//         description: 'The media manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

// type Props = {
//     searchParams: { pg: string },
// }

export default async function Media() {  
  // {searchParams}: Props
  // let page = parseInt(searchParams.pg) as number
  // let currentPage = (((page) - 1) as number) || 0

  // const postLimit = 15 as number
  // const {count: postLength} = await supabase.from('Photography').select("*", { count: 'exact'}) as any
  // let numberOfPages = (postLength / postLimit) as number;

  // if (!Number.isInteger(numberOfPages)) {
  //   numberOfPages = Math.floor(numberOfPages) + 1;
  // }

  // if (numberOfPages < page) {
  //   currentPage = numberOfPages;
  // }
  // const pageCalc = currentPage * postLimit
  // const { data: theMediaData } = await supabase.from('Photography').select(`*, fileID ( * )`).order('lastUpdatedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1)) as any
  // const { data: theMediaData } = await supabase.from('Photography').select(`*, fileID ( * )`).order('photoName', { ascending: true }).match({ isSetup: false }) as any

  // clnm4drg60008nnfk4mea2slp
  // clnm4kjxy002rnnfkhk7kdbl8 

  // const { data: theMediaData } = await supabase.from('Photography').select(`*, fileID ( * )`).order('fileID.takenON', { ascending: true }).match({ isSetup: false }) as any
  // const { data: theMediaData } = await supabase.from('Photography').select(`*, fileID ( * )`).order('photoName', { ascending: true }).match({ location: "Vancouver, British Columbia, Canada" }) as any

  //  const { data: locationsData } = await supabase.from('distinct_locations').select() as any
  
  // let locations = new Array()
  // locationsData.forEach((location: any) => {
  //   locations!.push(location.location)
  // })

  // const paginationArray = new Array()
  // paginationArray.push(numberOfPages, currentPage)

  const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('lastUpdatedOn', { ascending: false }) as any
  
  return <AlbumManager photographyAlbum={photographyAlbum}/>
}