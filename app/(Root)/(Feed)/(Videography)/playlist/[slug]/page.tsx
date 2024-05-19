import { serialize } from "next-mdx-remote-client/serialize"

import { Metadata } from 'next';
import supabase from '@/lib/supabase';
import PlaylistPage from './PlaylistPage';

type Props = {
    params: { slug: string }
    searchParams: { videoIndex: string }
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const { id } = params
//     const {data: videoMeta} = await supabase.from('Videography').select('id,title,excerpt,tags,thumbnailFileID (filePath)').match({ id: id }).single() as any
//     return {
//       title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//       description: videoMeta.excerpt,
//       keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${videoMeta.tags}`,
//       openGraph: {
//           url: `${process.env.SITE_URL}/photo/${videoMeta.id}`,
//           title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//           description: videoMeta.excerpt,
//           images: [{
//               url: videoMeta.thumbnailFileID.filePath,
//           }],
//       },
//       twitter: { site: `${process.env.SITE_URL}/photo/${videoMeta.id}`, creator: "@DonaldLouch", images: videoMeta.thumbnailFileID.filePath },
//       appleWebApp: { title: `${videoMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
//     }
// }

export default async function Player({ params, searchParams }: Props) {
    const { slug } = params
    const videoIndex = parseInt(searchParams.videoIndex) as number
    const currentVideo = videoIndex || 0

    const { data: playlistData } = await supabase.from('VideographyPlaylist').select().match({ slug: slug }).single() as any

    const currentVideoID = playlistData.videoIDs.find(({ videoIndex }: any) => videoIndex === currentVideo).videoID
    const { data: currentVideoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*), videoPlaylist (*)`).match({ id: currentVideoID }).single() as any
    const playlistDescription = await serialize({source: playlistData.playlistDescription})
    const videoDescription = await serialize({source: currentVideoData.description})
    
    const playlistVideos = new Array().sort((a: any,b: any)=> (a.videoIndex > b.videoIndex ? 1 : -1))
    const playlistVideosIDs = playlistData.videoIDs
    const playlistLength = playlistVideosIDs.length
    // console.log(playlistVideosIDs.length)
    // playlistData.videoIDs.forEach(async(video: any) => {
    for (var videoIndexLoop = 0; videoIndexLoop < playlistLength; videoIndexLoop++) {
    // for (const video of playlistData.videoIDs) {
        const { data: currentVideoData } = await supabase.from('Videography').select(`title, id, uploadedOn, thumbnailFileID (filePath)`).match({ id: playlistVideosIDs[videoIndexLoop].videoID }).single() as any
        playlistVideos.push({"videoIndex": videoIndexLoop, currentVideoData})
    }

    // return <PlaylistPage currentVideoIndex={currentVideo} playlistLength={playlistLength} playlistData={playlistData} currentVideoData={currentVideoData} playlistDescription={playlistDescription} videoDescription={videoDescription} playlistVideos={playlistVideos} />
// playlistVideos
return
}
