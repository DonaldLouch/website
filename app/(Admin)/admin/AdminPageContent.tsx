'use client'

import { Button, Card, CardBody, CardHeader, Heading, Icon, Stack, Text } from "@chakra-ui/react";
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


import { SearchUsers } from "./(Components)/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
// import { setRole } from "./_actions";

export default function AdminPageContent({users}: any) {
  // const userData = useSession()

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  //  const setRole = await fetch('/api/media/upload', { method: "POST", body }).then(response => response.json())
  console.log(users)
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
          {/* <SearchUsers /> */}

      {/* {users.map((user: any) => {
        return (
          <div key={user.id}>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email: any) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit">Make Admin</button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button type="submit">Make Moderator</button>
              </form>
            </div>
          </div>
        );
      })} */}
        </CardBody>
      </Card>
    </>
  )
}