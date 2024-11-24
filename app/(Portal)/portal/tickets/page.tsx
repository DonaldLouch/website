// 'use client'

// import GetProjects from './GetProjects'
// import { RequestNewProject } from './RequestNewProject'
// import { BreadCrumb } from "../(Components)/BreadCrumbsComponent";
// import { currentUser } from '@clerk/nextjs';
// import { checkRole } from '@/lib/roles';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase';
import Tickets from './Tickets';
import { isUserSignedIn, userData, userRole } from '@/app/actions/clerk';
 
export const metadata: Metadata = {
  title: `Tickets | ${process.env.WEBSITE_NAME}`
};

export default async function TicketsPage() {
  const isUser = await isUserSignedIn()
  const role = await userRole()
  const theUser = await userData()

  const isAdmin = isUser && role === "admin" ? true : false
  const isMod = isUser && role === "moderator" ? true : false
  const isPayment = isUser && role === "paymentOnly" ? true : false
  const isTicket = isUser && role === "ticketSupportOnly" ? true : false
  const isStaff = isAdmin || isMod
  
  const { userId } = theUser
  
  !userId && !isAdmin && !isMod && isPayment && !isTicket && redirect("/portal?error=unauthorizedNotProperUser")

  const { data: clientTickets } = await supabase.from('Tickets').select().contains('from', {id: userId}).match({internalONLY: false}) as any
  const { data: adminTickets } = isStaff ? await supabase.from('Tickets').select().order('lastUpdatedOn', { ascending: false }): {} as any

  // const userLevel = isAdmin ? 0 : isMod ? 1 : isUser ? 2  : 10 as number

  return(
      <Tickets isStaff={isStaff} clientTickets={clientTickets} adminTickets={adminTickets} />
  )
}