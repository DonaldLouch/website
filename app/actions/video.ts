"use server"

import supabase from "@/lib/supabase";

export async function getVideoData(id: string): Promise<any> {
  try {
    const { data: videoData } = (await supabase
      .from("Videography")
      .select(`*, videoFileID (*), thumbnailFileID (*), category (*)`)
      .match({ id: id })
      .single()) as any
    // const videoData = "Hello" + id
    return videoData;
  } catch (error) {
    console.error("Error getting video data:", error);
    return error;
  }
}
