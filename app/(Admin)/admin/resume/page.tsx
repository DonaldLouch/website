import supabase from '@/lib/supabase'
import EditResumePage from './EditResumePage'

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

export default async function PortalResumePage() {
  const { data: resume } = await supabase.from('Resume').select().single() as any
  const { data: resumeExperience } = await supabase.from('ResumeWorkExperience').select().order('startDate', {ascending: false}) as any
  const { data: resumeEducation } = await supabase.from('ResumeEducation').select().order('startDate', {ascending: false}) as any
  return <EditResumePage resume={resume} resumeExperience={resumeExperience} resumeEducation={resumeEducation} />
}