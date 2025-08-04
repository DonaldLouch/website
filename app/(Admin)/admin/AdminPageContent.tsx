'use client'

import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Stack, Text, Title } from "@mantine/core";

export default function AdminPageContent() {
  const quickActions = [
    {
      link: "photography",
      title: "Photography Manager",
      icon: "images"
    },
    {
      link: "videography",
      title: "Videography Manager",
      icon: "films"
    },
    {
      link: "blog",
      title: "Blog Manager",
      icon: "blog"
    },
    {
      link: "linkSets",
      title: "Link Sets Manager",
      icon: "link",
      iconVariant: "twotone"
    },
    {
      link: "pages",
      title: "Pages Manager",
      icon: "memo"
    },
    {
      link: "messages",
      title: "Messages",
      icon: "message-smile",
    },
    {
      link: "alerts",
      title: "Website Alerts",
      icon: "bell-on"
    },
  ]
  return <>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)" }} p="2rem" my="2rem" gap="0">
      <Group align="center" justify="center" c="var(--primary)">
        <FontAwesomeIcon icon={["fadl", "hand-heart"]} size="2x" color="currentColor" />
        <Title ta="center" size="2.5rem" fw="900" order={1}>Welcome!</Title>
      </Group>
        <Text ta="center" fz="1.5rem" fw="600" mb="0">Welcome to the Donald Louch Website</Text>
        <Text ta="center">{process.env.NEXT_PUBLIC_DESCRIPTION}</Text>
    </Stack>
    <Group align="center" justify="center" c="green">
      <FontAwesomeIcon icon={["fadl", "bolt"]} size="2x" color="currentColor" />
      <Title ta="center" size="2.5rem" fw="900">Quick Actions</Title>
    </Group>
    <Stack style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldSecondary)" }} p="2rem 0.5rem" my="2rem" gap="0">
        <Group justify="center" my="1rem" gap="0.5rem">
            {quickActions.map((action: any) => (
              <PrimaryLinkedButton primNewIcon={{name: action.icon, pack: action.pack || "fadl"}} link={`/admin/${action.link}`} key={action.link}>{action.title}</PrimaryLinkedButton>
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
