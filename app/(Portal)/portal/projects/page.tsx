// 'use client'
// import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
// import GetProjects from './GetProjects'
// import { RequestNewProject } from './RequestNewProject'
// import { BreadCrumb } from "../(Components)/BreadCrumbsComponent";
// import { currentUser } from '@clerk/nextjs';
import { checkRole } from '@/lib/roles';
import Projects from './Projects';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase';
 
export const metadata: Metadata = {
  title: `Projects | ${process.env.WEBSITE_NAME}`
};

export default async function ProjectsPage() {
  const { userId } = auth()  
  const isAdmin = checkRole("admin") ? true : false
  const isMod = checkRole("moderator") ? true : false
  const isPayment = checkRole("paymentOnly") ? true : false
  const isTicket = checkRole("ticketSupportOnly") ? true : false

  const isStaff = isAdmin || isMod

  
  !userId && !isAdmin && !isMod && !isPayment && isTicket && redirect("/portal?error=unauthorizedNotProperUser")

  const { data: clientProjects } = await supabase.from('Projects').select().contains('client', {id: userId}) as any
  const { data: adminProjects } = isStaff ? await supabase.from('Projects').select().order('lastUpdated', { ascending: false }): {} as any

  // const userLevel = isAdmin ? 0 : isMod ? 1 : isUser ? 2  : 10 as number

  return(
      <Projects isAdmin={isAdmin} isMod={isMod} clientProjects={clientProjects} adminProjects={adminProjects} />
  )
}