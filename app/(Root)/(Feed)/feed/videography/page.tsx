import supabase from "@/lib/supabase";
import VideoFeed from "./VideoFeed";


export default async function VideoPage() {
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true }).order('uploadedOn', { ascending: false }).limit(12) as any
    const { count: videosCount } = await supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true })
    return <VideoFeed videoData={videoData} videosCount={videosCount} />
}
