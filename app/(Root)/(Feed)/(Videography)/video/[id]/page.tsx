import { serialize } from "next-mdx-remote-client/serialize"

import { Metadata } from 'next';
import supabase from '@/lib/supabase';
import PlayerPage from './PlayerPage';
// import { userRole } from "@/app/actions/clerk";

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params
    
    const {data: videoMeta} = await supabase.from('Videography').select('id,title,excerpt,tags,thumbnailFileID (filePath)').match({ id: id }).single() as any
    return {
      title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: videoMeta.excerpt,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${videoMeta.tags}`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/photo/${videoMeta.id}`,
          title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: videoMeta.excerpt,
          images: [{
              url: videoMeta.thumbnailFileID.filePath,
          }],
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/photo/${videoMeta.id}`, creator: "@DonaldLouch", images: videoMeta.thumbnailFileID.filePath },
      appleWebApp: { title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}
export default async function Player({ params }: { params: Params }) {
    const { id } = await params

    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*), videoPlaylist (*)`).match({ id: id }).single() as any

    // const role = await userRole()
    const isAdmin = false

    // const { data: playlist } = await supabase.from('VideographyPlaylist').select().match({ id: videoData.videoPlaylist.id }).single() as any
    const mdxSource = await serialize({source: videoData.description})
    return <PlayerPage videoData={videoData} mdxSource={mdxSource} playerType="page" isAdmin={isAdmin} />
}
