// import cuid from "cuid";
import VideoUploader from "./VideoUploader";

// import nookies from 'nookies'
import supabase from "@/lib/supabase";
import { getVideoData } from "@/app/actions/video";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// export const revalidate = 0

export default async function VideoUploaderPage(props: {searchParams: SearchParams}) {
    const { step } = await props.searchParams as any
    const { id } = await props.searchParams as any
    
    const currentStep = parseInt(step) as number
    const { data: categoryData } = await supabase.from('VideoCategory').select().order('catSortID', { ascending: true }) as any
    const { data: tagsData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any

    // const cookies = nookies.get()
    // const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ id }).single() as any
    // console.log(id)
    const videoData = await getVideoData(id)
    // const videoData = await getVideoData("videoID_M42ADE13oi0")

    // const videoID = id ? id : "videoID_"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
    // const id = cuid()
    // destroyCookie({}, 'videoID')
    // setCookie({}, 'videoID', videoID, {
    //     maxAge: 30 * 60 * 1000, // 30 minutes
    //     path: '/',
    // })
    // categoryData={categoryData} 
    return <VideoUploader currentStep={currentStep} tagsData={tagsData} categoryData={categoryData} videoData={videoData} />
}