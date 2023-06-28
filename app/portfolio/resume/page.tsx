// import {
//   Box,
//   Text,
//   Heading,
//   Accordion,
//   AccordionButton,
//   AccordionItem,
//   AccordionPanel,
//   Stack,
//   Link,
//   Button,
//   Grid,
//   Image,
//   AspectRatio,
// } from "@chakra-ui/react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
// import { SectionTitle } from "@/app/(Components)/SectionTitle";

// import createClient from "@/lib/supabase-server"

import { Metadata } from 'next'
import ResumePage from "./ResumePage";
import supabase from '@/lib/supabase';
export async function generateMetadata(): Promise<Metadata> {
    // const supabase = createClient();
    const {data: resume} = await supabase.from('Resume').select() as any
    const resumeMeta = resume[0]
    return {
      title: `${resumeMeta.firstName} ${resumeMeta.lastName}'s Resume`,
      description: resumeMeta.bioExcerpt,
      keywords: `${process.env.KEYWORDS}, ${resumeMeta.firstName} ${resumeMeta.lastName}, ${resumeMeta.firstName}, ${resumeMeta.lastName}, ${resumeMeta.middleName}, resume, ${resumeMeta.firstName} ${resumeMeta.middleName} ${resumeMeta.lastName}, canada, Canadian, photographer, videographer, web developer, devop`,
      openGraph: {
          url: `${process.env.SITE_URL}/portfolio/resume`,
          title: `${resumeMeta.firstName} ${resumeMeta.lastName}'s Resume`,
          description: resumeMeta.bioExcerpt,
          images: [{
              url: resumeMeta.avatar,
          }],
      },
      twitter: { site: `${process.env.SITE_URL}/portfolio/resume`, creator: "@DonaldLouch", images: resumeMeta.avatar },
      appleWebApp: { title: `${resumeMeta.firstName} ${resumeMeta.lastName}'s Resume` }
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