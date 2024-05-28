import supabase from "@/lib/supabase";

import { serialize } from "next-mdx-remote-client/serialize"

import { AlbumPage } from "./AlbumPage";

import { Metadata } from 'next';
type Props = {
    params: { id: string }
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const {data: postMeta} = await supabase.from('PhotographyAlbum').select('albumName,albumCaption, id, slug').match({ slug: id }).single() as any
    const { data: allPhotoData } = await supabase.from('Photography').select(`*, fileID (*)`).match({ isPublic: true, isSetup: true, album: postMeta.id }) as any
      let tags = new Array()
        allPhotoData.forEach((photo: any) => {
            const photoTags = photo.tags
            
            photoTags.forEach((tag: any) => {
                !tags.includes(tag) && tags.push(tag)
            })
        })
    return {
      title: `${postMeta.albumName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: postMeta.albumCaption,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${tags}`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/album/${postMeta.id}`,
          title: `${postMeta.albumName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: postMeta.albumCaption,
          images: [{
              url: allPhotoData[0].fileID.filePath,
          }],
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/album/${postMeta.id}`, creator: "@DonaldLouch", images: allPhotoData[0].fileID.filePath },
      appleWebApp: { title: `${postMeta.albumName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}

export default async function Album({ params }: Props) {
  // const {userId, sessionId} = auth() 
  // const isLoggedIn = userId && sessionId ? true : false
    const postLimit = 20 as number
    const { id } = params
    const { data: albumData } = await supabase.from('PhotographyAlbum').select().match({ slug: id}).single() as any
    const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).limit(postLimit).order('takenOn', { ascending: true }) as any
    const mdxSource = await serialize({source: albumData.albumCaption ? albumData.albumCaption : "No caption has been posted yet."})

    const { data: allPhotoData } = await supabase.from('Photography').select(`*, fileID (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).order('uploadedOn', { ascending: true }) as any
    let locations = new Array()
    let tags = new Array()
    allPhotoData.forEach((photo: any) => {
        const photoTags = photo.tags
        const photoLocation = photo.location
        
        photoTags.forEach((tag: any) => {
            !tags.includes(tag) && tags.push(tag)
        })
        !locations.includes(photoLocation) && locations.push(photoLocation)
    })
    
    const { count: photoCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, album: albumData.id })

    // // console.log(photoCount)

    return <AlbumPage albumData={albumData} photoData={photoData} mdxSource={mdxSource} locations={locations} tags={tags} getPhotoCount={photoCount} />
}