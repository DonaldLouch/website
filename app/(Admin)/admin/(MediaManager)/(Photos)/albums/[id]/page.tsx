import supabase from "@/lib/supabase"
import { serialize } from "next-mdx-remote-client/serialize"
import EditAlbumData from "./EditAlbumData"

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

type Params = Promise<{ id: string }>

export default async function EditAlbum({ params }: { params: Params }) {
  const { id } = await params

  const postLimit = 12 as number
  const { data: albumData } = await supabase.from('PhotographyAlbum').select().match({id: id}).single() as any

  const { count: photosCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, album: albumData.id })
  const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).limit(postLimit).order('capturedOn', { ascending: true }) as any

  const mdxSource = await serialize({source: albumData.albumCaption ? albumData.albumCaption : "No caption has been posted yet."})

  const { data: locationsData } = await supabase.from('distinct_locations').select() as any
  const { data: tagsData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any

  let locations = new Array()
  locationsData.forEach((location: any) => {
    locations!.push(location.location)
  })

  return <EditAlbumData photoData={photoData} albumData={albumData} locations={locations} mdxSource={mdxSource} photosCount={photosCount} tagsData={tagsData} />
}