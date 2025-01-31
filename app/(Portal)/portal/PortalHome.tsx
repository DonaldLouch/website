'use client'

import { Group, Stack, Text, Title } from "@mantine/core";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import HugeIcon from "@/app/(Components)/HugeIcon";
// import { checkRole } from "@/lib/roles";
// import { auth } from '@clerk/nextjs/server';

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Portal`,
//     description: 'The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Portal`,
//         description: 'The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }


export default function PortalHome() {
  // {isStaff}: any
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  return <>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem" my="2rem" gap="0">
      <Group align="center" justify="center" c="var(--secondary)">
        <HugeIcon name="cone-01" size="2.5rem" color="currentColor" variant="twotone" />
        <Title ta="center" size="2.5rem" fw="900" order={2}>UNDER CONSTRUCTION!</Title>
      </Group>
        <Text ta="center">Please note that the portal section is under construction and not functional right now! Please check back later!</Text>
    </Stack>
    <Group align="center" justify="center" c="green">
      <HugeIcon name="ticket-01" size="2.5rem" color="currentColor" variant="twotone" />
      <Title ta="center" size="2.5rem" fw="900" order={2}>Currently Available</Title>
    </Group>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }} p="2rem" my="2rem" gap="0">
        <Text>I am pleased to announce the launch of the initial phase of “Projects” accessible within the Donald Louch Client Portal. This platform enables clients to initiate new projects and access and modify project details. Further enhancements and functionalities are planned for future development. </Text>
        <PrimaryLinkedButton link="/portal/projects" icon={<HugeIcon name="files-01" />}>Project Manager</PrimaryLinkedButton>
    </Stack>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }} p="2rem" my="2rem" gap="0">
        <Text>I am pleased to launch the initial phase of "Tickets". You will be able to create and manage tickets within the Donald Louch Client Portal. This platform enables clients to initiate new tickets and access and modify ticket details. Further enhancements and functionalities are planned for future development. This will also be the new way of requesting further information for my resume and help with my website and accounts on my website.</Text>
        <PrimaryLinkedButton link="/portal/tickets" icon={<HugeIcon name="ticket-01" />}>Ticket Manager</PrimaryLinkedButton>
    </Stack>
  </>
}
