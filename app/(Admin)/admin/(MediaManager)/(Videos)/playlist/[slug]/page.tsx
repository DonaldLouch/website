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
import EditPlaylist from "./EditPlaylist";

type Props = {
    params: { slug: string }
};

export default async function EditPlaylistPage(props: Props) {
  const params = await props.params;
  const { slug } = params
  const { data: playlistData } = await supabase.from('VideographyPlaylist').select().match({ slug: slug }).single() as any

  const playlistVideos = new Array().sort((a: any,b: any)=> (a.videoIndex > b.videoIndex ? 1 : -1))
  const playlistVideosIDs = playlistData.videoIDs
  const playlistLength = playlistVideosIDs.length
  for (var videoIndexLoop = 0; videoIndexLoop < playlistLength; videoIndexLoop++) {
    const { data: currentVideoData } = await supabase.from('Videography').select(`title, id, uploadedOn, thumbnailFileID (filePath)`).match({ id: playlistVideosIDs[videoIndexLoop].videoID }).single() as any
    playlistVideos.push({"videoIndex": videoIndexLoop, currentVideoData})
  }

  return <EditPlaylist playlistData={playlistData} playlistVideos={playlistVideos} />
}