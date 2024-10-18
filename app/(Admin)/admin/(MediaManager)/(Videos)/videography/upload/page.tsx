// import cuid from "cuid";
import VideoUploader from "./VideoUploader";

import { destroyCookie, setCookie } from "nookies";
import supabase from "@/lib/supabase";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const dynamic = 'force-dynamic'

export default async function VideoUploaderPage(props: {searchParams: SearchParams}) {
    const { step } = await props.searchParams as any
    
    const currentStep = parseInt(step) as number
    const { data: categoryData } = await supabase.from('VideoCategory').select().order('catSortID', { ascending: true }) as any
    const { data: tagsData } = await supabase.from('distinct_alltags').select().order('tag', { ascending: true }) as any
    // const id = cuid()
    //     destroyCookie({}, 'videoID')
    //     setCookie({}, 'videoID', id, {
    //       maxAge: 30 * 60 * 1000, // 30 minutes
    //       path: '/',
    //   })
    // categoryData={categoryData} 
    return <VideoUploader currentStep={currentStep} tagsData={tagsData} categoryData={categoryData} />
}