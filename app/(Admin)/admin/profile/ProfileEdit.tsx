"use client";

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Tabs, Title, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import ProfileEditCard from "./(Components)/ProfileEditCard";
import SecurityCard from "./(Components)/SecurityCard";

export default function ProfileEdit({
  sessionInfo,
  passkeys,
  accounts,
}: {
  sessionInfo: any;
  passkeys: any;
  accounts: any;
}) {
  const breadCrumbs = [];

  const router = useRouter();

  const { user, session } = sessionInfo || {};

  user === null && session === null && router.push("/auth?message=NoSignedIn");

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box component="main">
        <SectionTitle headingTitle={`Edit ${user?.name}'s Profile`} />
        <Tabs
          defaultValue="profile"
          fz="inherit"
          style={{ boxShadow: "none" }}
          m="0 0rem 2rem"
        >
          <Tabs.List grow justify="center">
            <Tabs.Tab value="profile">
              <Group gap="0.7rem" align="center" justify="center">
                <FontAwesomeIcon icon={["fal", "user-gear"]} />
                <Text visibleFrom="md" lh="0">
                  Profile
                </Text>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="security">
              <Group gap="0.7rem" align="center" justify="center">
                <FontAwesomeIcon icon={["fal", "shield-user"]} />
                <Text visibleFrom="md" lh="0">
                  Security
                </Text>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="sessions">
              <Group gap="0.7rem" align="center" justify="center">
                <FontAwesomeIcon icon={["fal", "user-key"]} />
                <Text visibleFrom="md" lh="0">
                  Sessions
                </Text>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="accounts">
              <Group gap="0.7rem" align="center" justify="center">
                <FontAwesomeIcon icon={["fal", "link"]} />
                <Text visibleFrom="md" lh="0">
                  Accounts
                </Text>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="danger">
              <Group gap="0.7rem" align="center" justify="center" c="red">
                <FontAwesomeIcon
                  icon={["fal", "trash-slash"]}
                  color="currentColor"
                />
                <Text visibleFrom="md" lh="0">
                  Danger
                </Text>
              </Group>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="profile">
            <Title order={3} fz="2rem">
              Profile
            </Title>
            <ProfileEditCard user={user} />
          </Tabs.Panel>
          <Tabs.Panel value="security">
            <Title order={3} fz="2rem">
              Security
            </Title>
            <SecurityCard
              user={user}
              session={session}
              passkeys={passkeys}
              accounts={accounts}
            />
          </Tabs.Panel>
          <Tabs.Panel value="sessions">
            <Title order={3} fz="2rem">
              Sessions
            </Title>
          </Tabs.Panel>
          <Tabs.Panel value="accounts">
            <Title order={3} fz="2rem">
              Accounts
            </Title>
          </Tabs.Panel>
          <Tabs.Panel value="danger">
            <Title order={3} fz="2rem">
              Danger
            </Title>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
}
