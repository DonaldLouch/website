import supabase from '@/lib/supabase'
import EditResumeWorkExperiencePage from '../EditResumeWorkExperiencePage'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: Resume Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'The Donald Louch Resume Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: Resume Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'The Donald Louch Resume Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

type Params = Promise<{ experienceID: string }>

export default async function PortalResumeWorkExperiencePage({ params }: { params: Params }) {
  const { experienceID } = await params

  const { data: resumeExperience } = await supabase.from('ResumeWorkExperience').select().match({ id: experienceID }).single() as any
  const { data: resumeHistory} = await supabase.from('ResumeWorkExperienceHistory').select().match({ workID: experienceID }) as any
  const { data: resume } = await supabase.from('Resume').select("id").single() as any
  return <EditResumeWorkExperiencePage resumeExperience={resumeExperience} resumeHistory={resumeHistory} resumeID={resume.id} />
}