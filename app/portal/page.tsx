'use client'

import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { BreadCrumb } from "../(Components)/BreadCrumbsComponent";

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.WEBSITE_NAME}'s Portal`,
//     description: 'The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.WEBSITE_NAME}'s Portal`,
//         description: 'The portal home page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }


export default function PortalHome() {
  // <PortalHeader pageTitle="Portal Home" />
  // const breadCrumbs = [
  //     {"pageLink": "/projects", "pageName": "Projects"},
  // ]
  return (
    <>
      <Card px="1rem" mt="0">
        <CardHeader><Heading textAlign="center" size="4xl" textDecoration="underline" fontWeight="900" mb="1rem">Welcome!</Heading></CardHeader>
        <CardBody>
          <Text textAlign="center" fontSize="4xl" mb="0.7rem" fontWeight="900">Welcome to the Donald Louch Website</Text>
          <Text textAlign="center">{process.env.DESCRIPTION!}</Text>
        </CardBody>
      </Card>
      <Text textAlign="center" fontSize="3xl" fontWeight="900" color="secondary"><FontAwesomeIcon icon={["fal", "traffic-cone"]} color="currentColor" width="3%" shake  /> The portal is currently under construction</Text>
    </>
  )
}
