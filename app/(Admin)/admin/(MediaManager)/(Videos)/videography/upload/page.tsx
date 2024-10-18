// import cuid from "cuid";
import VideoUploader from "./VideoUploader";

import { destroyCookie, setCookie } from "nookies";
import supabase from "@/lib/supabase";

type Props = {
    searchParams: { step: string }
};

export const dynamic = 'force-dynamic'

export default async function VideoUploaderPage(props: Props) {
    const searchParams = await props.searchParams;
    const currentStep = parseInt(searchParams.step) as number
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