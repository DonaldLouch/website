import supabase from "@/lib/supabase";
import VideoFeed from "./VideoFeed";


export default async function VideoPage() {
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true }).order('uploadedOn', { ascending: false }).limit(12) as any
    return <VideoFeed videoData={videoData} />
}
