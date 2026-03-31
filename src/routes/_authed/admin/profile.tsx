import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, SessionInformation, UserLoggedInCheck, UsersAccounts, UsersPasskeys } from '@/actions/auth.functions'

import { Box, Text, Image, Group, Tabs, Title } from '@mantine/core'
import { SectionTitle } from '@/components/SectionTitle'
import { user } from '@/utils/auth/permissions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BreadCrumb } from '@/components/BreadCrumbsComponent'
import ProfileEditCard from '@/components/profile/ProfileEditCard'
import SecurityCard from '@/components/profile/SecurityCard'

export const Route = createFileRoute('/_authed/admin/profile')({
    component: RouteComponent,
    loader: async () => {
        return {
            session: await SessionInformation(),
            passkeys: await UsersPasskeys(),
            accounts: await UsersAccounts(),
            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
        }
    },

    head: ({ loaderData }) => ({
        meta: [
            ...seo({
                // @ts-ignore
                title: `${loaderData?.session?.user?.name}'s Profile Manager | ${import.meta.env.VITE_WEBSITE_NAME}`,
            }),
        ]
    })
})

function RouteComponent() {
    const { session: sessionInfo, passkeys, accounts, isUser, isAdmin } = Route.useLoaderData()

    const breadCrumbs = [] as any

    const { user, session } = sessionInfo || {} as any
    return <>
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
}
