'use client'


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

import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { Group, Stack, Text, Title } from "@mantine/core";
import HugeIcon from "@/app/(Components)/HugeIcon";
// import { setRole } from "./_actions";

export default function AdminPageContent() {
  // const userData = useSession()

  // {users}: any}

  // // console.log(userData.session?.user.organizationMemberships?.[0].role)
  //  const setRole = await fetch('/api/media/upload', { method: "POST", body }).then(response => response.json())
  
  const quickActions = [
    {
      link: "photography",
      title: "Photography Manager",
      icon: "album-02"
    },
    {
      link: "videography",
      title: "Videography Manager",
      icon: "camera-video"
    },
    {
      link: "blog",
      title: "Blog Manager",
      icon: "news"
    },
    {
      link: "linkSets",
      title: "Link Sets Manager",
      icon: "link-01",
      iconVariant: "twotone"
    },
    {
      link: "pages",
      title: "Pages Manager",
      icon: "files-02"
    },
    {
      link: "messages",
      title: "Messages",
      icon: "chatting-01",
      iconVariant: "twotone"
    },
    {
      link: "alerts",
      title: "Website Alerts",
      icon: "alert-diamond"
    },
  ]
  return <>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }} p="2rem" my="2rem" gap="0">
      <Group align="center" justify="center" c="var(--primary)">
        <HugeIcon name="waving-hand-01" size="2.5rem" color="currentColor" variant="twotone" />
        <Title ta="center" size="2.5rem" fw="900" order={1}>Welcome!</Title>
      </Group>
        <Text ta="center" fz="1.5rem" fw="600" mb="0">Welcome to the Donald Louch Website</Text>
        <Text ta="center">{process.env.NEXT_PUBLIC_DESCRIPTION}</Text>
    </Stack>
    <Group align="center" justify="center" c="green">
      <HugeIcon name="zap" size="2.5rem" color="currentColor" variant="twotone" />
      <Title ta="center" size="2.5rem" fw="900">Quick Actions</Title>
    </Group>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem 0.5rem" my="2rem" gap="0">
        <Group justify="center" my="1rem" gap="0.5rem">
            {quickActions.map((action: any) => (
              <PrimaryLinkedButton primNewIcon={{name: action.icon, variant: action.iconVariant ? action.iconVariant : "duotone"}} link={`/admin/${action.link}`} key={action.link}>{action.title}</PrimaryLinkedButton>
            ))}
          </Group>
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
  </>
}
