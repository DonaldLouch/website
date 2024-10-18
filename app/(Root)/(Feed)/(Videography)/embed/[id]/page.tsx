import { Metadata } from 'next';
import supabase from '@/lib/supabase';
import { serialize } from 'next-mdx-remote-client/serialize';
import PlayerPage from '../../video/[id]/PlayerPage';

type Props = {
    params: { id: string }
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { id } = params
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
export default async function PlayerEmbed(props: Props) {
    const params = await props.params;
    const { id } = params
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*)`).match({ id: id }).single() as any
    const mdxSource = await serialize({source: videoData.description})
    return <PlayerPage videoData={videoData} mdxSource={mdxSource} playerType="embed" />
}
