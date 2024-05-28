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

import supabase from "@/lib/supabase";
import EditPhotoData from "./EditPhotoData";

type Props = {
    params: { id: string }
};

export default async function EditBlogPost({ params }: Props) {
  const { id } = params
//   // console.log(id)
  const { data: photoData } = await supabase.from('Photography').select(`*, fileID ( * )`).match({ id: id }).single() as any
  const { data: locationsData } = await supabase.from('distinct_locations').select() as any
  const { data: tagsData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any
  
  let locations = new Array()
  locationsData.forEach((location: any) => {
    locations!.push(location.location)
  })

  const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('lastUpdatedOn', { ascending: false }) as any

  return <EditPhotoData photoData={photoData} photographyAlbum={photographyAlbum} locations={locations} tagsData={tagsData} />
}