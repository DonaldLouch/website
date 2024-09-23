// 'use client'
// import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
// import GetProjects from './GetProjects'
// import { RequestNewProject } from './RequestNewProject'
// import { BreadCrumb } from "../(Components)/BreadCrumbsComponent";
// import { currentUser } from '@clerk/nextjs';
import { checkRole } from '@/lib/roles';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase';
import Tickets from './Tickets';
 
export const metadata: Metadata = {
  title: `Projects | ${process.env.WEBSITE_NAME}`
};

export default async function TicketsPage() {
  const { userId } = auth()  
  const isAdmin = checkRole("admin") ? true : false
  const isMod = checkRole("moderator") ? true : false
  const isPayment = checkRole("paymentOnly") ? true : false
  const isTicket = checkRole("ticketSupportOnly") ? true : false

  const isStaff = isAdmin || isMod

  
  !userId && !isAdmin && !isMod && isPayment && !isTicket && redirect("/portal?error=unauthorizedNotProperUser")

  const { data: clientTickets } = await supabase.from('Tickets').select().contains('from', {id: userId}).match({internalONLY: false}) as any
  const { data: adminTickets } = isStaff ? await supabase.from('Tickets').select().order('lastUpdatedOn', { ascending: false }): {} as any

  // const userLevel = isAdmin ? 0 : isMod ? 1 : isUser ? 2  : 10 as number

  return(
      <Tickets isStaff={isStaff} clientTickets={clientTickets} adminTickets={adminTickets} />
  )
}