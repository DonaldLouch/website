import HomePageLayout from "./HomePageLayout";
import supabase from "@/lib/supabase";

export default async function HomePageContent() {
  const { data: aboutMe } = await supabase.from('About').select().single()
  const { data: pinnedPostsData } = await supabase.from('BlogPost').select().match({ isPinned: true, postStatus: 'Public' }).order('postedOn', { ascending: false }) as any
  const { data: primaryLinksData } = await supabase.from('PrimaryLinks').select().order('orderNumber', { ascending: true }) as any
  const { data: linksData } = await supabase.from('Links').select().order('lastUpdatedOn', { ascending: false }) as any
  const { data: audios } = await supabase.from('LinkSet').select().order('lastUpdated', { ascending: false }) as any
  // const { data: embedsData } = await supabase.from('Embed').select().order('lastUpdatedOn', { ascending: false }) as any
  const { data: photos } = await supabase
      .from('Photography')
      .select(`*, fileID (*), album (*)`)
      .limit(20)
      // .order('')
      .match({ isPublic: true, isSetup: true, isPinned: true })
  const { data: videos } = await supabase
      .from('Videography')
      .select(`*, videoFileID (*), thumbnailFileID (*), category (*)`)
      // .limit(20)
      // .order('')
     .match({ videoPrivacy: "Public", isSetup: true, isPinned: true})
     .order('uploadedOn', { ascending: false })
  // const mdxSource = await serialize({source: aboutMe.bio})

  const { count: photosPinnedCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, isPinned: true })
  const { count: photosAllCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true })

  // const { count: videosPinnedCount } = await supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true, isPinned: true })
  const { count: videosAllCount } = await supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true })

  // const { count: postPinnedCount } = await supabase.from('BlogPost').select("*", { count: 'exact'}).match({ isPinned: true, postStatus: 'Public' })
  const { count: postAllCount } = await supabase.from('BlogPost').select("*", { count: 'exact'}).match({ postStatus: 'Public' })
  
  return <HomePageLayout aboutMe={aboutMe} primaryLinksData={primaryLinksData} linksData={linksData} pinnedPhotos={photos} photosPinnedCount={photosPinnedCount} photosAllCount={photosAllCount} videosAllCount={videosAllCount} videos={videos} pinnedPosts={pinnedPostsData} postAllCount={postAllCount} audios={audios} />
}