// "use client"
// import { useState } from "react"
// import GetProject from "./GetProject"
// import { getServerSession } from "next-auth/next"

import supabase from '@/lib/supabase';
import GetProject from './GetProject';

import { serialize } from "next-mdx-remote-client/serialize"
import { checkRole } from '@/lib/roles';
// import { Metadata } from 'next';
// type Props = {
//     params: { projectID: string }
// };
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const id = params.projectID
//     const project = await fetch(`${process.env.NEXTAUTH_URL}/api/project/getProject?id=${id}`).then((res) => res.json())
//     return {
//         title: `Project: ${project.response.name} | ${process.env.WEBSITE_NAME}`,
//     }
// }


export default async function ProjectOverview({params}: any) {
    const { projectID } = params

    const isAdmin = checkRole("admin") ? true : false
    const isMod = checkRole("moderator") ? true : false
    // const isPayment = checkRole("paymentOnly") ? true : false
    // const isTicket = checkRole("ticketSupportOnly") ? true : false

    const isStaff = isAdmin || isMod

    const { data: project } = await supabase.from('Projects').select().match({id: projectID}).single() as any
    const { data: tasks } = await supabase.from('Tasks').select(`*, projectID ( * )`).match({projectID: projectID}).order("taskOrderNumber", {ascending: true}) as any
    const projectDescription = await serialize({source: project?.description})
    // const {response: project} = await getProjectData(projectID)
    // const {data: session} = useSession()

    return <GetProject project={project} projectDescription={projectDescription} isStaff={isStaff} tasks={tasks} /> 
}