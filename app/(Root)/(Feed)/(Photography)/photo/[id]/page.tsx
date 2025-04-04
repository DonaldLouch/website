import supabase from "@/lib/supabase";

import { serialize } from "next-mdx-remote-client/serialize";

import { Metadata } from 'next';
import PhotoPage from "./PhotoPage";

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params
    
    const {data: photoMeta} = await supabase.from('Photography').select('id,photoName,caption,tags,fileID (filePath)').match({ id: id }).single() as any
    return {
      title: `${photoMeta.photoName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: photoMeta.caption,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${photoMeta.tags}`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/photo/${photoMeta.id}`,
          title: `${photoMeta.photoName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: photoMeta.caption,
          images: [{
              url: photoMeta.fileID.filePath,
          }],
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/photo/${photoMeta.id}`, creator: "@DonaldLouch", images: photoMeta.fileID.filePath },
      appleWebApp: { title: `${photoMeta.photoName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}

export default async function Photo({ params }: { params: Params }) {
    const { id } = await params

    const { data: photoData } = await supabase.from('Photography').select(`*, fileID (*), album (*)`).match({ id: id }).single() as any
    const mdxSource = await serialize({source: photoData.caption})

    return <PhotoPage photoData={photoData} mdxSource={mdxSource} />
}