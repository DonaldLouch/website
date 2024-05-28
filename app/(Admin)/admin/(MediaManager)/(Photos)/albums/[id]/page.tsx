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

type Props = {
    params: { id: string }
};

export default async function EditBlogPost({ params }: Props) {
  const { id } = params
//   // console.log(id)

  const { data: albumData } = await supabase.from('PhotographyAlbum').select().match({id: id}).single() as any
  const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).order('photoName', { ascending: true }) as any
  // const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).order('takenOn', { ascending: true }) as any
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

  return <EditAlbumData photoData={photoData} albumData={albumData} locations={locations} mdxSource={mdxSource} />
}