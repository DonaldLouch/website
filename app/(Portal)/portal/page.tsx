'use client'

import { Button, Card, CardBody, CardHeader, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import HouseIcon from "../../(Components)/(Vectors)/house";
import { Cone01Icon } from "@hugeicons/react";
import { Box } from "@mantine/core";

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
        <CardHeader><Heading textAlign="center" size="5ren" fontWeight="900" mb="1rem"><Box component="span" mr="1rem"><Cone01Icon size="2rem" color="currentColor" /></Box>UNDER CONSTRUCTION!</Heading></CardHeader>
        <CardBody>
          <Text textAlign="center" fontSize="4xl" mb="0.7rem">Please note that the portal section is under construction and not functional right now! Please check back later!</Text>
          {/* <Text textAlign="center">Hi, my name is Donald Louch and I am a twenty-nine-year-old Canadian web developer and digital content creator.</Text> */}
        </CardBody>
      </Card>
      {/* <Card px="1rem" mt="0">
        <CardHeader><Heading textAlign="center" size="3xl" textDecoration="underline" fontWeight="900" mb="1rem">Quick Actions!</Heading></CardHeader>
        <CardBody>
          <Stack direction="row" justifyContent="center">
          </Stack>
        </CardBody>
      </Card> */}
    </>
  )
}
