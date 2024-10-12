import supabase from "@/lib/supabase";
import VideoManager from "./VideoManager";

export default async function VideoManagerPage() {
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).order('uploadedOn', { ascending: false }).limit(9) as any
    const { count: videosCount } = await supabase.from('Videography').select("*", { count: 'exact'}) as any

    return <VideoManager videoData={videoData} videosCount={videosCount} />
}