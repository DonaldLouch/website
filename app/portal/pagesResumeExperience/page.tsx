import supabase from '@/lib/supabase'
import EditResumeExperiencePage from './EditResumeExperiencePage'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: Resume Page | ${process.env.WEBSITE_NAME}`,
//     description: 'The Donald Louch Resume Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: Resume Page | ${process.env.WEBSITE_NAME}`,
//         description: 'The Donald Louch Resume Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function PortalResumeExperiencePage() {
  const { data: resumeExperience } = await supabase.from('ResumeWorkExperience').select().order('startDate', {ascending: false}) as any
  const { data: resumeEducation } = await supabase.from('ResumeEducation').select().order('startDate', {ascending: false}) as any
  const { data: resume } = await supabase.from('Resume').select("id").single() as any
  return <EditResumeExperiencePage resumeExperience={resumeExperience} resumeEducation={resumeEducation} resumeID={resume.id} />
}