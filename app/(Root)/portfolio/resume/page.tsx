import { Metadata } from 'next'
import ResumePage from "./ResumePage";
import supabase from '@/lib/supabase';
export async function generateMetadata(): Promise<Metadata> {
    const {data: resumeMeta} = await supabase.from('Resume').select().single() as any
    // const resumeMeta = resume[0]
    return {
      title: `${resumeMeta?.firstName} ${resumeMeta?.lastName}'s Resume`,
      description: resumeMeta?.bioExcerpt,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${resumeMeta?.firstName} ${resumeMeta?.lastName}, ${resumeMeta?.firstName}, ${resumeMeta?.lastName}, ${resumeMeta?.middleName}, resume, ${resumeMeta?.firstName} ${resumeMeta?.middleName} ${resumeMeta?.lastName}, canada, Canadian, photographer, videographer, web developer, devop`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/resume`,
          title: `${resumeMeta?.firstName} ${resumeMeta?.lastName}'s Resume`,
          description: resumeMeta?.bioExcerpt,
          images: [{
              url: resumeMeta?.avatar,
          }],
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/resume`, creator: "@DonaldLouch", images: resumeMeta?.avatar },
      appleWebApp: { title: `${resumeMeta?.firstName} ${resumeMeta?.lastName}'s Resume` }
    }
}


export default async function Resume() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBGH6Awzq" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  const { data: resumeData } = await supabase.from('Resume').select().single() as any
  const { data: experienceData } = await supabase.from('ResumeWorkExperience').select().order('startDate', { ascending: false }) as any
  const { data: workExperienceHistoryData } = await supabase.from('ResumeWorkExperienceHistory').select().order('startDate', { ascending: false }) as any
  const { data: educationData } = await supabase.from('ResumeEducation').select().order('startDate', { ascending: false }) as any

  return (
    <ResumePage resume={resumeData} resumeExperience={experienceData} resumeWorkExperienceHistory={workExperienceHistoryData} resumeEducation={educationData} />
  );
}