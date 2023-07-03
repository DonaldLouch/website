'use client'

import { Button, Card, CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
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
          <Text textAlign="center">Hi, my name is Donald Louch and I am a twenty-eight-year-old Canadian web developer and digital content creator.</Text>
        </CardBody>
      </Card>
      <Card px="1rem" mt="0">
        <CardHeader><Heading textAlign="center" size="3xl" textDecoration="underline" fontWeight="900" mb="1rem">Quick Actions!</Heading></CardHeader>
        <CardBody>
          <Stack direction="row" justifyContent="center">
            <Button as="a" href={`/portal/blog`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Blog Manager</Button>
            <Button as="a" href={`/portal/pages`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Page Manager</Button>
            <Button as="a" href={`/portal/media`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Media Manager</Button>
            <Button as="a" href={`/portal/messages`} variant="primary" background="primary" color="white" p="1.8rem 2rem" my="1rem !important">Messages</Button>
          </Stack>
        </CardBody>
      </Card>
      <Card px="1rem" mt="0">
        <CardHeader><Heading textAlign="center" size="4xl" textDecoration="underline" fontWeight="900" mb="1rem">Current Stats</Heading></CardHeader>
        <CardBody>
          {/* <Text textAlign="center" fontSize="4xl" mb="0.7rem" fontWeight="900">Number of Posts</Text>
          <Text textAlign="center" fontSize="4xl" mb="0.7rem" fontWeight="900">Number of Pages</Text>
          <Text textAlign="center" fontSize="4xl" mb="0.7rem" fontWeight="900">Total of Post Views</Text>
          <Text textAlign="center" fontSize="4xl" mb="0.7rem" fontWeight="900">Total of Page Views</Text> */}
          {/* <Text textAlign="center">{process.env.DESCRIPTION}</Text> */}
          <Text textAlign="center" fontSize="3xl" fontWeight="900" color="secondary"><FontAwesomeIcon icon={["fal", "traffic-cone"]} color="currentColor" width="3%" shake  /> This section is being constructed</Text>
        </CardBody>
      </Card>
    </>
  )
}
