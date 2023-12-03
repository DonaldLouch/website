import supabase from "@/lib/supabase";
import VideoManager from "./VideoManager";

export default async function VideoManagerPage() {
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).order('uploadedOn', { ascending: false }).limit(9) as any
    return <VideoManager videoData={videoData} />
}