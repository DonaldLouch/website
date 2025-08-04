import HomePageLayout from "./HomePageLayout";
import supabase from "@/lib/supabase";

export default async function HomePageContent() {
  const [
    { data: aboutMe },
    { data: pinnedPostsData },
    { data: primaryLinksData },
    { data: linksData },
    { data: audios },
    { data: photos },
    { data: videos },
    { count: photosPinnedCount },
    { count: photosAllCount },
    { count: videosAllCount },
    { count: postAllCount }
  ] = await Promise.all([
    supabase.from('About').select().single(),
    supabase.from('BlogPost').select().match({ isPinned: true, postStatus: 'Public' }).order('postedOn', { ascending: false }),
    supabase.from('PrimaryLinks').select().order('order', { ascending: true }),
    supabase.from('Links').select().order('order', { ascending: true }),
    supabase.from('LinkSet').select().order('lastUpdated', { ascending: false }),
    supabase.from('Photography').select(`*, fileID (*), album (*)`).limit(20).match({ isPublic: true, isSetup: true, isPinned: true }),
    supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true, isPinned: true }).order('uploadedOn', { ascending: false }),
    supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, isPinned: true }),
    supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true }),
    supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true }),
    supabase.from('BlogPost').select("*", { count: 'exact'}).match({ postStatus: 'Public' }),
  ]);

  return <HomePageLayout
    aboutMe={aboutMe}
    primaryLinksData={primaryLinksData}
    linksData={linksData}
    pinnedPhotos={photos}
    photosPinnedCount={photosPinnedCount}
    photosAllCount={photosAllCount}
    videosAllCount={videosAllCount}
    videos={videos}
    pinnedPosts={pinnedPostsData}
    postAllCount={postAllCount}
    audios={audios}
  />;
}