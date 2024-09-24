'use client'

// import { Button, Card, CardBody, CardHeader, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import HouseIcon from "../../(Components)/(Vectors)/house";
import { Cone01Icon, Files01Icon, Tick01Icon, Ticket01Icon } from "@hugeicons/react";
import { Box, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";
import { checkRole } from "@/lib/roles";
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


export default function PortalHome( {isStaff}: any ) {
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  return <>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem" my="2rem" gap="0">
      <Group align="center" justify="center" c="var(--secondary)">
        <Cone01Icon size="2.5rem" color="currentColor" variant="twotone" />
        <Title ta="center" size="2.5rem" fw="900" order={2}>UNDER CONSTRUCTION!</Title>
      </Group>
        <Text ta="center">Please note that the portal section is under construction and not functional right now! Please check back later!</Text>
    </Stack>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem" my="2rem" gap="0">
        <Text>Coming very soon is the ability to create and manage tickets within the Donald Louch Client Portal. This platform enables clients to initiate new tickets and access and modify ticket details. Further enhancements and functionalities are planned for future development. This will also be the new way of requesting further information for my resume and help with my website and accounts on my website.</Text>
        <PrimaryLinkedButton link="/portal/tickets" icon={<Ticket01Icon />}>Ticket Manager</PrimaryLinkedButton>
    </Stack>
    <Group align="center" justify="center" c="green">
      <Tick01Icon size="2.5rem" color="currentColor" variant="twotone" />
      <Title ta="center" size="2.5rem" fw="900" order={2}>Currently Available</Title>
    </Group>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }} p="2rem" my="2rem" gap="0">
        <Text>I am pleased to announce the launch of the initial phase of “Projects” accessible within the Donald Louch Client Portal. This platform enables clients to initiate new projects and access and modify project details. Further enhancements and functionalities are planned for future development. </Text>
        <PrimaryLinkedButton link="/portal/projects" icon={<Files01Icon />}>Project Manager</PrimaryLinkedButton>
    </Stack>
  </>
}
