'use client'

import { Button, Card, CardBody, CardHeader, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { OrganizationList, OrganizationProfile, OrganizationSwitcher, UserProfile, useSession, useUser } from "@clerk/nextjs";
;
import HouseIcon from "../../(Components)/(Vectors)/house";

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
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  return (
    <>
      <Card px="1rem" mt="0">
        <CardHeader><Heading textAlign="center" size="4xl" textDecoration="underline" fontWeight="900" mb="1rem">Welcome!</Heading></CardHeader>
        <CardBody>
          <Text textAlign="center" fontSize="4xl" mb="0.7rem" fontWeight="900">Welcome to the Donald Louch Website</Text>
          <Text textAlign="center">{process.env.NEXT_PUBLIC_DESCRIPTION}</Text>
          {/* <Text textAlign="center">Hi, my name is Donald Louch and I am a twenty-nine-year-old Canadian web developer and digital content creator.</Text> */}
        </CardBody>
      </Card>
      <Card px="1rem" mt="0">
        <CardHeader><Heading textAlign="center" size="3xl" textDecoration="underline" fontWeight="900" mb="1rem">Quick Actions!</Heading></CardHeader>
        <CardBody>
          <Stack direction="row" justifyContent="center">
            <Button as="a" href={`/admin/photography`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Photography Feed Manager</Button>
            <Button as="a" href={`/admin/videography`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Videography Feed Manager</Button>
            <Button as="a" href={`/admin/blog`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Blog Manager</Button>
            <Button as="a" href={`/admin/pages`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Page Manager</Button>
            <Button as="a" href={`/admin/media`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Media Manager</Button>
            <Button as="a" href={`/admin/messages`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Messages</Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}
