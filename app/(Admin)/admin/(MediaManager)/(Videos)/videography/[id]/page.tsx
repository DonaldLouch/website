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
// import EditPhotoData from "./EditVideoData";
import EditVideoData from "./EditVideoData";

type Props = {
    params: { id: string }
};

export default async function EditBlogPost({ params }: Props) {
  const { id } = params
//   console.log(id)
  const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ id: id }).single() as any
  const { data: categoryData } = await supabase.from('VideoCategory').select().order('catSortID', { ascending: true }) as any
  const { data: tagsData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any
  // const { data: locationsData } = await supabase.from('distinct_locations').select() as any
  
  // let locations = new Array()
  // locationsData.forEach((location: any) => {
  //   locations!.push(location.location)
  // })

  // const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('lastUpdatedOn', { ascending: false }) as any

  return <EditVideoData videoData={videoData} categoryData={categoryData} tagsData={tagsData} />
}