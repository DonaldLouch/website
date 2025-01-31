import Projects from './Projects';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase';
import { isUserSignedIn, userData, userRole } from '@/app/actions/clerk';
 
export const metadata: Metadata = {
  title: `Projects | ${process.env.WEBSITE_NAME}`
};

export default async function ProjectsPage() {

  const isUser = await isUserSignedIn()
  const role = await userRole()
  const theUser = await userData()

  const isAdmin = isUser && role === "admin" ? true : false
  const isMod = isUser && role === "moderator" ? true : false
  const isPayment = isUser && role === "paymentOnly" ? true : false
  const isTicket = isUser && role === "ticketSupportOnly" ? true : false
  const isStaff = isAdmin || isMod
  
  const { userId } = theUser
  
  !userId && !isAdmin && !isMod && !isPayment && isTicket && redirect("/portal?error=unauthorizedNotProperUser")

  const { data: clientProjects } = await supabase.from('Projects').select().contains('client', {id: userId}) as any
  const { data: adminProjects } = isStaff ? await supabase.from('Projects').select().order('lastUpdated', { ascending: false }): {} as any

  // const userLevel = isAdmin ? 0 : isMod ? 1 : isUser ? 2  : 10 as number

  return(
      <Projects isAdmin={isAdmin} isMod={isMod} clientProjects={clientProjects} adminProjects={adminProjects} />
  )
}