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

import { serialize } from "next-mdx-remote-client/serialize"

import supabase from "@/lib/supabase";
import EditAlbumData from "./EditAlbumData";

// type Props = {
//     params: { id: any }
// };

export default async function EditBlogPost({ params }: { params: { id: string } }) {
  const { id } = params
//   // console.log(id)

  const postLimit = 15 as number
  
  // .limit(postLimit)
  
  // searchType && searchValue && searchType === "view" && searchValue === "pinned" ? query.match({ isPublic: true, isSetup: true, isPinned: true }) : query.match({ isPublic: true, isSetup: true })
  
  const { data: albumData } = await supabase.from('PhotographyAlbum').select().match({id: id}).single() as any

  const { count: photosCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, album: albumData.id })
  const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).limit(postLimit).order('photoName', { ascending: true }) as any
  // const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).order('capturedOn', { ascending: true }) as any
  // options:{
  //   development: process.env.NODE_ENV === 'development',
  // }
  const mdxSource = await serialize({source: albumData.albumCaption ? albumData.albumCaption : "No caption has been posted yet."})
  
  const { data: locationsData } = await supabase.from('distinct_locations').select() as any
  
  let locations = new Array()
  locationsData.forEach((location: any) => {
    locations!.push(location.location)
  })

  // const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('lastUpdatedOn', { ascending: false }) as any

  return <EditAlbumData photoData={photoData} albumData={albumData} locations={locations} mdxSource={mdxSource} photosCount={photosCount} />
}