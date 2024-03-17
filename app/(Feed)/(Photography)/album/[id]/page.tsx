import supabase from "@/lib/supabase";

import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Metadata } from 'next';
import { AlbumPage } from "./AlbumPage";
type Props = {
    params: { id: string }
};
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const { id } = params
//     const {data: photoMeta} = await supabase.from('PhotographyAlbum').select('id,albumName,albumCaption,fileID (filePath)').match({ slug: id }).single() as any
//     return {
//       title: `${photoMeta.albumName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//       description: photoMeta.albumCaption,
//     //   keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${photoMeta.tags}`,
//       openGraph: {
//           url: `${process.env.SITE_URL}/photo/${photoMeta.id}`,
//           title: `${photoMeta.albumName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//           description: photoMeta.albumCaption,
//         //   images: [{
//         //       url: photoMeta.fileID.filePath,
//         //   }],
//       },
//       twitter: { site: `${process.env.SITE_URL}/album/${photoMeta.id}`, creator: "@DonaldLouch", images: photoMeta.fileID.filePath },
//       appleWebApp: { title: `${photoMeta.albumName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
//     }
// }

export default async function Album({ params }: Props) {
  // const {userId, sessionId} = auth() 
  // const isLoggedIn = userId && sessionId ? true : false
    const postLimit = 20 as number
    const { id } = params
    const { data: albumData } = await supabase.from('PhotographyAlbum').select().match({ slug: id}).single() as any
    const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).limit(postLimit).order('uploadedOn', { ascending: false }) as any
    const mdxSource = await serialize(albumData.albumCaption ? albumData.albumCaption : "No caption has been posted yet."!, {mdxOptions: {
        development: process.env.NODE_ENV === 'development',
    }}) as MDXRemoteSerializeResult

    const { data: allPhotoData } = await supabase.from('Photography').select(`*, fileID (*)`).match({ isPublic: true, isSetup: true, album: albumData.id }).order('uploadedOn', { ascending: false }) as any
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

    return <AlbumPage albumData={albumData} photoData={photoData} mdxSource={mdxSource} locations={locations} tags={tags} photoCount={photoCount} />
}