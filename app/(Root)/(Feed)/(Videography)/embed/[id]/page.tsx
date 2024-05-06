import { Metadata } from 'next';
import supabase from '@/lib/supabase';
import PlayerPageEmbed from './PlayerPageEmbed';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const {data: videoMeta} = await supabase.from('Videography').select('id,title,excerpt,tags,thumbnailFileID (filePath)').match({ id: id }).single() as any
    return {
      title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: videoMeta.excerpt,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${videoMeta.tags}`,
      openGraph: {
          url: `${process.env.SITE_URL}/photo/${videoMeta.id}`,
          title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: videoMeta.excerpt,
          images: [{
              url: videoMeta.thumbnailFileID.filePath,
          }],
      },
      twitter: { site: `${process.env.SITE_URL}/photo/${videoMeta.id}`, creator: "@DonaldLouch", images: videoMeta.thumbnailFileID.filePath },
      appleWebApp: { title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}
export default async function PlayerEmbed({ params }: Props) {
    const { id } = params
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*)`).match({ id: id }).single() as any
    return <PlayerPageEmbed videoData={videoData} />
    
}
